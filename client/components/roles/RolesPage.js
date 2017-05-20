import React from 'react';
import { connect } from 'react-redux';
import { Modal, Pagination } from 'react-materialize';
import { fetchRoles } from '../../actions/rolesActions';
import RoleListRow from './RoleListRow';

class RolesPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  componentWillMount() {
    this.props.fetchRoles();
  }

  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    this.props.fetchRoles(offset);
  }

  render() {
    const { roles, pagination } = this.props.roles;
    if (!roles) return null;
    if (roles.length === 0) {
      return (
        <div className="container">
          <h2>No roles found.</h2>
        </div>
      );
    }
    const { pageCount, currentPage, totalCount } = pagination;
    return (
        <div className="container">
        <h3> {totalCount} roles </h3>
        <table className="striped responsive-table highlight">
          <thead>
            <tr>
              <th>S/NO</th>
              <th>Title</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
        <tbody>
          {roles.map((role, index) =>
          <RoleListRow key={index} role={role} serial={index + 1} />)}
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
        <button
          className="btn-floating btn-large waves-effect waves-light newBtn">
          <i className="material-icons">create</i>
        </button>
      </div>
    </div>
    );
  }
}

RolesPage.propTypes = {
  fetchRoles: React.PropTypes.func.isRequired,
  roles: React.PropTypes.object.isRequired,
};

/**
 *
 *
 * @param {any} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    roles: state.roles,
  };
}

export default connect(mapStateToProps, { fetchRoles })(RolesPage);
