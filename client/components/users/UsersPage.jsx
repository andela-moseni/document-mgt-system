import React from 'react';
import { connect } from 'react-redux';
import { Modal, Pagination } from 'react-materialize';
import { notify } from 'react-notify-toast';
import jwt from 'jsonwebtoken';
import { fetchUsers, createUser } from '../../actions/usersActions';
import UserListRow from './UserListRow';
import TextFieldGroup from '../common/TextFieldGroup';

class usersPage extends React.Component {
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

  componentWillMount() {
    this.props.fetchUsers();
  }

  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    this.props.fetchUsers(offset);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const custom = { background: '#FF0000', text: '#FFFFFF' };
    e.preventDefault();
    if (this.state.password.length < 4) {
      return notify.show('password must be minimum of four characters only',
        'custom', 3000, custom);
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      return notify.show('Passwords do not match', 'custom', 3000, custom);
    }
    this.props.createUser(this.state);
    this.setState({
      name: ' ',
      email: ' ',
      password: ' ',
      passwordConfirmation: ' '
    });
  }

  render() {
    const { users, pagination } = this.props.users;
    if (!users) return null;
    if (users.length === 0) {
      return (
        <div className="container">
          <h2 className="white-text center-align">No users found.</h2>
        </div>
      );
    }
    const { pageCount, currentPage, totalCount } = pagination;
    // conditional rendering for admin to add users
    const curUser = jwt.decode(localStorage.jwtToken);
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
        <h3 className="white-text center-align"> {totalCount} Users </h3>
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

usersPage.propTypes = {
  fetchUsers: React.PropTypes.func.isRequired,
  createUser: React.PropTypes.func.isRequired,
  users: React.PropTypes.object.isRequired,
};

/**
 *
 *
 * @param {any} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps, { fetchUsers, createUser })(usersPage);
