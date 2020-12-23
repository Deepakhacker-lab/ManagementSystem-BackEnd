# Getting Started with Node App

The node App runs on http://localhost:2000 and require a mongoDB server running on local (path: "mongodb://127.0.0.1:27017/feed") having feed database, incase of any change please modify mongoose connect in app.js file.

# Start Node App.

There are two way you can run the node app, 

1. node app.js
2. nodemon app.js --development


# Database Configuration

There are some case where database doesn't created on fly, in such case please create a feed database on mongodb server, whereas collections are created on the fly.

