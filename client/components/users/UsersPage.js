import React from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersActions';
import UserListRow from './UserListRow';

class usersPage extends React.Component {
  componentWillMount() {
    this.props.loadUsers();
  }
  render() {
    const { users } = this.props;
    if (!users) return null;
    if (users.length === 0) {
      return (
        <div className="container">
          <h2>No users found.</h2>
        </div>
      );
    }
    return (
      <div className="container">
        <h3> All users </h3>
        <table className="striped responsive-table highlight">
          <thead>
            <tr>
              <th> S/NO </th>
              <th> Name </th>
              <th> Email </th>
              <th> Role Id </th>
            </tr>
          </thead>
        <tbody>
          {users.map((user, index) =>
          <UserListRow key={index}
          user={user} serial={index + 1} />)}
        </tbody>
      </table>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => dispatch(usersActions.fetchUsers()),
  };
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(usersPage);
