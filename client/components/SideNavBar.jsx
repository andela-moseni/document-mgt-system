import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import image from '../images/docs1.jpg';
import img from '../images/user.jpg';

/**
 *
 * @class SideNavBar
 * @extends {React.Component}
 */
class SideNavBar extends React.Component {
  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf SideNavBar
   */
  render() {
    // conditional rendering for admin to access roles link
    const curUser = jwt.decode(localStorage.jwtToken);
    let rolesLink = null;
    if (curUser) {
      const curUserRole = curUser.roleId;
      if (curUserRole === 1) {
        rolesLink = (
          <li>
            <Link to="/roles" className="waves-effect" id="roles">
              <i className="material-icons">domain</i>Roles
            </Link>
          </li>
        );
      }
    }
    return (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="background">
              <img src={image} width="300px" />
            </div>
            <div className="user-view">
              <img className="circle" src={img} />
            </div>
            <span className="name" id="black-text">Welcome,&nbsp;
              {this.props.user.user}
            </span>
            <p className="email" id="black-text">
              {this.props.user.email}
            </p>
          </li>
          <li>
            <Link to="/profile" className="waves-effect">
              <i className="material-icons">people</i>My Profile
            </Link>
          </li>
          <li><div className="divider" /></li>
          <li>
            <Link className="subheader">Documents</Link>
          </li>
          <li>
            <Link to="/create-document" className="waves-effect">
              <i className="material-icons">folder</i>Create Document
            </Link>
          </li>
          <li>
            <Link to="/my-documents" className="waves-effect">
              <i className="material-icons">books</i>My Documents
            </Link>
          </li>
          <li>
            <Link to="/documents" className="waves-effect">
              <i className="material-icons">books</i>Other Documents
            </Link>
          </li>
          <li><div className="divider" /></li>
          <li>
            <Link to="/users" className="waves-effect">
              <i className="material-icons">people</i>Users
            </Link>
          </li>
          <li><div className="divider" /></li>
          {rolesLink}
          <li><div className="divider" /></li>
        </ul>
      </div>
    );
  }
}


SideNavBar.propTypes = {
  userName: React.PropTypes.string,
  email: React.PropTypes.string,
  user: React.PropTypes.object,
};

/**
 *
 *
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}
export default connect(mapStateToProps)(SideNavBar);
