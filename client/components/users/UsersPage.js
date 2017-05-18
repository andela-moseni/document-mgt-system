import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { fetchUsers } from '../../actions/usersActions';
import UserListRow from './UserListRow';

class usersPage extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    this.props.fetchUsers(offset);
  }

  render() {
    // const { users } = this.props;
    const { users, pagination } = this.props.users;

    if (!users) return null;
    if (users.length === 0) {
      return (
        <div className="container">
          <h2>No users found.</h2>
        </div>
      );
    }
    const { pageCount, currentPage, totalCount } = pagination;
    console.log(pagination);
    return (
      <div className="container">
        <h3> {totalCount} Users </h3>
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
      <div className="center-align">
        <Pagination
          items={pageCount} activePage={currentPage}
          maxButtons={pageCount}
          onSelect={this.onSelect}
        />
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps, { fetchUsers })(usersPage);
