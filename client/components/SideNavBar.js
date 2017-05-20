import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SideNavBar extends React.Component {
  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="background">
              <img src={require('../images/docs1.jpg')} width="300px"/>
            </div>
            <div className="userView">
              <Link><img className="circle"
                src={require('../images/user.jpg')} />
              </Link>
              <span className="black-text name">Welcome,&nbsp;
                {this.props.userName}</span>
              <p className="black-text email">{this.props.email}</p>
            </div>
          </li>
          <li>
            <Link to="/profile" className="waves-effect">
              <i className="material-icons">people</i>My Profile
            </Link>
          </li>
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
          <li>
            <Link to="/roles" className="waves-effect">
              <i className="material-icons">domain</i>Roles
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}


SideNavBar.propTypes = {
  userName: React.PropTypes.string,
  email: React.PropTypes.string,
};

/**
 *
 *
 * @param {any} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    userName: state.auth.user.user,
    email: state.auth.user.email,
  };
}
export default connect(mapStateToProps)(SideNavBar);
