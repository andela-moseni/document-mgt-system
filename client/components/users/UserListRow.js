import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import jwt from 'jsonwebtoken';
import Prompt from './../../Prompt';
import { deleteUser, updateUsers,
  fetchUserProfile } from '../../actions/usersActions';
import TextFieldGroup from '../common/TextFieldGroup';

class UserListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount() {
    const { userId } = this.props;
    this.props.fetchUserProfile(userId);
  }

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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateUsers(this.state);
  }


  deleteUser() {
    const userId = this.props.user.id;
    const roleId = this.props.roleId;
    if (roleId === 1) {
      return this.props.deleteUser(userId, true);
    }
    this.props.deleteUser(userId);
  }

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
            className="btn-floating btn-large waves-effect waves-light">
            <i className="material-icons">edit</i>
          </button>
        );
        deleteBtn = (
          <button
            className="btn-floating btn-large waves-effect waves-light cyan">
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
      <td> {user.roleId} </td>
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

                  <button className="btn waves-effect waves-light submitBtn"
                    type="submit" name="action">Update
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

};

/**
 *
 *
 * @param {any} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    users: state.users.user,
    userId: state.auth.user.userId,
    roleId: state.auth.user.roleId,
  };
}

export default connect(mapStateToProps,
{ deleteUser, updateUsers, fetchUserProfile })(UserListRow);
