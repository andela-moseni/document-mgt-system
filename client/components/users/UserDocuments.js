import React from 'react';
import { connect } from 'react-redux';
import { fetchUserDocuments } from '../../actions/documentsActions';
import DocumentListRow from '../documents/DocumentListRow';

class UserDocuments extends React.Component {
  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchUserDocuments(id);
  }
  render() {
    const { documents } = this.props;
    let serial = 0;

    /* if (documents.length === 0) {
      return (
        <div className="container">
          <h2>No documents found.</h2>
        </div>
      );
    }*/
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
           {documents.map((document) => {
             serial += 1;
             return (<DocumentListRow
            key={serial} document={document} serial={serial} />);
           })}
        </tbody>
      </table>
    </div>
    );
  }
}

/**
 *
 *
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    documents: state.document.documents,
  };
}

export default connect(mapStateToProps, { fetchUserDocuments })(UserDocuments);
