import React from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (((this.state.name).length > 5) &&
      ((this.state.password).length > 5) &&
      (this.state.password === this.state.passwordConfirmation)) {
      // return axios.post('/api/users', this.state );
      return this.props.userSignupRequest(this.state).then(() => {
        browserHistory.push('/');
      });
    }
    alert(`Invalid credentials - 
    Passwords must be minimum of 6 characters and must match - 
    name should be alphabets only and minimum of 6 characters`);
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
            />
              
            <TextFieldGroup 
              label="Email"
              onChange={this.onChange}
              value={this.state.email}
              icon="email"
              field="email"
            />
            
            <TextFieldGroup 
              label="Password"
              onChange={this.onChange}
              value={this.state.password}
              icon="vpn_key"
              field="password"
              type="password"
            />

            <TextFieldGroup 
              label="Confirm Password"
              onChange={this.onChange}
              value={this.state.passwordConfirmation}
              icon="vpn_key"
              field="passwordConfirmation"
              type="password"
            />

            <button className="btn waves-effect waves-light submitBtn" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default SignupForm;