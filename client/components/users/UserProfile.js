import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-materialize';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import * as usersActions from '../../actions/usersActions';
import TextFieldGroup from '../common/TextFieldGroup';

class userProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.user.password,
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
      const { user: { id, name, email, password } } = nextProps;
      this.setState({
        id,
        name,
        email,
        password,
      });
    }
  }

  deleteUser() {
    this.props.deleteUser(this.props.user.id);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateUser(this.state);
  }

  render() {
    const user = this.props.user;
    return (
      <div className="container">
        <div className="wrap">
          <h3> My Profile </h3>
          <table className="striped responsive-table highlight signupForm">
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
                <td>RoleID</td>
                <td>{user.roleId}</td>
              </tr>
            </tbody>
          </table>
          <div className="center">
            <Modal header="Update Profile"fixedFooter trigger={
              <Button waves="light" className="">EDIT</Button>}>
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

                  <TextFieldGroup
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    icon="vpn_key"
                    field="password"
                    type="password"
                    placeholder="password must be minimum of four characters"
                  />

                  {/*<TextFieldGroup
                    label="Confirm Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    icon="vpn_key"
                    field="passwordConfirmation"
                    type="password"
                    placeholder="passwords must match"
                  />*/}
                  <button className="btn waves-effect waves-light submitBtn" type="submit" name="action">Update
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </Modal>&nbsp;&nbsp;&nbsp;
        <Button className="red" onClick={this.deleteUser}>Delete</Button>
      </div>
      </div>
    </div>
    );
  }
}

userProfile.propTypes = {
  user: React.PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    loadUserProfile: userId => dispatch(usersActions.fetchUserProfile(userId)),
    updateUser: userId => dispatch(usersActions.updateUser(userId)),
    deleteUser: userId => dispatch(usersActions.deleteUser(userId)),
  };
}

function mapStateToProps(state) {
  return {
    user: state.users.user,
    userId: state.auth.user.userId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);
