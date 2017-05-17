import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {
  render() {
    return (
      <div className="container homePage">
        <h3 id="fiddle-text">Welcome to Meek - Document Management System</h3>
        <h4>404! Seems you are in the wrong place, go
          <Link className="grey-text text-lighten-4" to="/"> Home</Link></h4>
      </div>
    );
  }
}

export default NotFound;
