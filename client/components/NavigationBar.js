import React from 'react';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
  
  componentDidMount() {
    // // Jquery here $(...)...
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo" to="/">
            {/*<span>
              <i className="material-icons button-collapse" href="#" data-activates="slide-out">menu</i>*/}
              Meek
            {/*</span>*/}
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/signup">Sign in</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
          </ul>
        </div>
        {/*<ul id="slide-out" className="side-nav">
        <li>
          <div className="background">
            <img src={require('../images/docs1.jpg')} width="300px"/>
          </div>
          <div className="userView">
            <Link><img className="circle" src={require('../images/user.jpg')} /></Link>
            <Link><span className="black-text name">John Doe</span></Link>
            <Link><span className="black-text email">jdandturk@gmail.com</span></Link>
          </div>
        </li>
        <li><Link className="subheader">Documents</Link></li>
        <li><Link to="#!" className="waves-effect"><i className="material-icons">folder</i>My Documents</Link></li>
        <li><Link to="#!" className="waves-effect"><i className="material-icons">books</i>Other Documents</Link></li>
        <li><Link to="#!" className="waves-effect"><i className="material-icons">search</i>Search Documents</Link></li>
        <li><div className="divider"></div></li>
        <li><Link to="#!" className="waves-effect"><i className="material-icons">people</i>Users</Link></li>
        <li><div className="divider"></div></li>
        <li><Link to="#!" className="waves-effect"><i className="material-icons">domain</i>Roles</Link></li>
      </ul>*/}
      </nav>
    );
  }
} 
