import React from 'react';
import { connect } from 'react-redux';
import { Modal, Pagination } from 'react-materialize';
import { fetchRoles, createRole } from '../../actions/rolesActions';
import RoleListRow from './RoleListRow';
import TextFieldGroup from '../common/TextFieldGroup';

class RolesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchRoles();
  }

  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    this.props.fetchRoles(offset);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createRole(this.state);
    this.setState({ title: ' ' });
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
    const createBtn = (
       <button
          className="btn-floating btn-large waves-effect waves-light newBtn">
          <i className="material-icons">add</i>
        </button>
    );

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
        <Modal header="Create Role" trigger={createBtn}>
              <form className="col s12" onSubmit={this.onSubmit}>
                <div className="row">
                  <TextFieldGroup
                    label="Title"
                    onChange={this.onChange}
                    value={this.state.title}
                    icon="account_circle"
                    field="title"
                    placeholder="alphabets only"
                  />

                  <button className="btn waves-effect waves-light submitBtn"
                    type="submit" name="action">Create
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

RolesPage.propTypes = {
  fetchRoles: React.PropTypes.func.isRequired,
  createRole: React.PropTypes.func.isRequired,
  roles: React.PropTypes.any.isRequired,
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

export default connect(mapStateToProps, { fetchRoles, createRole })(RolesPage);
