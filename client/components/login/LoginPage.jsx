import React from 'react';
import LoginForm from './LoginForm';

/**
 * Login Page - renders login form
 * @returns {Object} jsx Object
 */
const LoginPage = () => (
  <div className="row signupPage">
    <div className="col-md-4 col-md-offset-4">
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;
