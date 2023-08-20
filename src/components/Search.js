import React, { useState } from "react";
import "./search.css";
import { FiSearch } from "react-icons/fi";
import { ethers } from "ethers";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/49461c8004904342a479d98cb80d051a"
      );

      const query = searchQuery.trim();

      // Check if the query is a transaction hash
      if (ethers.utils.isHexString(query, 32)) {
        const transaction = await provider.getTransaction(query);
        setSearchResult(transaction);
      } else if (ethers.utils.isHexString(query, 64)) {
        // Check if the query is a block hash
        const block = await provider.getBlock(query);
        setSearchResult(block);
      } else if (ethers.utils.isAddress(query)) {
        // Check if the query is an Ethereum address
        const balance = await provider.getBalance(query);
        setSearchResult({
          address: query,
          balance: ethers.utils.formatEther(balance),
        });
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setSearchResult(null);
    }
  };
  return (
    <div className="searchContainer">
      <div className="searchBox">
        <input
          type="text"
          placeholder="search by address,Txn hash,block "
          onChange={(e) => setSearchQuery}
        />
        <FiSearch onClick={handleSearch} />
      </div>
    </div>
  );
};

export default Search;
