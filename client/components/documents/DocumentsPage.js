import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Pagination } from 'react-materialize';
import { fetchDocuments } from '../../actions/documentsActions';
import DocumentListRow from './DocumentListRow';

class DocumentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  componentWillMount() {
    this.props.fetchDocuments();
  }

  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    this.props.fetchDocuments(offset);
  }

  render() {
    const { documents, pagination } = this.props.documents;
    if (!documents) return null;
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
    const { pageCount, currentPage, totalCount } = pagination;
    return (
      <div className="container">
        <h3> All Documents - {totalCount} documents</h3>
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
          {documents.map((document, index) =>
          <DocumentListRow key={index}
          document={document} serial={index + 1} />)}
        </tbody>
      </table>
      <div className="center-align">
        <Pagination
          items={pageCount} activePage={currentPage}
          maxButtons={pageCount}
          onSelect={this.onSelect}
        />
      </div>
    </div>
    );
  }
}

DocumentsPage.propTypes = {
  fetchDocuments: React.PropTypes.func.isRequired,
  documents: React.PropTypes.any.isRequired,
};

/**
 *
 *
 * @param {any} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    documents: state.document,
  };
}

export default connect(mapStateToProps, { fetchDocuments })(DocumentsPage);
