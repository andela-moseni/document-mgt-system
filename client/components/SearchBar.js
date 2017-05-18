import React from 'react';
import { connect } from 'react-redux';
import { searchDocuments } from './../actions/documentsActions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.searchDocuments(this.state.search);
  }

  render() {
    return (
    <div className="nav-wrapper" id="searchBar">
      <form onSubmit={this.onSubmit}>
        <div className="input-field">
           <input id="search" type="search"
           onChange={this.onChange}
           name="search"
           value={this.state.search}
           required />
          <label className="label-icon"><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
        </div>
      </form>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    documents: state.document.documents,
  };
}

export default connect(mapStateToProps, { searchDocuments })(SearchBar);
