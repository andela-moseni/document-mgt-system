import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {notify} from 'react-notify-toast';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount () {
      if (!this.props.isAuthenticated) {
        browserHistory.push('/login');
      }
    }

    componentWillUpdate (nextProps) {
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
    isAuthenticated: React.PropTypes.bool.isRequired
  }

  function mapStateToProps (state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps)(Authenticate);
}