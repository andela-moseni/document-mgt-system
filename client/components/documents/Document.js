import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import jwt from 'jsonwebtoken';
import { Button } from 'react-materialize';
import { deleteDocument, fetchDocument,
  docFetched } from '../../actions/documentsActions';
import Prompt from '../../Prompt';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    if (this.props.documents) {
      const docId = this.props.params.id;
      const document = this.props.documents
      .find(doc => doc.id === Number(docId));
      if (document !== undefined) {
        this.props.docFetched(document);
      }
    }
  }

  componentWillMount() {
    if (!this.props.document.title) {
      this.props.fetchDocument(this.props.params.id);
    }
  }

  deleteDocument() {
    this.props.deleteDocument(this.props.document.id);
  }

  render() {
    const { document } = this.props;
    if (!document || (document && !document.title)) {
      return (
        <div>Loading content...</div>
      );
    }
    // conditional rendering for delete and edit
    const curUser = jwt.decode(localStorage.jwtToken);
    let deleteBtn = null;
    let editBtn = null;
    if (curUser) {
      const curUserId = curUser.userId;
      const curUserRole = curUser.roleId;
      if (document.OwnerId === curUserId || curUserRole === 1) {
        editBtn = (
          <button
            className="btn-floating btn-large waves-effect waves-light">
            <i className="material-icons">edit</i>
          </button>
        );
        deleteBtn = (
          <button
            className="btn-floating btn-large waves-effect waves-light cyan">
            <i className="material-icons red">delete</i>
          </button>
        );
      }
    }
    return (
      <div>
        <div className="row centered">
            <div className="card">
              <h3 id="heading"> {document.title} </h3>
              <div className="card-content">
                <p> {document.content} </p>
              </div>
              <div className="card-action">
                <a href="/users" className="waves-effect waves-light btn">OwnerId: {document.OwnerId} </a>
                <a href={`/documents/${document.id}`}> {editBtn}</a>
                <Prompt
                  trigger={deleteBtn}
                  onClickFunction={this.deleteDocument}
                />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

Document.propTypes = {
  document: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  params: PropTypes.object,
  docFetched: PropTypes.func.isRequired,
  fetchDocument: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  document: state.document.document,
  documents: state.document.documents,
});

export default connect(mapStateToProps,
{ deleteDocument, fetchDocument, docFetched })(Document);
