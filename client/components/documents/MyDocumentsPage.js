import React from 'react';
import { connect } from 'react-redux';
import * as documentsActions from '../../actions/documentsActions';
import { Link } from 'react-router';
import DocumentListRow from './DocumentListRow';

class MyDocumentsPage extends React.Component {
  componentWillMount() {
    const { userId } = this.props;
    this.props.loadUserDocuments(userId);
  }
  render() {
    const {documents} = this.props;
    let serial = 0;

    if (documents.length === 0) {
      return (
        <div className="container">
          <h2>No documents found.</h2>
            <h4>Kindly <Link to="/create-document"> create documents </Link>
              to explore Meek DMS
            </h4>
        </div>
      );
    }
    return (
      <div className="container">
        <h3> My Documents </h3>
        <table className="striped responsive-table highlight"> 
          <thead>
            <tr>
              <th> S/NO </th>
              <th> Title </th>
              <th> Access </th>
              <th> Type </th>
              <th> OwnerId </th>
              <th> Last Updated </th>
            </tr>
          </thead>
        <tbody>
          {documents.map(document => {
            serial += 1;
            return <DocumentListRow key={serial} document={document} serial={serial} />;
          })}
        </tbody>
      </table>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserDocuments: userId => dispatch(documentsActions.fetchMyDocuments(userId)),
  };
}

function mapStateToProps(state) {
  return {
    documents: state.document.documents,
    userId: state.auth.user.userId
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDocumentsPage);