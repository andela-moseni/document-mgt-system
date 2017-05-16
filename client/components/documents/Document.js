import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-materialize';
import { deleteDocument, fetchDocument,
  docFetched } from '../../actions/documentsActions';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    if (this.props.documents) {
      const docId = this.props.params.id;
      const document = this.props.documents.find(doc => doc.id === Number(docId));
      if (document !== undefined) {
        this.props.docFetched(document);
      }
    }
  }

  deleteDocument() {
    this.props.deleteDocument(this.props.document.id);
  }

  componentWillMount() {
    if (!this.props.document.title) {
      this.props.fetchDocument(this.props.params.id);
    }
  }

  render() {
    const { document } = this.props;
    if (!document.title) {
      return (
        <div>Loading content...</div>
      );
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
                <Link to="/users">OwnerId: {document.OwnerId} </Link>
                <Link to={`/documents/${document.id}`}>Edit </Link>
                <Button className="red"onClick={this.deleteDocument} >Delete</Button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

Document.propTypes = {
  document: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  document: state.document.document,
  documents: state.document.documents,
});

export default connect(mapStateToProps,
{ deleteDocument, fetchDocument, docFetched })(Document);
