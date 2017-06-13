import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Pagination } from 'react-materialize';
import { fetchDocuments } from '../../actions/documentsActions';
import DocumentListRow from './DocumentListRow';

/**
 *
 * @class DocumentsPage
 * @extends {React.Component}
 */
export class DocumentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * Renders all documents
   *
   * @memberOf DocumentsPage
   */
  componentWillMount() {
    this.props.fetchDocuments();
  }

  /**
   * onSelect - Page count
   * @param {Number} pageNumber
   *
   * @memberOf DocumentsPage
   */
  onSelect(pageNumber) {
    const offset = (pageNumber - 1) * 10;
    this.props.fetchDocuments(offset);
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf DocumentsPage
   */
  render() {
    const { documents, pagination } = this.props.documents;
    if (!documents) return null;
    if (!documents.length) {
      return (
        <div className="container"><br /><br />
          <h2 className="white-text">No documents found.</h2>
        </div>
      );
    }
    if (documents.length === 0) {
      return (
        <div className="container">
          <h2 className="white-text center-align">No documents found.</h2>
          <h4 className="white-text center-align">Kindly
              <Link to="/create-document"> create documents </Link>
              to explore Meek DMS
            </h4>
        </div>
      );
    }
    const { pageCount, currentPage, totalCount } = pagination;
    return (
      <div className="container">
        <h3 className="white-text center-align">
          All Documents - {totalCount} documents
        </h3>
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
              <DocumentListRow
                key={index}
                document={document} serial={index + 1}
              />)}
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
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.any,
};

/**
 *
 *
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    documents: state.document,
  };
}

export default connect(mapStateToProps, { fetchDocuments })(DocumentsPage);
