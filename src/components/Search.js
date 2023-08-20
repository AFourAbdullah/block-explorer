import React, { useState } from "react";
import "./search.css";
import { FiSearch } from "react-icons/fi";
import { ethers } from "ethers";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const alert = useAlert();
  const searchFunc = () => {
    if (searchQuery == "") {
      return alert.error("Enter any address");
    }
    history.push(`/address/${searchQuery}`);
  };

  return (
    <div className="searchContainer">
      <div className="searchBox">
        <input
          type="text"
          placeholder="search by address,Txn hash,block "
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <FiSearch onClick={searchFunc} />
      </div>
    </div>
  );
};

export default Search;
