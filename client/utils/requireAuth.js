import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import * as loginActions from '../actions/loginActions';

const secret = 'YourJWTSecretKey';

/**
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {Object}
 */
export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      const token = localStorage.getItem('jwtToken');
      jwt.verify(token, secret, (error) => {
        if (error) {
          this.props.actions.logout();
          browserHistory.push('/login');
        }
      });

      if (!this.props.isAuthenticated) {
        browserHistory.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        browserHistory.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    actions: React.PropTypes.object.isRequired,
  };

  /**
   *
   * @param {any} dispatch
   * @returns {Object}
   */
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(loginActions, dispatch),
    };
  }

  /**
   *
   * @param {any} state
   * @returns {Object}
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
