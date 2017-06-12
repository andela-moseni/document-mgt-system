import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import { deleteDocument, fetchDocument,
  docFetched } from '../../actions/documentsActions';
import Prompt from '../../Prompt';

/**
 *
 * @class Document
 * @extends {React.Component}
 */
export class Document extends React.Component {
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

  /**
   * Renders a document if it exists
   *
   * @memberOf Document
   */
  componentWillMount() {
    if (!this.props.document.title) {
      this.props.fetchDocument(this.props.params.id);
    }
  }

  /**
   * Modify content to plain text
   * @returns {Object}
   *
   * @memberOf Document
   */
  createMarkup() {
    return { __html: this.props.document.content };
  }

  /**
   * Delete a document
   *
   * @memberOf Document
   */
  deleteDocument() {
    this.props.deleteDocument(this.props.document.id)
      .then(() => {
        notify.show('Document deleted successfully', 'success', 3000);
        browserHistory.push('/my-documents');
      });
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf Document
   */
  render() {
    const { document } = this.props;
    // conditional rendering for delete and edit
    const curUser =
    localStorage.jwtToken ? jwt.decode(localStorage.jwtToken) : '';

    let deleteBtn = null;
    let editBtn = null;
    if (curUser) {
      const curUserId = curUser.userId;
      const curUserRole = curUser.roleId;
      if (document.OwnerId === curUserId || curUserRole === 1) {
        editBtn = (
          <button
            className="btn-floating btn-large waves-effect waves-light"
          >
            <i className="material-icons">edit</i>
          </button>
        );
        deleteBtn = (
          <button
            className="btn-floating btn-large waves-effect waves-light cyan"
          >
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
            <div
              className="card-content"
              dangerouslySetInnerHTML={this.createMarkup()}
            />
            <div className="card-action">
              <a href="/users" className="waves-effect waves-light btn">
                OwnerId: {document.OwnerId} </a>
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

/**
 *
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = state => ({
  document: state.document.document,
  documents: state.document.documents,
});

export default connect(mapStateToProps,
{ deleteDocument, fetchDocument, docFetched })(Document);
