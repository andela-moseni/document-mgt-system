import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import { notify } from 'react-notify-toast';
import validator from 'validator';
import * as usersActions from '../../actions/usersActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Prompt from '../../Prompt';
import { validateUser } from '../../utils/validator';

/**
 *
 * @class UserProfile
 * @extends {React.Component}
 */
export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name || '',
      email: props.user.email || '',
      password: '',
      passwordConfirmation: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * Render user's profile
   *
   * @memberOf UserProfile
   */
  componentWillMount() {
    const { userId } = this.props;
    this.props.loadUserProfile(userId);
  }

  /**
   * Renders a user profile
   * @param {Object} nextProps
   *
   * @memberOf UserProfile
   */
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

  /**
   * Control input fields
   * @param {Object} event
   *
   * @memberOf UserProfile
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Updates a user
   * @param {Object} event
   *
   * @memberOf UserProfile
   */
  onSubmit(event) {
    event.preventDefault();
    const custom = { background: '#ff0000', text: '#FFFFFF' };
    const { valid } = validateUser(this.state);

    if (this.state.name && !/[a-z]+$/i.test(this.state.name)) {
      return notify.show('Only alphabets is allowed for name field',
      'custom', 3000, custom);
    }
    if (this.state.email && !validator.isEmail(this.state.email)) {
      return notify.show('Enter valid email',
      'custom', 3000, custom);
    }
    if (this.state.password && this.state.password.length < 4) {
      return notify.show('password must be minimum of four characters only',
        'custom', 3000, custom);
    }
    if (this.state.password && this.state.password.length > 20) {
      return notify.show('Password field must be maximum of twenty letters',
      'custom', 3000, custom);
    }
    if (this.state.password &&
    this.state.password !== this.state.passwordConfirmation) {
      return notify.show('Passwords do not match', 'custom', 3000, custom);
    }

    if (valid) {
      const { id, name, email, password } = this.state;
      const data = { id, name, email };
      if (password) {
        data.password = password;
      }
      this.props.updateUser(data);
      return this.setState({
        password: '',
        passwordConfirmation: ''
      });
    }
  }

  /**
   * Deletes a user
   * @memberOf UserProfile
   */
  deleteUser() {
    this.props.deleteUser(this.props.user.id)
    .then(() => {
      notify.show('User deleted successfully', 'success', 3000);
    });
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf UserProfile
   */
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
                  <div className="input-field col s12">
                    <TextFieldGroup
                      s={10}
                      label="Full Name"
                      onChange={this.onChange}
                      value={this.state.name}
                      icon="account_circle"
                      field="name"
                      placeholder="alphabets only"
                    />
                  </div>

                  <div className="input-field col s12">
                    <TextFieldGroup
                      s={10}
                      label="Email"
                      onChange={this.onChange}
                      value={this.state.email}
                      icon="email"
                      field="email"
                      type="email"
                      placeholder="Email"
                    />
                  </div>

                  <div className="input-field col s12">
                    <TextFieldGroup
                      s={10}
                      label="Password"
                      onChange={this.onChange}
                      value={this.state.password}
                      icon="vpn_key"
                      field="password"
                      type="password"
                      placeholder="password must be minimum of four characters"
                    />
                  </div>

                  <div className="input-field col s12">
                    <TextFieldGroup
                      s={8}
                      label="Confirm Password"
                      onChange={this.onChange}
                      value={this.state.passwordConfirmation}
                      icon="vpn_key"
                      field="passwordConfirmation"
                      type="password"
                      placeholder="passwords must match"
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

UserProfile.propTypes = {
  user: React.PropTypes.object.isRequired,
  userId: React.PropTypes.number,
  loadUserProfile: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired,
};

/**
 *
 *
 * @param {Object} dispatch
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
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    user: state.users.user,
    userId: state.auth.user.userId,
    roleId: state.auth.user.roleId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
