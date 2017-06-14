import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Input, Modal } from 'react-materialize';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Prompt from './../../Prompt';
import { deleteUser, updateUsers,
  fetchUserProfile } from '../../actions/usersActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { validateUser } from '../../utils/validator';

/**
 *
 * @class UserListRow
 * @extends {React.Component}
 */
export class UserListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      email: props.user.email,
      password: '',
      passwordConfirmation: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * Renders user's profile
   * @memberOf UserListRow
   */
  componentWillMount() {
    const { userId } = this.props;
    this.props.fetchUserProfile(userId);
  }

  /**
   * Renders props of a user object if it exists
   * @param {Object} nextProps
   *
   * @memberOf UserListRow
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      const { user: { id, name, email } } = nextProps;
      this.setState({
        id,
        name,
        email,
      });
    }
  }

  /**
   * Control input fields
   * @param {Object} event
   *
   * @memberOf UserListRow
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Updates a user
   * @param {Object} event
   *
   * @memberOf UserListRow
   */
  onSubmit(event) {
    event.preventDefault();
    const custom = { background: '#ff0000', text: '#FFFFFF' };
    const { valid } = validateUser(this.state);

    if (this.state.name && !/[a-z]+$/i.test(this.state.name)) {
      return notify.show('Only alphabets is allowed for name field',
      'custom', 3000, custom);
    }
    if (this.state.email && !validator.isEmail(this.state.email)) {
      return notify.show('Enter valid email',
      'custom', 3000, custom);
    }
    if (this.state.password && this.state.password.length < 4) {
      return notify.show('password must be minimum of four characters only',
        'custom', 3000, custom);
    }
    if (this.state.password && this.state.password.length > 20) {
      return notify.show('Password field must be maximum of twenty letters',
      'custom', 3000, custom);
    }
    if (this.state.password &&
    this.state.password !== this.state.passwordConfirmation) {
      return notify.show('Passwords do not match', 'custom', 3000, custom);
    }
    if (valid) {
      const { id, name, email, password } = this.state;
      const data = { id, name, email };
      if (password) {
        data.password = password;
      }
      this.props.updateUsers(data);
      return this.setState({
        password: '',
        passwordConfirmation: ''
      });
    }
  }


  /**
   * Deletes a user
   * @returns {Object}
   *
   * @memberOf UserListRow
   */
  deleteUser() {
    const userId = this.props.user.id;
    const roleId = this.props.roleId;
    if (roleId === 1) {
      return this.props.deleteUser(userId, true)
      .then(() => {
        notify.show('User deleted successfully', 'success', 3000);
      });
    }
    this.props.deleteUser(userId)
    .then(() => {
      notify.show('User deleted successfully', 'success', 3000);
    });
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf UserListRow
   */
  render() {
    const { user, serial } = this.props;
    // conditional rendering for delete and edit
    const curUser = jwt.decode(localStorage.jwtToken);
    let deleteBtn = null;
    let editBtn = null;
    if (curUser) {
      const curUserId = curUser.userId;
      const curUserRole = curUser.roleId;
      if (user.id === curUserId || curUserRole === 1) {
        editBtn = (
          <button
            className="btn-floating btn-large waves-effect waves-light"
          >
            <i className="material-icons">edit</i>
          </button>
        );
        deleteBtn = (
          <button
            className="btn-floating btn-large waves-effect waves-light cyan"
          >
            <i className="material-icons red">delete</i>
          </button>
        );
      }
    }

    return (
      <tr>
        <td> {serial} </td>
        <td> <Link to={`/users/${user.id}/documents`}>{user.name}</Link> </td>
        <td> {user.email} </td>
        <td> {user.roleTitle} </td>
        <td>
          <div className="center">
            <Modal header="Update user profile" fixedFooter trigger={editBtn}>
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
                    placeholder="Email"
                  />

                  <TextFieldGroup
                    s={8}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    icon="vpn_key"
                    field="password"
                    type="password"
                    placeholder="password must be minimum of four characters"
                  />

                  <TextFieldGroup
                    s={8}
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
                  >Update
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </td>
        <td>
          <Prompt
            trigger={deleteBtn}
            onClickFunction={this.deleteUser}
          />
        </td>
      </tr>
    );
  }
}

UserListRow.propTypes = {
  user: PropTypes.object.isRequired,
  serial: PropTypes.number.isRequired,
  updateUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  roleId: PropTypes.number,
  userId: PropTypes.number,
  roleTitle: PropTypes.string,

};

/**
 *
 *
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    users: state.users.user,
    userId: state.auth.user.userId,
    roleId: state.auth.user.roleId,
    roleTitle: state.auth.user.roleTitle,
  };
}

export default connect(mapStateToProps,
{ deleteUser, updateUsers, fetchUserProfile })(UserListRow);
