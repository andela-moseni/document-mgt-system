import React from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/usersActions';
import DocumentListRow from '../documents/DocumentListRow';

class UserDocuments extends React.Component {
  componentWillMount() {
    // const { userId } = this.props;
    const { id } = this.props.params;
    this.props.loadUserDocuments(id);
  }
  render() {
    const { documents } = this.props;
    let serial = 0;

    /*if (documents.length === 0) {
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
          {/*{documents.map((document) => {
            serial += 1;
            return (<DocumentListRow
            key={serial} document={document} serial={serial} />);
          })}*/}
        </tbody>
      </table>
    </div>
    );
  }
}

/**
 *
 *
 * @param {any} dispatch
 * @returns
 */
function mapDispatchToProps(dispatch) {
  return {
    loadUserDocuments: id => dispatch(usersActions
    .fetchUserDocuments(id)),
  };
}

/**
 *
 *
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  console.log('my state', state);
  return {
    documents: state.users.documents,
    // userId: state.users.userId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDocuments);
