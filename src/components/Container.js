import React, { useEffect } from "react";
import { useState } from "react";
import { FaEthereum, FaGlobe, FaServer } from "react-icons/fa";
import { FaGauge } from "react-icons/fa6";
import { fetchEthPrice } from "../utils/getEthPrice";
import { ethers } from "ethers";
import axios from "axios";
import { Link } from "react-router-dom";
import "./contaniner.css";

const Container = () => {
  const [ethPrice, setEthPrice] = useState(null);
  const [marketCap, setmarketCap] = useState(null);
  const [lastTransaction, setlastTransaction] = useState(null);

  const [blocknumber, setblockNumber] = useState(0);

  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/49461c8004904342a479d98cb80d051a"
  );

  async function getLastBlock() {
    const blockNumber = await provider.getBlockNumber();
    setblockNumber(blockNumber);
  }
  async function getLastTransaction() {
    const blockNumber = await provider.getBlockNumber();

    // Get the block information for the latest block

    const block = await provider.getBlock(blockNumber);

    // Check if there are transactions in the block
    if (block.transactions.length > 0) {
      // Get the last transaction hash from the block
      const lastTransactionHash =
        block.transactions[block.transactions.length - 1];

      // Get the transaction details using the transaction hash
      const transaction = await provider.getTransaction(lastTransactionHash);

      console.log("Last Transaction:", transaction);
      setlastTransaction(transaction.hash);
    }
  }

  async function getEthMarketCap() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/ethereum"
      );
      const marketCapVal = response.data.market_data.market_cap.usd;

      setmarketCap(marketCapVal);
    } catch (error) {
      console.error("Error fetching market cap:", error);
      return null;
    }
  }

  useEffect(() => {
    getLastBlock();
    getLastTransaction();
    getEthMarketCap();

    // Fetch Ethereum price and update state
    fetchEthPrice().then((price) => {
      setEthPrice(price);
    });
  }, []);

  const data = [
    { icon: <FaEthereum />, heading: "ETHER PRICE", value: `$ ${ethPrice}` },

    { icon: <FaGauge />, heading: "LATEST BLOCK", value: blocknumber },

    {
      icon: <FaGlobe />,
      heading: "MARKET CAP",
      value: marketCap !== null ? `$ ${marketCap.toLocaleString()}` : "",
    },
    {
      icon: <FaServer />,
      heading: "LATEST TRANSACTION",
      value: (
        <Link to={`/address/${lastTransaction}`}>
          {lastTransaction.substring(0, 14)}..
        </Link>
      ),
    },
  ];
  return (
    <div className="container">
      {data.map((D) => (
        <div>
          {D.icon}
          <div className="frontDetails">
            <h4>{D.heading}</h4>
            <h4>{D.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Container;
