import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import userSignupRequest from '../../actions/signupActions';

/**
 *
 * @class SignupPage
 * @extends {React.Component}
 */
class SignupPage extends React.Component {
  /**
   * Renders the component
   * @returns {Object} jsx component
   * @memberOf SignupPage
   */
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row signupPage">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};

export default connect(null, { userSignupRequest })(SignupPage);
