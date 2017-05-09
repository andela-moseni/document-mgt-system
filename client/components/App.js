import React from 'react';
import NavigationBar from './NavigationBar';
import Notifications from 'react-notify-toast';

class App extends React.Component {
  render () {
    return (
      <div className="">
        <Notifications />
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;