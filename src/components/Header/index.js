import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppID from "ibmcloud-appid-js";

// Styles
import "./style.scss";

const Header = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const [userInfoData, setUserInfoData] = useState(null);

  const appID = useMemo(() => {
    return new AppID();
  }, []);

  useEffect(() => {
    if (userInfoData) {
      localStorage.setItem("userInfo", JSON.stringify(userInfoData));
      dispatch({
        type: "SET_USER_INFO",
        data: userInfoData,
      });
    }
  }, [dispatch, userInfoData]);

  const loginAction = async () => {
    try {
      await appID.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        discoveryEndpoint: process.env.REACT_APP_DISCOVERY_ENDPOINT,
      });
      setUserInfoData(await appID.signin());
    } catch (e) {
      console.log("Ocurrió el siguiente error con appID:", e.message);
    }
  };

  const exitAction = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "USER_SIGNOUT" });
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          React CRUD Serveless IBM
        </a>
        {userInfo ? (
          <button className="primary-btn" onClick={() => exitAction()}>
            Salir
          </button>
        ) : (
          <button onClick={() => loginAction()} className="primary-btn">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
