import React from 'react';
import { connect } from 'react-redux';
import { Modal, Pagination } from 'react-materialize';
import { notify } from 'react-notify-toast';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { fetchUsers, createUser } from '../../actions/usersActions';
import UserListRow from './UserListRow';
import TextFieldGroup from '../common/TextFieldGroup';
import { validateSignUp } from '../../utils/validator';

/**
 *
 * @class usersPage
 * @extends {React.Component}
 */
export class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Renders all users
   * @memberOf UsersPage
   */
  componentWillMount() {
    this.props.fetchUsers();
  }

  /**
   * onSelect - Page count
   * @param {Number} pageNumber
   *
   * @memberOf UsersPage
   */
  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    this.props.fetchUsers(offset);
  }

  /**
   * Control input fields
   * @param {any} event
   *
   * @memberOf UsersPage
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Create a user
   * @param {Object} event
   * @returns {Object}
   *
   * @memberOf UsersPage
   */
  onSubmit(event) {
    const custom = { background: '#FF0000', text: '#FFFFFF' };
    event.preventDefault();

    const { valid } = validateSignUp(this.state);

    if (this.state.name && !/[a-z]+$/i.test(this.state.name)) {
      return notify.show('Only alphabets is allowed for name field',
      'custom', 3000, custom);
    }
    if (this.state.email && !validator.isEmail(this.state.email)) {
      return notify.show('Enter valid email',
      'custom', 3000, custom);
    }
    if (this.state.password && this.state.password.length < 4) {
      return notify.show('Password must be minimum of four characters only',
        'custom', 3000, custom);
    }
    if (this.state.password &&
    this.state.password !== this.state.passwordConfirmation) {
      return notify.show('Passwords do not match', 'custom', 3000, custom);
    }
    if (valid) {
      this.props.createUser(this.state).then(() => {
        notify.show('User created successfully', 'success', 3000);
        return this.setState({
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        });
      });
    }
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf UsersPage
   */
  render() {
    const { users, pagination } = this.props.users;
    if (!users) return null;
    if (!users.length) {
      return (
        <div className="container">
          <h2 className="white-text center-align">No users found.</h2>
        </div>
      );
    }
    const { pageCount, currentPage } = pagination;
    // conditional rendering for admin to add users
    const curUser =
    localStorage.jwtToken ? jwt.decode(localStorage.jwtToken) : '';
    let createBtn = null;
    if (curUser) {
      const curUserRole = curUser.roleId;
      if (curUserRole === 1) {
        createBtn = (
          <button
            className="btn-floating btn-large waves-effect waves-light newBtn"
          >
            <i className="material-icons">add</i>
          </button>
        );
      }
    }

    return (
      <div className="container">
        <h3 className="white-text center-align"> {users.length} Users </h3>
        <table className="striped responsive-table highlight">
          <thead>
            <tr>
              <th>S/NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) =>
              <UserListRow
                key={index}
                user={user} serial={index + 1}
              />)}
          </tbody>
        </table>
        <div className="center-align">
          <Pagination
            items={pageCount} activePage={currentPage}
            maxButtons={pageCount}
            onSelect={this.onSelect}
          />
        </div>
        <div className="right">
          <Modal header="Create User" fixedFooter trigger={createBtn}>
            <form className="col s12" onSubmit={this.onSubmit}>
              <div className="row">
                <TextFieldGroup
                  label="Full Name"
                  onChange={this.onChange}
                  value={this.state.name}
                  icon="account_circle"
                  field="name"
                  placeholder="alphabets only"
                />

                <TextFieldGroup
                  label="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  icon="email"
                  field="email"
                  type="email"
                />

                <TextFieldGroup
                  label="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  icon="vpn_key"
                  field="password"
                  type="password"
                  placeholder="password must be minimum of four characters"
                />

                <TextFieldGroup
                  label="Confirm Password"
                  onChange={this.onChange}
                  value={this.state.passwordConfirmation}
                  icon="vpn_key"
                  field="passwordConfirmation"
                  type="password"
                  placeholder="passwords must match"
                />
                <button
                  className="btn waves-effect waves-light submitBtn"
                  type="submit" name="action"
                >Create
                    <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

UsersPage.propTypes = {
  fetchUsers: React.PropTypes.func.isRequired,
  createUser: React.PropTypes.func.isRequired,
  users: React.PropTypes.object.isRequired,
};

/**
 *
 *
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps, { fetchUsers, createUser })(UsersPage);
