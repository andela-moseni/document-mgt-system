import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { login } from '../../actions/loginActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  render() {
    return (
      <div className="row signup-form">
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
            <button className="btn waves-effect waves-light submitBtn"
            type="submit" name="action">Login
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginForm);
// export default LoginForm;
