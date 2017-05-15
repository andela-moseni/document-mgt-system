import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-materialize';
import { deleteDocument } from '../../actions/documentsActions';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  deleteDocument() {
    this.props.deleteDocument(this.props.document.id);
  }

  componentWillMount() {

  }

  render() {
    const { document } = this.props;
    if (!document) {
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
                <Button onClick={this.deleteDocument}>Delete</Button>
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

const mapStateToProps = (state, ownProps) => {
  const documentId = ownProps.params.id;
  let document = {};
  if (state.document) {
    document = state.document.documents
    .find(doc => doc.id === Number(documentId)) || {};
  }

  return {
    document,
  };
};

export default connect(mapStateToProps, { deleteDocument })(Document);
