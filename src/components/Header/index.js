import React, { useState, useMemo, useEffect } from "react";
import AppID from "ibmcloud-appid-js";

// Styles
import "./style.scss";

const Header = () => {
  const [sesionActive, setSesionActive] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const appID = useMemo(() => {
    return new AppID();
  }, []);

  const loginAction = async () => {
    try {
      await appID.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        discoveryEndpoint: process.env.REACT_APP_DISCOVERY_ENDPOINT,
      });
      const tokens = await appID.signin();
      // access token
      console.log("tokens", tokens);
      localStorage.setItem("useInfo", JSON.stringify(tokens));
      setSesionActive(true);
    } catch (e) {
      setErrorState(true);
      setErrorMessage(e.message);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          React CRUD Serveless IBM
        </a>
        {sesionActive ? (
          <button className="primary-btn">Salir</button>
        ) : (
          <button onClick={loginAction} className="primary-btn">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
