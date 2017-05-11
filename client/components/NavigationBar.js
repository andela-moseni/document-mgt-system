import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/loginActions';
import SideNavBar from './SideNavBar';

class NavigationBar extends React.Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <nav>
        <div className="nav-wrapper">
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              <span>
                <i className="material-icons button-collapse" data-activates="slide-out">menu</i>
                Meek
              </span>
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/" onClick={this.logout.bind(this)}>Logout</Link></li>
            </ul>
          </div>
          <SideNavBar />
        </div>
     </nav>
    );
    const guestLinks = (
      <nav>
      <div className="nav-wrapper">
      <Link className="brand-logo" to="/">
          Meek
      </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/login">Sign in</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
      </ul>
      </div>
      </nav>
    );
    return (
     <span> {isAuthenticated ? userLinks : guestLinks  } </span>
    );
  }
} 

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
