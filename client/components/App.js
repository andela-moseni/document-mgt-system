import React from 'react';
import Notifications from 'react-notify-toast';
import NavigationBar from './NavigationBar';
import Footer from '../components/Footer';

class App extends React.Component {
  render() {
    return (
      <div className="">
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

export default App;
