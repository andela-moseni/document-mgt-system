import React from 'react';

class Greetings extends React.Component {
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('select').material_select();
    $('input#input_text, textarea#textarea1').characterCounter();
    $('.modal').modal();
    $('#searchBar').hide();
    $('#searchIcon').click(() => {
      $('#searchBar').show();
      $('#search').focus();
    });
    $('#search').focusout(() => {
      $('#searchBar').hide();
    });
    const enlarge = () => {
      $('#fiddle-text').animate({
        letterSpacing: '+=3px',
      }, 2000, reduce);
    };

    let reduce = () => {
      $('#fiddle-text').animate({
        letterSpacing: '-=3px',
      }, 2000, enlarge);
    };

    enlarge();
  }

  render() {
    return (
      <div className="container homePage"><br /><br /><br /><br /><br /><br />
      <br /><br /><br />
        <h3 id="fiddle-text" className="color-text center-align">
          Welcome to Meek - Document Management System
        </h3>
      </div>
    );
  }
}

export default Greetings;
