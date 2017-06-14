import React from 'react';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { validateSignUp } from '../../utils/validator';

/**
 *
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Control input fields
   * @param {Object} event
   *
   * @memberOf SignupForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Signup a user
   * @param {any} event
   * @returns {Object}
   *
   * @memberOf SignupForm
   */
  onSubmit(event) {
    event.preventDefault();
    const custom = { background: '#ff0000', text: '#FFFFFF' };
    const { valid } = validateSignUp(this.state);

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
      return this.props.userSignupRequest(this.state);
    }
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf SignupForm
   */
  render() {
    return (
      <div className="row signup-form">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3>Signup Form</h3>
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

            <TextFieldGroup
              label="Password"
              onChange={this.onChange}
              value={this.state.password}
              icon="vpn_key"
              field="password"
              type="password"
              placeholder="password must be minimum of four characters"
            />

            <TextFieldGroup
              label="Confirm Password"
              onChange={this.onChange}
              value={this.state.passwordConfirmation}
              icon="vpn_key"
              field="passwordConfirmation"
              type="password"
              placeholder="passwords must match"
            />

            <button
              className="btn waves-effect waves-light submitBtn"
              type="submit" name="action"
            >Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};

export default SignupForm;
