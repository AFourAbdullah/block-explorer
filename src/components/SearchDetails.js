import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useParams } from "react-router-dom";
import addressLogo from "../assets/imagaa.png";
import "./details.css";
import { fetchEthPrice } from "../utils/getEthPrice";
const SearchDetails = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [transactionDetails, settransactionDetails] = useState(null);
  // const [blockDetails, setblockDetails] = useState(null);
  const { address } = useParams();
  const [ethPrice, setEthPrice] = useState(null);

  const handleSearch = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/49461c8004904342a479d98cb80d051a"
      );
      console.log("addressssss", address);
      console.log("addressssss", address.length);
      //   const query = searchQuery.trim();

      // Check if the query is a transaction hash
      if (address.length == 66) {
        const transaction = await provider.getTransaction(address);
        settransactionDetails(transaction);
        console.log(transaction);
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
    fetchEthPrice().then((price) => {
      setEthPrice(price);
    });
  }, [searchResult, transactionDetails]);
  return (
    <div className="SearchDetails">
      {searchResult ? (
        <>
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
        </>
      ) : transactionDetails ? (
        <div className="transaction">
          <h3>Transaction Details</h3>
          <table className="transactionTable">
            <tbody>
              <tr>
                <td>Hash:</td>
                <td>{transactionDetails.hash && transactionDetails.hash}</td>
              </tr>
              <tr>
                <td>Block Number:</td>
                <td>{transactionDetails.blockNumber}</td>
              </tr>
              <tr>
                <td>From:</td>
                <td>{transactionDetails.from}</td>
              </tr>
              <tr>
                <td>To:</td>
                <td>{transactionDetails.to}</td>
              </tr>
              <tr>
                <td>Value:</td>
                <td>
                  <FaEthereum />
                  {ethers.utils.formatEther(transactionDetails.value._hex)} Wei
                </td>
              </tr>
              <tr>
                <td>Gas Price:</td>
                <td>
                  <FaEthereum />
                  {ethers.utils.formatEther(
                    transactionDetails.gasPrice._hex
                  )}{" "}
                  Wei
                </td>
              </tr>

              {/* Add more transaction details as needed */}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchDetails;
