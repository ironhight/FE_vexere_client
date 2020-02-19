import React from "react";
import { FooterBg, FooterContent } from "./styled";

const Footer = () => {
  return (
    <div>
      <footer>
        <FooterBg>
          <div className="content">
            <h2>Nguyen Hoai Nam</h2>
            <p className="mb-0">Project Vexere</p>
          </div>
        </FooterBg>
        <FooterContent>
          <div className="container">
            <ul className="clearfix">
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">Github</a>
              </li>
            </ul>
          </div>
        </FooterContent>
      </footer>
    </div>
  );
};

export default Footer;
