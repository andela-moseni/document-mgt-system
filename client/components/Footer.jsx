import React from 'react';
import { Link } from 'react-router';

const Footer = () => (
  <footer className="page-footer">
    <div className="container">
      <p className="grey-text text-lighten-4" id="foot">
        What we did not imagine was a Web of people, but a Web of documents.
      </p>
    </div>
    <div className="footer-copyright">
      <div className="container">
      © 2017 Meek-DMS
      <a
        className="grey-text text-lighten-4 right"
        href="https://github.com/andela-moseni"
      >follow me on Github
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
