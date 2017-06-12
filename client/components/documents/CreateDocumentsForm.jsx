import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import { Input } from 'react-materialize';
import { notify } from 'react-notify-toast';
import { browserHistory } from 'react-router';
import TextFieldGroup from '../common/TextFieldGroup';
import { createDocument, fetchDocument,
  updateDocument } from '../../actions/documentsActions';

/**
 *
 * @class CreateDocumentsForm
 * @extends {React.Component}
 */
export class CreateDocumentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.document ? this.props.document.id : null,
      title: this.props.document ? this.props.document.title : '',
      content: this.props.document ? this.props.document.content : '',
      access: this.props.document ? this.props.document.access : 'public',
      type: this.props.document ? this.props.document.type : '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   * Renders props of a document if it exists
   * @param {Object} nextProps
   *
   * @memberOf CreateDocumentsForm
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.document) {
      const { document: { title, content, type, id, access } } = nextProps;
      this.setState({
        title,
        content,
        type,
        id,
        access,
      });
    }
  }

  /**
   * Control input fields
   * @param {Object} event
   *
   * @memberOf CreateDocumentsForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Create or update document
   * @param {Object} event
   *
   * @memberOf CreateDocumentsForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.props.id) {
      this.props.updateDocument(this.state)
      .then(() => {
        notify.show('Document updated successfully', 'success', 3000);
        browserHistory.push('/my-documents');
      });
    } else {
      this.props.createDocument(this.state)
      .then(() => {
        notify.show('Document created successfully', 'success', 3000);
        browserHistory.push('/my-documents');
      });
    }
    this.setState({ title: ' ', content: ' ', type: ' ' });
  }

  /**
   * Control input fields
   * @param {Object} event
   *
   * @memberOf CreateDocumentsForm
   */
  handleEditorChange(event) {
    this.setState({ content: event.target.getContent() });
  }

  /**
   * Renders the component
   *
   * @returns {Object} jsx component
   *
   * @memberOf CreateDocumentsForm
   */
  render() {
    if (!this.props.document) return null;
    return (
      <div className="row docs-form">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3>Create/Edit Document Form</h3>
          <div className="row">
            <TextFieldGroup
              label="Title"
              onChange={this.onChange}
              value={this.state.title}
              icon="folder"
              field="title"
            />

            <div className="input-field col s12">
              {(this.props.id && this.state.content) ?
                <TinyMCE
                  content={this.state.content}
                  config={{
                    plugins: 'link image code',
                    toolbar: `undo redo | bold italic |
                  alignleft aligncenter alignright | code`,
                  }}
                  onChange={this.handleEditorChange}
                  field="content"
                /> : ''
              }
              {(!this.props.id) ?
                <TinyMCE
                  content={''}
                  config={{
                    plugins: 'link image code',
                    toolbar: `undo redo |
                    bold italic | alignleft aligncenter alignright | code`,
                  }}
                  onChange={this.handleEditorChange}
                  field="content"
                /> : ''
              }
            </div>
            <TextFieldGroup
              label="Type"
              onChange={this.onChange}
              value={this.state.type}
              icon="folder"
              field="type"
            />

            <div className="col s12">
              <i className="material-icons prefix left">mode_edit</i>
              <Input
                type="select"
                s={8}
                name="access"
                label="Select Acccess"
                onChange={this.onChange}
                value={this.state.access}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="role">Role</option>
              </Input>
            </div>
            <button
              className="btn waves-effect waves-light submitBtn"
              type="submit" name="action"
            >Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

CreateDocumentsForm.propTypes = {
  createDocument: PropTypes.func.isRequired,
  document: PropTypes.object,
  updateDocument: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default
connect(null,
{ createDocument, fetchDocument, updateDocument })(CreateDocumentsForm);
