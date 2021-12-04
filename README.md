# Simple CRUD API  

Simple CRUD API that using in-memory database underneath.  

## Installation  

- clone repository by running:  
`git clone https://github.com/eugenemp/simple-crud-api.git`  

- cd into simple-crud-api directory;  
- run `npm i`  
## Usage  

- to start server in development mode, run: `npm run start:dev`  
- to start server in production mode, run: `npm run start:prod`

Server will run on port 4000

### Details:

API path /person:  
    GET /person or /person/${personId} returns all persons or person with corresponding personId  
    POST /person creates record about new person and store it in database  
    PUT /person/${personId} updates record about existing person  
    DELETE /person/${personId} deletes record about existing person from database   
