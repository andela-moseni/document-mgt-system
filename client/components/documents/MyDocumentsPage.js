import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Pagination } from 'react-materialize';
import { fetchMyDocuments } from '../../actions/documentsActions';
import DocumentListRow from './DocumentListRow';

class MyDocumentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    const { userId } = this.props;
    this.props.fetchMyDocuments(userId);
  }

  onSelect(pageNumber) {
    const { userId } = this.props;
    const offset = (pageNumber - 1) * 10;
    this.props.fetchMyDocuments(userId, offset);
  }

  render() {
    const { documents, pagination } = this.props.documents;
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
    const { pageCount, currentPage, totalCount } = pagination;
    return (
      <div className="container">
        <h3> My Documents - {totalCount} documents</h3>
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
  userId: React.PropTypes.number.isRequired,
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
    userId: state.auth.user.userId,
  };
}

export default connect(mapStateToProps, { fetchMyDocuments })(MyDocumentsPage);
