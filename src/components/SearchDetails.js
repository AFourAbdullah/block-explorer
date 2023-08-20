import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useParams } from "react-router-dom";
import addressLogo from "../assets/imagaa.png";
import "./details.css";
import { fetchEthPrice } from "../utils/getEthPrice";
const SearchDetails = () => {
  const [searchResult, setSearchResult] = useState(null);
  const { address } = useParams();
  const [ethPrice, setEthPrice] = useState(null);

  const handleSearch = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/49461c8004904342a479d98cb80d051a"
      );

      //   const query = searchQuery.trim();

      // Check if the query is a transaction hash
      if (ethers.utils.isHexString(address, 32)) {
        const transaction = await provider.getTransaction(address);
        setSearchResult(transaction);
      } else if (ethers.utils.isHexString(address, 64)) {
        // Check if the query is a block hash
        const block = await provider.getBlock(address);
        setSearchResult(block);
      } else if (ethers.utils.isAddress(address)) {
        // Check if the query is an Ethereum address
        const balance = await provider.getBalance(address);
        const transactions = await provider.getTransactionCount(address);
        setSearchResult({
          address: address,
          balance: ethers.utils.formatEther(balance),
          transactions: transactions,
        });
      } else {
        setSearchResult(null);
      }
      console.log("resultssssss are: ", searchResult);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResult(null);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [address]);

  useEffect(() => {
    console.log("resultssssss are: ", searchResult);
    fetchEthPrice().then((price) => {
      setEthPrice(price);
    });
  }, [searchResult]);
  return (
    <div className="SearchDetails">
      <div className="detailsAddress">
        <img src={addressLogo} alt="" />
        <h2>Address : {address}</h2>
      </div>
      <div className="card">
        <h3>Overview</h3>
        <div className="cardDiv">
          <h3>ETH BALANCE</h3>
          <h5>
            <FaEthereum />
            {searchResult && searchResult.balance}
          </h5>
        </div>
        <div className="cardDiv">
          <h3>ETH VALUE</h3>
          <h5>${searchResult && searchResult.balance * ethPrice}</h5>
        </div>
      </div>
    </div>
  );
};

export default SearchDetails;
