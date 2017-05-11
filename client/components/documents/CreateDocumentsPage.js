import React from 'react';
import CreateDocumentsForm from './CreateDocumentsForm';

class CreateDocumentsPage extends React.Component {
  render() {
    return (
      <div className="row signupPage">
        <div className="col-md-4 col-md-offset-4">
          <CreateDocumentsForm />
        </div>
      </div>
    );
  }
}

export default CreateDocumentsPage;