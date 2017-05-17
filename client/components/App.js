import React from 'react';
import NavigationBar from './NavigationBar';
import Notifications from 'react-notify-toast';
import Footer from '../components/Footer';

class App extends React.Component {
  render () {
    return (
      <div className="">
        <Notifications />
        <NavigationBar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
