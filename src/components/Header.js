import React, { useState } from "react";
import { fetchEthPrice } from "../utils/getEthPrice";
import { useEffect } from "react";
import logo from "../assets/lgoo.png";
import "./header.css";

const Header = () => {
  const [ethPrice, setEthPrice] = useState(null);
  useEffect(() => {
    // Fetch Ethereum price and update state
    fetchEthPrice().then((price) => {
      setEthPrice(price);
    });
  }, []);

  return (
    <div className="header">
      <img src={logo} alt="" className="logo" />
      <h5>
        ETH price: <span>${ethPrice}</span>
      </h5>
    </div>
  );
};

export default Header;
