// Create web server
Synthesizing 3/10 solutions

=======
Suggestion 1

// 1. npm init -y
// 2. npm install express
// 3. npm install body-parser

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// get
app.get('/', (req, res) => {
    res.send('Hello World');
});

// get
app.get('/comments', (req, res) => {
    res.send('get comments');
});

// post
app.post('/comments', (req, res) => {
    res.send('post comments');
});

// put
app.put('/comments/:id', (req, res) => {
    res.send('put comments');
});

// delete
app.delete('/comments/:id', (req, res) => {
    res.send('delete comments');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

=======
Suggestion 2

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3001;
const db = require('../database/index.js');

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get comments from database
app.get('/api/comments', (req, res) => {
  db.getComments((err, data) => {
    if (err) {
      console.log('Error retrieving comments from database: ', err);
      res.sendStatus(500);
    } else {
      console.log('Successfully retrieved comments from database');
      res.send(data);
    }
  });
});

// Post comment to database
app.post('/api/comments', (req, res) => {
  db.postComment(req.body, (err, data) => {
    if (err) {
      console.log('Error posting comment to database: ', err);
      res.sendStatus(500);
    } else {
      console.log('Successfully posted comment to database');
      res.sendStatus(201);
    }
  });
});

// Update comment in database
app.put('/api/comments', (req, res) => {
  db.updateComment(req.body, (err, data) => {
    if (err) {
      console.log('Error updating comment in database: ', err);
      res.sendStatus(500);
    } else {
      console.log('Successfully updated comment in database');
      res.sendStatus(201);
    }
  });
});

// Delete comment from database
app.delete('/api/comments', (req, res) => {
  db.deleteComment(req.body, (err, data) => {
    if (err) {
      console.log('Error deleting comment from database: ', err);
      res.sendStatus(500);
    } else {
      console.log('Successfully deleted comment from database');
      res.sendStatus(201);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});

=======
Suggestion 3


// Import express
const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments.controller');

// Get all comments
router.get('/', commentsController.getAll);

// Create a new comment
router.post('/', commentsController.create);

// Get a comment by id
router.get('/:id', commentsController.getById);

// Update a comment by id
router.put('/:id', commentsController.update);

// Delete a comment by id
router.delete('/:id', commentsController.delete);

module.exports = router;
