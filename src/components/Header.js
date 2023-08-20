import React, { useState } from "react";
import { fetchEthPrice } from "../utils/getEthPrice";
import { useEffect } from "react";
import logo from "../assets/lgoo.png";
import "./header.css";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>
      <h5>
        ETH price: <span>${ethPrice}</span>
      </h5>
    </div>
  );
};

export default Header;
