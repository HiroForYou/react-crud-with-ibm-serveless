import React from "react";

// Styles
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span className="copyright">
          &copy; Creado con{" "}
          <span role="img" aria-label="kokoro">
            ❤️
          </span>{" "}
          por{" "}
          <a
            href="https://www.cristhianwiki.com"
            style={{
              color: "#4961DC",
            }}
          >
            Cristhian Wiki (HiroForYou)
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
