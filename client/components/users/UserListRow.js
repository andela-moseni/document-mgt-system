import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const UserListRow = ({ user, serial }) =>
  // const date = new Date(document.updatedAt);
   (
    <tr>
      <td> {serial} </td>
      <td> <Link to={`/users/${user.id}/documents`}>{user.name}</Link> </td>
      <td> {user.email} </td>
      <td> {user.roleId} </td>
      {/* <td> {date.toDateString()} </td>*/}
    </tr>
  );

UserListRow.propTypes = {
  user: PropTypes.object.isRequired,
  serial: PropTypes.number.isRequired,
};

export default UserListRow;
