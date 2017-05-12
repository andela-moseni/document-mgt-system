import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { createDocument } from '../../actions/documentsActions';
import {notify} from 'react-notify-toast';
import PropTypes from 'prop-types';
import { Input, Row } from 'react-materialize';
import { browserHistory } from 'react-router';
import {SimpleMarkdownEditor} from 'react-simple-markdown-editor';

class CreateDocumentsForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
      access: 'public',
      type: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    let myColor = { background: '#ff0000', text: "#FFFFFF"};
    e.preventDefault();
    this.props.createDocument(this.state).then(() => {
      browserHistory.push('/create-document');
      notify.show("Documents created successfully", "success", 3000);
    }).catch((error) =>  {
      notify.show(error.response.data.message, "custom", 3000, myColor);
    });
    this.setState({ title: ' ', content: ' ', type: ' '});
  }
  
  render() {
    const { title, content, access, type } = this.state;
    return(
      <div className="row signupForm">
        <form className="col s12" onSubmit={this.onSubmit}>
          <h3>Create Document</h3>
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
              <SimpleMarkdownEditor textAreaID={"textarea1"} />
              <textarea 
                label="Content"
                onChange={this.onChange}
                value={content}
                name="content"
                className="materialize-textarea"
                id="textarea1"
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
                className="browser-default"
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
            
            <button className="btn waves-effect waves-light submitBtn" type="submit" name="action">Create
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

CreateDocumentsForm.propTypes = {
  createDocument: React.PropTypes.func.isRequired
}

SimpleMarkdownEditor.propTypes = {
  // Required props 
  textAreaID: PropTypes.string.isRequired,

  // Optional props 
  styles: PropTypes.object,
  containerClass: PropTypes.string,
  buttonClass: PropTypes.string,
  enabledButtons: PropTypes.object,
  buttonHtmlText: PropTypes.object,
  additionalProps: PropTypes.object
};

export default connect(null, { createDocument })(CreateDocumentsForm);
