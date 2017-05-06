import React from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';

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
    if (this.state.password === this.state.passwordConfirmation) {
      // return axios.post('/api/users', this.state );
      return this.props.userSignupRequest(this.state);
    }
    console.log("Invalid password");
  }

  render() {
    return (
      <div className="row signupForm">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3>Signup Form</h3>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input 
              value={this.state.name}
              onChange={this.onChange}
              name="name" 
              type="text" 
              className="validate" required />
              <label>Full Name</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input 
              value={this.state.email}
              onChange={this.onChange}
              name="email" 
              type="email" 
              className="validate" required />
              <label>Email</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input
              value={this.state.password}
              onChange={this.onChange}
              name="password"
              type="password"
              className="validate" required />
              <label>Password</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input
              value={this.state.passwordConfirmation}
              onChange={this.onChange}
              name="passwordConfirmation"
              type="password"
              className="validate" required />
              <label>Confirm Password</label>
            </div>

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