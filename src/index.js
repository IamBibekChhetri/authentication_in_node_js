// app.js or index.js
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
const routes = require('./routes/routes');

const mongoose = require('mongoose');

app.use(bodyParser.json());
// app.use('/api', routes);

//routes ma vako main file ko routes tanne
app.use("/", routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// setting for html tempelate
const server = http.createServer((req, res) => {
  // Set the content type to HTML
  res.setHeader('Content-Type', 'text/html');

  // Check the requested URL and serve the corresponding HTML file
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './view/index.html'; // Serve index.html as the default page
  }

  // Read the HTML file from the file system
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        res.statusCode = 404;
        res.end('404 - Page Not Found');
      } else {
        // Server error
        res.statusCode = 500;
        res.end('500 - Internal Server Error');
      }
    } else {
      // File successfully read, send the content to the client
      res.statusCode = 200;
      res.end(content);
    }
  });
});

const port = 3000; // Specify the port you want to listen on
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Define and use your schemas and models here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  