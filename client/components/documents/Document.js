import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class Document extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    const { document } = this.props;
    return (
      <div>
        <h2> {document.title} </h2>
        <div className="row centered">
            <div className="card">
              <div className="card-content">
                <p>{document.content} </p>

                <br />
                <p> {document.OwnerId} </p>
              </div>
              <div className="card-action">
                <Link to={'/documents/manage/' + document.id}>Edit</Link>
                <a href="#">Delete</a>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

Document.propTypes = {
  document: PropTypes.object.isRequired
};


const mapStateToProps = (state, ownProps) => {
  const documentId = ownProps.params.id;
  const document = state.documents.find(doc => doc.id == documentId) || {};
  return {
    document
  };
};

export default connect(mapStateToProps)(Document);
