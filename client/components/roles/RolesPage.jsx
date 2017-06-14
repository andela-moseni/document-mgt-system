import React from 'react';
import { connect } from 'react-redux';
import { Modal, Pagination } from 'react-materialize';
import { notify } from 'react-notify-toast';
import isEmpty from 'lodash/isEmpty';
import { fetchRoles, createRole } from '../../actions/rolesActions';
import RoleListRow from './RoleListRow';
import TextFieldGroup from '../common/TextFieldGroup';

/**
 *
 * @class RolesPage
 * @extends {React.Component}
 */
export class RolesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * Renders all roles
   *
   * @memberOf RolesPage
   */
  componentWillMount() {
    this.props.fetchRoles();
  }

  /**
   * onSelect - Page count
   * @param {Number} pageNumber
   *
   * @memberOf RolesPage
   */
  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    this.props.fetchRoles(offset);
  }

  /**
   * Control input fields
   * @param {Object} event
   *
   * @memberOf RolesPage
   */
  onChange(event) {
    this.setState({ title: event.target.value });
  }

  /**
   * Creates a role
   * @param {Object} event
   *
   * @memberOf RolesPage
   */
  onSubmit(event) {
    event.preventDefault();
    const custom = { background: '#FF0000', text: '#FFFFFF' };

    this.setState({ title: this.state.title.replace(/\s/g, '') });
    if (isEmpty(this.state.title)) {
      return notify.show('Title field is required', 'custom', 3000, custom);
    }
    if (this.state.title && !/[a-z]+$/i.test(this.state.title)) {
      return notify.show('Only alphabets is allowed', 'custom', 3000, custom);
    }

    if (this.state.title && this.state.title.length < 4) {
      return notify.show('Title field must be minimum of four letters',
      'custom', 3000, custom);
    }
    if (this.state.title && this.state.title.length > 20) {
      return notify.show('Title field must be maximum of twenty letters',
      'custom', 3000, custom);
    }
    this.props.createRole(this.state).then(() => {
      notify.show('Role created successfully', 'success', 3000);
      this.setState({ title: '' });
    }).catch((error) => {
      notify.show(error.response.data.message, 'custom', 3000, custom);
    });
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf RolesPage
   */
  render() {
    const { roles, pagination } = this.props.roles;
    if (!roles) return null;
    if (!roles.length) {
      return (
        <div className="container">
          <h2 className="white-text center-align">No roles found.</h2>
        </div>
      );
    }
    const { pageCount, currentPage } = pagination;
    const createBtn = (
      <button
        className="btn-floating btn-large waves-effect waves-light newBtn"
        id="rolesBtn"
      >
        <i className="material-icons">add</i>
      </button>
    );

    return (
      <div className="container">
        <h3 className="white-text center-align"> {roles.length} roles </h3>
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
            <form className="col s12 rolesForm" onSubmit={this.onSubmit}>
              <div className="row">
                <TextFieldGroup
                  id="titleUnique"
                  label="Title"
                  onChange={this.onChange}
                  value={this.state.title}
                  icon="account_circle"
                  field="title"
                  placeholder="alphabets only"
                />

                <button
                  className="btn waves-effect waves-light submitBtn"
                  id="crRole"
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
