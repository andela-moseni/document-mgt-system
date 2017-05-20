import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import { fetchRoles, updateRole, deleteRole } from '../../actions/rolesActions';
import Prompt from '../../Prompt';
import TextFieldGroup from '../common/TextFieldGroup';

class RoleListRow extends React.Component {
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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateRole(this.state);
  }
  // onSubmit(e) {
  //   e.preventDefault();
  //   if (this.props.id) {
  //     this.props.updateRole(this.state);
  //   } else {
  //     this.props.createRole(this.state);
  //   }
  //   this.setState({ title: ' ' });
  // }


  deleteRole() {
    const roleId = this.props.role.id;
    this.props.deleteRole(roleId);
  }

  render() {
    const { role, serial } = this.props;
    const newDate = new Date(role.updatedAt);
    const date = new Date(role.createdAt);
    return (
      <tr>
      <td> {serial} </td>
      <td>{role.title}</td>
      <td> {date.toDateString()} </td>
      <td> {newDate.toDateString()} </td>
      <td>
        <div className="center">
            <Modal header="Update Role" fixedFooter trigger={
              <button
                className="btn-floating btn-large waves-effect waves-light">
                <i className="material-icons">edit</i>
              </button>}>
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
        trigger={
          <button
          className="btn-floating btn-large waves-effect waves-light cyan">
          <i className="material-icons red">delete</i>
        </button>
        }
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
  // console.log(state);
  return {
    roles: state.roles,
    roleId: state.roles.roleId,
  };
}

export default connect(mapStateToProps,
{ fetchRoles, updateRole, deleteRole })(RoleListRow);
