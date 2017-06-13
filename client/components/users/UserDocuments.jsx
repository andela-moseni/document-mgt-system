import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'react-materialize';
import { fetchMyDocuments } from '../../actions/documentsActions';
import DocumentListRow from '../documents/DocumentListRow';

/**
 *
 * @class UserDocuments
 * @extends {React.Component}
 */
export class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * Renders user's documents
   * @memberOf UserDocuments
   */
  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchMyDocuments(id);
  }

  /**
   * onSelect - Page count
   * @param {Object} pageNumber
   *
   * @memberOf UserDocuments
   */
  onSelect(pageNumber) {
    const { id } = this.props.params;
    const offset = (pageNumber - 1) * 10;
    this.props.fetchMyDocuments(id, offset);
  }

  /**
   * Renders the component
   * @returns {Object} jsx component
   *
   * @memberOf UserDocuments
   */
  render() {
    const { documents, pagination } = this.props.documents;
    let serial = 0;

    if (!documents.length) {
      return (
        <div className="container">
          <h2 className="white-text">User has no documents...</h2>
        </div>
      );
    }
    const { pageCount, currentPage, totalCount } = pagination;
    return (
      <div className="container">
        <h3 className="white-text center-align"> {totalCount} Documents </h3>
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

UserDocuments.propTypes = {
  id: PropTypes.number,
  fetchMyDocuments: PropTypes.func.isRequired,
  documents: PropTypes.any.isRequired,
  params: PropTypes.object,
};

/**
 *
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    documents: state.document,
  };
}

export default connect(mapStateToProps, { fetchMyDocuments })(UserDocuments);
