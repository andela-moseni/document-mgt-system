import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import { logout } from '../actions/loginActions';
import SideNavBar from './SideNavBar';
import { searchDocuments, searchUserDocuments }
from '../actions/documentsActions';
import { searchUsers } from '../actions/usersActions';
import { searchRoles } from '../actions/rolesActions';

/**
 *
 * @class NavigationBar
 * @extends {React.Component}
 */
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  /**
   * Control input fields
   * @param {Object} event
   *
   * @memberOf NavigationBar
   */
  onChange(event) {
    const currentPath = location.pathname;
    const query = event.target.value;
    if (currentPath === '/documents') {
      this.props.searchDocuments(query);
    } else if (currentPath === '/my-documents') {
      const userId = this.props.auth.user.userId;
      this.props.searchUserDocuments(userId, query);
    } else if (currentPath === '/users') {
      this.props.searchUsers(query);
    } else if (currentPath === '/roles') {
      this.props.searchRoles(query);
    } else if ((currentPath.search('users') >= 0) &&
     (currentPath.search('documents') >= 0)) {
      const id = currentPath.split('/')[2];
      this.props.searchUserDocuments(id, query);
    }
  }

  /**
   * Logout a user
   * @param {Object} event
   *
   * @memberOf NavigationBar
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf NavigationBar
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <nav>
        <div className="nav-wrapper">
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              <span>
                <i
                  className="material-icons button-collapse" id="menuBar"
                  data-activates="slide-out"
                >menu</i>
                Meek
              </span>
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Modal
                  header="About Meek-DMS" trigger={
                    <Link to="/" >About</Link>}
                >
                  <div className="modal-content">
                    <p className="text-justify">
                      Meek <strong>document management system </strong>allows
                       users to create and manage documents giving different
                       privileges based on user roles and managing
                       authentication using JWT.
                    </p>
                  </div>
                </Modal>
              </li>
              <li><Link to="/" onClick={this.logout}>Logout</Link></li>
              <li><Link id="searchIcon">
                <i className="material-icons">search</i>
              </Link>
              </li>
            </ul>
          </div>
          <div className="nav-wrapper" id="searchBar">
            <form>
              <div className="input-field">
                <input
                  id="search" type="search"
                  placeholder="Search..."
                  onChange={this.onChange} name="search"required
                />
                <label className="label-icon">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons">close</i>
              </div>
            </form>
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
            <li><Link to="/login" id="signin">Sign in</Link></li>
            <li><Link to="/signup" id="signup">Sign up</Link></li>
          </ul>
        </div>
      </nav>
    );
    return (
      <span> {isAuthenticated ? userLinks : guestLinks } </span>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  searchRoles: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  searchUserDocuments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default
connect(mapStateToProps,
  { logout,
    searchDocuments,
    searchUserDocuments,
    searchUsers,
    searchRoles })(NavigationBar);
