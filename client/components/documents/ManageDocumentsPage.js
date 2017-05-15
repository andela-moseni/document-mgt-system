import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDocuments, updateDocument } from '../../actions/documentsActions';
import CreateDocumentsForm from '../documents/CreateDocumentsForm';

// let simplemde;

class ManageDocumentsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: Object.assign({}, this.props.document),
    };

    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
  }

  // componentDidMount() {
  //   $('select').material_select();
  //   simplemde = new SimpleMDE(); // eslint-disable-line no-undef
  //   // const { fetchDocuments, params } = this.props;
  //   // fetchDocuments(params.id);
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.document.id !== nextProps.document.id) {
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  // componentDidUpdate() {
  //   $('select').material_select();
  //   simplemde.value(this.props.document.content);
  // }

  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document.documents;
    return this.setState({ document });
  }

  saveDocument(event) {
    event.preventDefault();
    const document = this.state.document.documents;
    // document.content = simplemde.value();
    this.props.actions.updateDocument(document);
    this.context.router.push(`/documents/view/${this.props.documentId}`);
  }

  render() {
    return (
      <div className="container">
        <h2> Manage Document </h2>
        <CreateDocumentsForm
          document={this.props.document}
          onSave={this.saveDocument}
          onChange={this.updateDocumentState}
          />

      </div>
    );
  }
}

ManageDocumentsPage.propTypes = {
  document: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  documentId: PropTypes.number,
};

ManageDocumentsPage.contextTypes = {
  router: PropTypes.object,
};

const getDocumentById = (documents, id) => {
  const document = documents.find(doc => doc.id === id);
  if (document) return document;
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const documentId = Number(ownProps.params.id) || 0;
  let document = {
    id: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    OwnerId: '',
  };

  if (documentId && state.document.documents) {
    document = getDocumentById(state.document.documents, documentId);
  }

  return {
    document,
    documentId,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => ({
//     actions: bindActionCreators(documentsActions, dispatch)
//   });
const mapDispatchToProps = {
  fetchDocuments,
  updateDocument,
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentsPage);
