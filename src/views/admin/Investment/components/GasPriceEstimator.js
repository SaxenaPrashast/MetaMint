import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { fetchGasPrices } from './gasPriceAPI';
import Card from "components/card/Card";

const GasPriceEstimator = () => {
  const [gasPrices, setGasPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGasPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGasPrices();
        setGasPrices(data);
      } catch (err) {
        setError("Failed to fetch gas prices.");
      } finally {
        setLoading(false);
      }
    };

    getGasPrices();
  }, []);

  return (
    <Card>
      <Box p={5}>
        <Heading mb={5}>Gas Price Estimator</Heading>
        {loading && <Text>Loading gas prices...</Text>}
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {gasPrices && (
          <Box>
            <Heading size="md" mb={3}>Current Gas Prices (Gwei)</Heading>
            <Text>Safe: {gasPrices.SafeGasPrice} Gwei</Text>
            <Text>Propose: {gasPrices.ProposeGasPrice} Gwei</Text>
            <Text>Fast: {gasPrices.FastGasPrice} Gwei</Text>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default GasPriceEstimator;
