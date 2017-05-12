import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { login } from '../../actions/loginActions';
import {notify} from 'react-notify-toast';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    let myColor = { background: '#ff0000', text: "#FFFFFF"};
    e.preventDefault();
    this.props.login(this.state).then(() => {
      browserHistory.push('/');
      notify.show("Login successful", "success", 3000);
    }).catch((error) =>  {
      notify.show(error.response.data.message, "custom", 3000, myColor);
    });
  }

  render() {
    return(
      <div className="row signupForm">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3>Login form</h3>
          <div className="row">
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
            />
            <button className="btn waves-effect waves-light submitBtn" type="submit" name="action">Login
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { login })(LoginForm);
