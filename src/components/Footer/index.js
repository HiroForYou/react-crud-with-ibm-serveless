import React from "react";

// Styles
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span className="copyright">
          &copy; Creado con ❤️ por{" "}
          <a href="https://www.cristhianwiki.com">
            Cristhian Wiki (HiroForYou)
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
