// utils/gasPriceAPI.js
export const fetchGasPrices = async (chainId = 1) => {
  const response = await fetch(`https://api.blocknative.com/gasprices/blockprices?chainid=${chainId}`, {
      headers: {
          Authorization: 'afd2dd34-c710-401e-b0a6-3c9a4040f202', // Replace with your actual API key
      },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch gas prices');
  }
  
  const data = await response.json();
  return data;
};
