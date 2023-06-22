
# Blogit
A web application where users can post about anything that interests them. Users can log in and create new posts, they can also edit and change the content of theirs posts. Visitors that are not logged in can search for blogs see the top picks check the posts of certain authors or create a new account  and make their own posts

## Get Started
### Client
- ```npm i``` to install the required node modules
- ```npm test``` to run the client tests
- ```npm start``` to run the front app
### .env 
```if server running on localhost:3001```
- REACT_APP_SERVER=http://localhost:3001
- REACT_APP_IMAGE_URL=http://localhost:3001/images

### Server
- ```npm i``` to install the required node modules
- ```npm test``` to run the server tests
- ```node dist/index.js``` to run the server
### .env
```if you want the server to run on port 3001```
- PORT=3001
- MONGO_URL=mongodb://127.0.0.1:27017/mongodb
- SECRET=secret

## Features

- User authentication
- Create/Edit/Delete posts
- See diferent users posts
- Tests in front and back end


## Stack

**Front-end:** React, TailwindCSS, Typescript

**Back-end:** Node, Express, Typescript, Multer, JWT, bcrypt

**Database:** MongoDB

## Authors

- [@Antonio](https://github.com/AntonioSilvaVaz)
- [@Rene](https://github.com/ReneCodes)
- [@Marko](https://github.com/markogra)

