import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div className="container">
    <h3 id="fiddle-text" className="color-text">
      Welcome to Meek - Document Management System
    </h3><br />
    <h4 className="color-text">404! Seems you are in the wrong place, go
      <Link className="grey-text text-lighten-4" to="/"> Home</Link></h4>
  </div>
);

export default NotFound;
