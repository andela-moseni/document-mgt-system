import React from 'react';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const myColor = { background: '#ff0000', text: '#FFFFFF' };
    e.preventDefault();
    if (this.state.password.length < 4) {
      return notify.show('password must be minimum of four characters only',
        'custom', 3000, myColor);
    }
    if (this.state.password === this.state.passwordConfirmation) {
      return this.props.userSignupRequest(this.state);
    }
    return notify.show('Passwords do not match', 'custom', 3000, myColor);
  }

  render() {
    return (
      <div className="row signupForm">
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

            <button className="btn waves-effect waves-light submitBtn"
            type="submit" name="action">Submit
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
