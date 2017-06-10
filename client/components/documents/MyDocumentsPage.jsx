import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Pagination } from 'react-materialize';
import { fetchMyDocuments } from '../../actions/documentsActions';
import DocumentListRow from './DocumentListRow';

/**
 *
 * @class MyDocumentsPage
 * @extends {React.Component}
 */
class MyDocumentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * Renders all user's documents
   *
   * @memberOf MyDocumentsPage
   */
  componentWillMount() {
    const { userId } = this.props;
    this.props.fetchMyDocuments(userId);
  }

  /**
   * onSelect - Page count
   * @param {Number} pageNumber
   *
   * @memberOf MyDocumentsPage
   */
  onSelect(pageNumber) {
    const { userId } = this.props;
    const offset = (pageNumber - 1) * 10;
    this.props.fetchMyDocuments(userId, offset);
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf MyDocumentsPage
   */
  render() {
    const { documents, pagination } = this.props.documents;
    let serial = 0;
    if (documents.length === 0) {
      return (
        <div className="container"><br />
          <h2 className="white-text">No documents found.</h2>
          <h4 className="white-text">Kindly
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
          My Documents - {totalCount} documents
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
            {documents.map((document) => {
              serial += 1;
              return (<DocumentListRow
                key={serial} document={document} serial={serial}
              />);
            })}
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

MyDocumentsPage.propTypes = {
  fetchMyDocuments: React.PropTypes.func.isRequired,
  userId: React.PropTypes.number,
  documents: React.PropTypes.any.isRequired,
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
    userId: state.auth.user.userId,
  };
}

export default connect(mapStateToProps, { fetchMyDocuments })(MyDocumentsPage);
