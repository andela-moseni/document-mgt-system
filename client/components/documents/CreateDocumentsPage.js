import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateDocumentsForm from './CreateDocumentsForm';
import { fetchDocument, updateDocument } from '../../actions/documentsActions';

class CreateDocumentsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: Object.assign({}, this.props.document),
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('next man', nextProps);
    if (this.props.document.id !== nextProps.document.id) {
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  render() {
    return (
      <div className="row signupPage">
        <div className="col-md-4 col-md-offset-4">
          <CreateDocumentsForm
          document={this.props.document}
          />
        </div>
      </div>
    );
  }
}

CreateDocumentsPage.propTypes = {
  document: PropTypes.object,
  actions: PropTypes.object.isRequired,
  documentId: PropTypes.number,
};

CreateDocumentsPage.contextTypes = {
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

const mapDispatchToProps = {
  fetchDocument,
  updateDocument,
};

export default
connect(mapStateToProps, mapDispatchToProps)(CreateDocumentsPage);
