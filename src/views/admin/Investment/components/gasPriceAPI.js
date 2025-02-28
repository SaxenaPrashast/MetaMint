// utils/gasPriceAPI.js
const ETHERSCAN_API_KEY = process.env.EYXCWBZE645R2XSF5DDKGBQJCYHPYHVXST; // Use an environment variable

export const fetchGasPrices = async () => {
  if (!ETHERSCAN_API_KEY) {
    console.error("Etherscan API Key is missing!");
    return null;
  }

  const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch gas prices");
    }
    const data = await response.json();

    if (data.status !== "1") {
      throw new Error("Invalid response from Etherscan");
    }

    return {
      SafeGasPrice: data.result.SafeGasPrice,
      ProposeGasPrice: data.result.ProposeGasPrice,
      FastGasPrice: data.result.FastGasPrice,
    };
  } catch (error) {
    console.error("Error fetching gas prices:", error);
    return null;
  }
};
