import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import { notify } from 'react-notify-toast';
import isEmpty from 'lodash/isEmpty';
import { fetchRoles, updateRole, deleteRole } from '../../actions/rolesActions';
import Prompt from '../../Prompt';
import TextFieldGroup from '../common/TextFieldGroup';

/**
 *
 * @class RoleListRow
 * @extends {React.Component}
 */
export class RoleListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.role.id,
      title: this.props.role.title,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
  }
  /**
   * Control input fields
   * @param {Object} event
   *
   * @memberOf RoleListRow
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Updates a role
   * @param {Object} event
   *
   * @memberOf RoleListRow
   */
  onSubmit(event) {
    event.preventDefault();
    const custom = { background: '#ff0000', text: '#FFFFFF' };

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
    this.props.updateRole(this.state).then(() => {
      notify.show('Update successful', 'success', 3000);
    }).catch((error) => {
      notify.show(error.response.data.message, 'custom', 3000, custom);
    });
  }

  /**
   * Deletes a role
   *
   * @memberOf RoleListRow
   */
  deleteRole() {
    const roleId = this.props.role.id;
    this.props.deleteRole(roleId).then(() => {
      notify.show('Role deleted successfully', 'success', 3000);
    });
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf RoleListRow
   */
  render() {
    const { role, serial } = this.props;
    const newDate = new Date(role.updatedAt);
    const date = new Date(role.createdAt);
    const editBtn = (
      <button
        className="btn-floating btn-large waves-effect waves-light"
      >
        <i className="material-icons">edit</i>
      </button>
    );
    const deleteBtn = (
      <button
        className="btn-floating btn-large waves-effect waves-light cyan"
      >
        <i className="material-icons red">delete</i>
      </button>
    );

    return (
      <tr>
        <td> {serial} </td>
        <td>{role.title}</td>
        <td> {date.toDateString()} </td>
        <td> {newDate.toDateString()} </td>
        <td>
          <div className="center">
            <Modal
              header="Update Role"
              trigger={editBtn}
            >
              <form className="col s12" onSubmit={this.onSubmit}>
                <div className="row">
                  <TextFieldGroup
                    id="editRole"
                    label="Title"
                    onChange={this.onChange}
                    value={this.state.title}
                    icon="account_circle"
                    field="title"
                    placeholder="minimum of four letters and alphabets only"
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
            onClickFunction={this.deleteRole}
          />
        </td>
      </tr>
    );
  }
}

RoleListRow.propTypes = {
  role: PropTypes.object.isRequired,
  serial: PropTypes.number.isRequired,
  updateRole: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired,
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
    roleId: state.roles.roleId,
  };
}

export default connect(mapStateToProps,
{ fetchRoles, updateRole, deleteRole })(RoleListRow);
