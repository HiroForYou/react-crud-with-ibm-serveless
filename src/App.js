import React, { useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppID from "ibmcloud-appid-js";

function App() {
  const appID = useMemo(() => {
    return new AppID();
  }, []);

  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /* (async () => {
    try {
      await appID.init({
        clientId: "3f828d3a-c911-4be5-9864-84d243ca39d9",
        discoveryEndpoint:
          "https://us-south.appid.cloud.ibm.com/oauth/v4/04d1fde9-f03b-436e-b719-4c3a34782af0/.well-known/openid-configuration",
      });
    } catch (e) {
      setErrorState(true);
      setErrorMessage(e.message);
    }
  })(); */

  const [welcomeDisplayState, setWelcomeDisplayState] = useState(false);
  const [loginButtonDisplayState, setLoginButtonDisplayState] = useState(true);
  const [userName, setUserName] = useState("");

  /* const loginAction = async () => {
    try {
      const tokens = await appID.signin();
      console.log("tokens", tokens);
      setErrorState(false);
      setLoginButtonDisplayState(false);
      setWelcomeDisplayState(true);
      setUserName(tokens.idTokenPayload.name);
    } catch (e) {
      setErrorState(true);
      setErrorMessage(e.message);
    }
  }; */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {welcomeDisplayState && (
          <div> Bienvenido {userName}! Ahora estas autenticado.</div>
        )}
        {loginButtonDisplayState && (
          <button
            style={{
              fontSize: "24px",
              backgroundColor: "skyblue",
              border: "none",
            }}
            id="login"
            onClick={async () => {
              try {
                await appID.init({
                  clientId: "3f828d3a-c911-4be5-9864-84d243ca39d9",
                  discoveryEndpoint:
                    "https://us-south.appid.cloud.ibm.com/oauth/v4/04d1fde9-f03b-436e-b719-4c3a34782af0/.well-known/openid-configuration",
                });
                const tokens = await appID.signin();
                console.log("tokens", tokens);
              } catch (e) {
                console.log("e!", e);
              }
            }}
            /* onClick={() => console.log("holii")} */
          >
            Login
          </button>
        )}
        {errorState && <div style={{ color: "red" }}>{errorMessage}</div>}
      </header>
    </div>
  );
}

export default App;
