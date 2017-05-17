import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import CreateDocumentsPage from './components/documents/CreateDocumentsPage';
import requireAuth from './utils/requireAuth';
import DocumentsPage from './components/documents/DocumentsPage';
import Document from './components/documents/Document';
import MyDocumentsPage from './components/documents/MyDocumentsPage';
import NotFound from './components/NotFound';

export default (
  <Router history={browserHistory} >
    <Route path="/" component={App} >    
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="create-document" component=
    {requireAuth(CreateDocumentsPage)} />
    <Route path="documents" component={requireAuth(DocumentsPage)} />
    <Route path="documents/view/:id" component={requireAuth(Document)} />
    <Route path="my-documents" component={requireAuth(MyDocumentsPage)} />
    <Route path="/documents/:id"
    component={requireAuth(CreateDocumentsPage)} />
    <Route path="*" component={requireAuth(NotFound)} />
  </Route>
  </Router>
);
