import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <p className="grey-text text-lighten-4">
            What we did not imagine was a Web of people, but a Web of documents.
          </p>
        </div>
        <div className="footer-copyright">
          <div className="container">
          © 2017 Meek-DMS
          <Link className="grey-text text-lighten-4 right"
            to="https://github.com/andela-moseni">follow us on Github
          </Link>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
