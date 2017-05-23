import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { fetchMyDocuments } from '../../actions/documentsActions';
import DocumentListRow from '../documents/DocumentListRow';

class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.params;
    this.props.fetchMyDocuments(id);
  }

  onSelect(pageNumber) {
    const { id } = this.props.params;
    const offset = (pageNumber - 1) * 10;
    this.props.fetchMyDocuments(id, offset);
  }

  render() {
    const { documents, pagination } = this.props.documents;
    let serial = 0;

    if (documents.length === 0) {
      return (
        <div className="container">
          <h2>User has no documents...</h2>
        </div>
      );
    }
    const { pageCount, currentPage, totalCount } = pagination;
    return (
      <div className="container">
        <h3> {totalCount} Documents </h3>
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

UserDocuments.propTypes = {
  id: React.PropTypes.number,
  fetchMyDocuments: React.PropTypes.func.isRequired,
  documents: React.PropTypes.any.isRequired,
};

/**
 *
 *
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    documents: state.document,
  };
}

export default connect(mapStateToProps, { fetchMyDocuments })(UserDocuments);
