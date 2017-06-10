import React from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import NavigationBar from './NavigationBar';
import Footer from '../components/Footer';

/**
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   * @memberOf App
   */
  render() {
    return (
      <div>
        <div className="main">
          <Notifications />
          <NavigationBar />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
