import React from 'react';
import { connect } from 'react-redux';
import { Input, Modal } from 'react-materialize';
import { notify } from 'react-notify-toast';
import * as usersActions from '../../actions/usersActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Prompt from '../../Prompt';

class userProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      // password: this.props.user.password,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount() {
    const { userId } = this.props;
    this.props.loadUserProfile(userId);
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
    this.props.updateUser(this.state);
  }

  deleteUser() {
    this.props.deleteUser(this.props.user.id)
    .then(() => {
      notify.show('User deleted successfully', 'success', 3000);
    });
  }

  render() {
    const user = this.props.user;
    return (
      <div className="container">
        <div className="wrap">
          <h3 className="white-text center-align"> My Profile </h3>
          <table className="striped responsive-table highlight signup-form">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Password</td>
                <td>******</td>
              </tr>
              <tr>
                <td>Role Title</td>
                <td>{user.roleTitle}</td>
              </tr>
            </tbody>
          </table>
          <div className="center">
            <Modal
              header="Update Profile" fixedFooter trigger={
                <button
                  className="btn-floating btn-large waves-effect waves-light"
                >
                  <i className="material-icons">edit</i>
                </button>}
            >
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

                  <div className="input-field col s12">
                    <Input
                      s={8}
                      label="Password"
                      onChange={this.onChange}
                      value={this.state.password}
                      icon="vpn_key"
                      name="password"
                      type="password"
                      placeholder="password must be minimum of four characters"
                    />
                  </div>

                  <button
                    className="btn waves-effect waves-light submitBtn"
                    type="submit" name="action"
                  >Update
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </Modal>&nbsp;&nbsp;&nbsp;
            <Prompt
              trigger={
                <button
                  className="btn-floating btn-large waves-effect waves-light red"
                >
                  <i className="material-icons">delete</i>
                </button>}
              onClickFunction={this.deleteUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

userProfile.propTypes = {
  user: React.PropTypes.object.isRequired,
  userId: React.PropTypes.number,
  loadUserProfile: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired,
};

/**
 *
 *
 * @param {any} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    loadUserProfile: userId => dispatch(usersActions.fetchUserProfile(userId)),
    updateUser: userId => dispatch(usersActions.updateUser(userId)),
    deleteUser: userId => dispatch(usersActions.deleteUser(userId)),
  };
}

/**
 *
 *
 * @param {any} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    user: state.users.user,
    userId: state.auth.user.userId,
    roleId: state.auth.user.roleId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);
