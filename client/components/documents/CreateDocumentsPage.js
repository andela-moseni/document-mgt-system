import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateDocumentsForm from './CreateDocumentsForm';
import { fetchDocument, updateDocument,
  docFetched } from '../../actions/documentsActions';

class CreateDocumentsPage extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div className="row signupPage">
        <div className="col-md-4 col-md-offset-4">
          <CreateDocumentsForm
          id={this.props.params.id}
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

const mapDispatchToProps = {
  fetchDocument,
  updateDocument,
  docFetched,
};

const mapStateToProps = state => ({
  document: state.document.document,
  documents: state.document.documents,
});

export default
connect(mapStateToProps, mapDispatchToProps)(CreateDocumentsPage);
