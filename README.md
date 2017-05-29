## Document Management System (FullStack)

[![Coverage Status](https://coveralls.io/repos/github/andela-moseni/document-mgt-system/badge.png?branch=master)](https://coveralls.io/github/andela-moseni/document-mgt-system?branch=master) [![Code Climate](https://codeclimate.com/github/andela-moseni/document-mgt-system/badges/gpa.svg)](https://codeclimate.com/github/andela-moseni/document-mgt-system) [![Build Status](https://travis-ci.org/andela-moseni/document-mgt-system.svg?branch=master)](https://travis-ci.org/andela-moseni/document-mgt-system)

Document Management System provides a restful API for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT.

## API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

#### API Features

The following features make up the Document Management System API:

###### Authentication

- It uses JSON Web Token (JWT) for authentication
- It generates a token on successful login or account creation and returns it to the user
- It verifies the token to ensure a user is authenticated to access every endpoints

###### Users

- It allows users to be created  
- It allows users to login and obtain a unique token which expires every 12hours
- It allows authenticated users to retrieve and update their information 
- It allows users to retrieve their documents based on userId
- It allows the admin to manage users

###### Roles

- It ensures roles can be created, retrieved, updated and deleted by an admin user
- A non-admin cannot access this endpoint
- A non-admin user cannot create, retrieve, modify, or delete roles  
- It allows assignment of roles to users

###### Documents

- It allows new documents to be created by authenticated users 
- It ensures all documents are accessible based on the permission/priviledges 
- It allows admin users to create, retrieve, modify, and delete documents
- It ensures users can retrieve, edit and delete documents that they own  
- It allows users to retrieve all documents they own as well as public documents
- It allows users to retrieve all public documents
- It allows users on the same role to retrieve role-based documents

###### Search

- It allows admin to retrieve all documents that matches search term
- It allows admin to search users based on a specified search term
- It allows users to search public documents for a specified search term
- It allows users to search for users through name or email address
- It allows users on the same role to search through role-based documents 

## Hosted App on Heroku
[Meek-DMS](https://meek-dms-staging.herokuapp.com/)

## Below are the API endpoints and their functions
EndPoint                                |   Functionality
----------------------------------------|------------------------
POST /users/login                		    |Logs a user in
POST /users/logout               		    |Logs a user out
POST /users                       		|Creates a new user
GET /users                        		 |Find matching instances of user
GET /users?limit=num                 		|Limits the users return, defaults to ten
GET /users?limit=num&offset=num     		|Sets the next users to get 
GET /users/:id                         	|Gets a single user
GET /search/users?search=myname        |Search the users based on search query param
GET /users/:id/documents                |Retrieve all documents belonging to a user
PUT /users/:id                         	|Update user
DELETE /users/:id                      |Delete user
POST /documents                    	    |Creates a new document instance
GET /documents               			      |Find matching instances of document
GET /search/documents?search=doc       |Search the documents based on the query param 
GET /documents?limit=num                 	|Limits the documents return, defaults to ten
GET /documents?limit=num&offset=num     	|Sets the next documents to get 
GET /documents/:id            			  |Find document
PUT /documents/:id            			  |Update document attributes
DELETE /documents/:id        			  |Delete document
POST /roles                  			  |Creates a new role
GET /roles/                   			  |Find matching instances of role 
GET /roles?limit=num            			|limits the roles return, maximum of ten
GET /roles?limit=num&offset=num     		|Sets the next role to get 
GET /roles/:id               			  |Gets a single role
GET /search/roles?search=regular       |Search the roles based on the query param 
PUT /roles/:id              			  |Update role
DELETE /roles/:id            			  |Delete role

The following are some sample request and response from the API:

## Roles
Endpoint for Roles API.

### Get Roles

#### Request
- Endpoint: GET: `/api/roles`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "admin",
    "createdAt": "2017-05-01 16:07:46.719+01",
    "updatedAt": "2017-05-01 16:07:46.719+01"
  }, {
    "id": 2,
    "title": "regular",
    "createdAt": "2017-05-01 16:07:46.719+01",
    "updatedAt": "2017-05-01 16:07:46.719+01"
  }
]
```

## Users
Endpoint for Users API.

### Create User

#### Request
- Endpoint: POST: `api/users`
- Body `(application/json)`
```json
{
  "name": "John Doe",
  "email": "johndoe@test.com",
  "password": "password"
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "user": {
    "id": 22,
    "name": "John Doe",
    "email": "johndoe@test.com",
    "RoleId": 2,
    "createdAt": "2017-05-01 16:07:46.719+01",
    "updatedAt": "2017-05-01 16:07:46.719+01"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJyb2xlSWQiOjIsImlhdCI6MTQ5MzMyNTI3OCwiZXhwIjoxNDkzMzY4NDc4fQ.-C3UQhJKK1t7FVFCMjsBNIH5uuGPoCjtS85mha-Go6Y"
}
```

### Get Users

#### Request
- Endpoint: GET: `api/users`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
  "id": 10,
  "name": "Mercy oseni",
  "email": "mercy@test.com",
  "RoleId": 1,
  "password": "$2a$08$P6AgSC3bC9IwmKeJSfUAye5/hVIvdoLRq3wMpPRgsAsUgz19ltQ6q",
  "createdAt": "2017-05-01 16:07:46.719+01",
  "updatedAt": "2017-05-01 16:07:46.719+01"
},
{
  "id": 14,
  "name": "Faith Omokaro",
  "email": "faith@test.com",
  "RoleId": 2,
  "password": "$2a$05$dHcq6G2aQucBb9SvuJJ.quuxBMRdt4fNI0aUvgsWz0hxyrRql8PuS",
  "createdAt": "2017-05-01 16:07:46.719+01",
  "updatedAt": "2017-05-01 16:07:46.719+01"
}]
```

## Documents
Endpoint for document API.

### Create Document

#### Request
- Endpoint: POST: `/api/documents`
- Requires: Authentication
- Body `(application/json)`
```json
{
  "title": "YOYOL",
  "content": "In Andela, it's more of self-learning. We believe You Own Your Own Learning!",
  "OwnerId": 1,
  "access": "public"
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "id": 4,
  "title": "YOYOL",
  "content": "In Andela, it's more of self-learning. We believe You Own Your Own Learning!",
  "OwnerId": 1,
  "access": "public",
  "createdAt": "2017-05-01T14:59:11.785Z",
  "updatedAt": "2017-05-01T14:59:11.785Z"
}
```

### Get All Documents

#### Request
- Endpoint: GET: `/api/documents`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[{
    "title": "Computer Science",
    "content": "Computer science is the study of the theory, experimentation,and engineering that form the basis for the design and use of computers. It is the scientific and practical approach to computation and its applicationsand the systematic study of the feasibility, structure, expression, and mechanization of the methodical procedures (or algorithms) that underlie the acquisition, representation, processing, storage, communication of, and access to information.",
    "access": "role",
    "type": "Education",
    "OwnerId": 2,
    "createdAt": "2017-05-01T14:59:27.120Z",
    "updatedAt": "2017-05-01T14:59:27.120Z"
  },
  {
    "title": "Triple-buffered composite budgetary management",
    "content": "Nihil quidem quia. Minus ea architecto odit eum alias quia similique recusandae. Cum reiciendis similique quia aut quod officia molestias. Doloribus ea id voluptatibus id iure ut illum voluptas necessitatibus. Ullam nemo facere neque omnis repellat magnam ut totam.",
    "access": "public",
    "type": "Note",
    "OwnerId": 5,
    "createdAt": "2017-05-01T14:59:11.785Z",
    "updatedAt": "2017-05-01T14:59:11.785Z"
  },
  {
    "id": 4,
    "title": "YOYOL",
    "content": "In Andela, it's more of self-learning. We believe You Own Your Own Learning!",
    "OwnerId": 1,
    "access": "public",
    "type": "note",
    "createdAt": "2017-05-01T14:59:11.785Z",
    "updatedAt": "2017-05-01T14:59:11.785Z"
  }]
```

### Get Document

#### Request
- Endpoint: GET: `/api/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 4,
  "title": "YOYOL",
  "content": "In Andela, it's more of self-learning. We believe You Own Your Own Learning!",
  "OwnerId": 1,
  "access": "public",
  "type": "note",
  "createdAt": "2017-05-01T14:59:11.785Z",
  "updatedAt": "2017-05-01T14:59:11.785Z"
}
```

### Edit Document

#### Request
- Endpoint: PUT: `/api/documents/:id`
- Requires: Authentication
- Body `(application/json)`:
```json
{
  "title": "YOYOL!!!",
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
  {
    "id": 4,
    "title": "YOYOL!!!",
    "content": "In Andela, it's more of self-learning. We believe You Own Your Own Learning!",
    "OwnerId": 1,
    "access": "public",
    "type": "note",
    "createdAt": "2017-05-01T14:59:11.785Z",
    "updatedAt": "2017-05-01T15:35:00.785Z"
  }
```

### Delete Document

#### Request
- Endpoint: DELETE: `/api/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Document deleted successfully"
}
```


### Search
#### Documents

#### Request
- Endpoint: GET: `/search/documents/?search=searchterm`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json

  [{
      "title": "Computer Science",
      "content": "Computer science is the study of the theory, experimentation,and engineering that form the basis for the design and use of computers. It is the scientific and practical approach to computation and its applicationsand the systematic study of the feasibility, structure, expression, and mechanization of the methodical procedures (or algorithms) that underlie the acquisition, representation, processing, storage, communication of, and access to information.",
      "access": "role",
      "type": "Education",
      "OwnerId": 2,
      "createdAt": "2017-05-01T01:29:21.469Z",
      "updatedAt": "2017-05-01T01:29:21.469Z"
  }]
```

### Users

#### Request
- Endpoint: GET: `/search/users/?search=searchterm`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
  [{
      "name": "Mercy Oseni",
      "email": "mercy.oseni@andela.com",
      "createdAt": "2017-05-01T01:29:21.457Z",
      "updatedAt": "2017-05-01T01:29:21.457Z"
    },
    {
      "name": "Faith Omokaro",
      "email": "faith.omokaro@andela.com",
      "createdAt": "2017-05-01T01:29:21.457Z",
      "updatedAt": "2017-05-01T01:29:21.457Z"
    },
    {
      "name": "Sophiat Ayomide",
      "email": "sophiat@test.com",
      "createdAt": "2017-05-01T01:29:21.457Z",
      "updatedAt": "2017-05-01T01:29:21.457Z"
  }]
```

## Technologies Used
- JavaScript (ES6)
- Node.js
- Express
- Postgresql
- Sequelize ORM  

### **Installation Steps**
* Clone the project repository from your terminal `git clone https://github.com/andela-moseni/document-mgt-system.git`
* Change directory into the `document-mgt-system` directory
* Run `npm install` to install the dependencies in the `package.json` file
* Run `npm run start:nodemon` to start the project
* Run `npm test` to run the server-side(api) tests
* Run `npm run test-e2e` to run the e2e tests
* Run `npm run client:test` to run the client-side(React) tests
* Use *Postman* or any API testing tool of your choice to access the endpoints

### **Endpoints**
**N/B:** For all endpoints that require authentication, use \
`'x-access-token': <token>` or `authorization: <token>`

#### Limitations:
The limitations to the **Document Management System API** are as follows:
* Users can only create plain textual documents and retrieve same when needed 
* Users cannot share documents with people, but can make document `public` to make it available to other users
* Users login and obtain a token which is verified on every request, but users cannot logout (nullify the token), however tokens become invalid when it expires (after 12 hours)

### How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request describing the feature(s) you have added
6. Include a `feature.md` readme file with a detailed description of the feature(s) you have added, along with clear instructions of how to use the features(s) you have added. This readme file will be reviewed and included in the original readme if feature is approved.

Ensure your codes follow the [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)
