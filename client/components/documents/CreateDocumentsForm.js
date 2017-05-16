import React from 'react';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';
import { browserHistory } from 'react-router';
import TextFieldGroup from '../common/TextFieldGroup';
import { createDocument, fetchDocument,
  updateDocument } from '../../actions/documentsActions';

// import { SimpleMarkdownEditor } from 'react-simple-markdown-editor';

class CreateDocumentsForm extends React.Component {
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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const myColor = { background: '#ff0000', text: '#FFFFFF' };
    e.preventDefault();
    if (this.props.id) {
      this.props.updateDocument(this.state).then(() => {
        notify.show('Document updated successfully', 'success', 3000);
        browserHistory.push('/my-documents');
      }).catch((error) => {
        notify.show(error.response.data.message, 'custom', 3000, myColor);
      });
    } else {
      this.props.createDocument(this.state).then(() => {
        notify.show('Document created successfully', 'success', 3000);
        browserHistory.push('/my-documents');
      }).catch((error) => {
        notify.show(error.response.data.message, 'custom', 3000, myColor);
      });
    }
    this.setState({ title: ' ', content: ' ', type: ' ' });
  }

  render() {
    const { title, content, type } = this.props.document;
    return (
      <div className="row signupForm">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3>Create/Edit Document Form</h3>
          <div className="row">
            <TextFieldGroup
              label="Title"
              onChange={this.onChange}
              value={title}
              icon="folder"
              field="title"
            />

            <div className="input-field col s12">
              <i className="material-icons prefix left">mode_edit</i>
              {/* <SimpleMarkdownEditor textAreaID={'textarea1'} />*/}
              <textarea
                label="Content"
                onChange={this.onChange}
                value={content}
                name="content"
                className="materialize-textarea"
                id="content" required
              />
            </div>

            <TextFieldGroup
              label="Type"
              onChange={this.onChange}
              value={type}
              icon="folder"
              field="type"
            />

            <div className="col s12">
              <i className="material-icons prefix left">mode_edit</i>
              <Input type="select"
                s={8}
                name="access"
                label="Select Acccess"
                onChange={this.onChange}
                >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="role">Role</option>
              </Input>
            </div>
            <button className="btn waves-effect waves-light submitBtn"
            type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
        <div />
      </div>
    );
  }
}

CreateDocumentsForm.propTypes = {
  createDocument: PropTypes.func.isRequired,
  document: PropTypes.object,
  updateDocument: PropTypes.func.isRequired,
};

// SimpleMarkdownEditor.propTypes = {
//   // Required props
//   textAreaID: PropTypes.string.isRequired,

//   // Optional props
//   styles: PropTypes.object,
//   containerClass: PropTypes.string,
//   buttonClass: PropTypes.string,
//   enabledButtons: PropTypes.object,
//   buttonHtmlText: PropTypes.object,
//   additionalProps: PropTypes.object,
// };

export default
connect(null,
{ createDocument, fetchDocument, updateDocument })(CreateDocumentsForm);
