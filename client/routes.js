import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignUpPage from './components/signup/SignUpPage';
import LoginPage from './components/login/LoginPage';
import CreateDocumentsPage from './components/documents/CreateDocumentsPage';
import requireAuth from './utils/requireAuth';
import DocumentsPage from './components/documents/DocumentsPage'
import Document from './components/documents/Document';
import MyDocumentsPage from './components/documents/MyDocumentsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignUpPage} />
    <Route path="login" component={LoginPage} />
    <Route path="create-document" component={requireAuth(CreateDocumentsPage)} />
    <Route path="documents" component={requireAuth(DocumentsPage)} />
    <Route path="view/:id" component={requireAuth(Document)} />
    <Route path="my-documents" component={requireAuth(MyDocumentsPage)} />
  </Route>
)