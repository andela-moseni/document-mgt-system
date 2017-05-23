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
      <div className="container homePage">
        <h4 id="fiddle-text">Welcome to Meek - Document Management System</h4>
      </div>
    );
  }
}

export default Greetings;
