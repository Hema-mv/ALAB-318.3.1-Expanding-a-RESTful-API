const express = require('express');
const router = express.Router();
//const comments = []; // Temporary storage for comments
const comments = require("../data/comments");
// GET /comments
router.get('/', (req, res) => {
   console.log("first")
   console.log(comments)
  //res.json(comments);
  res.render("comments",{ comments });
});

// POST /comments
router.post('/', (req, res) => {
  const { id, userId, postId, body } = req.body;
  const newComment = { id, userId, postId, body };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// GET /comments/:id
router.get('/:id', (req, res) => {
   
  const ncomment = comments.find(c => c.id === parseInt(req.params.id, 10));
  console.log(ncomment)
  if (ncomment) {
    res.json(ncomment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// PATCH /comments/:id
router.patch('/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id, 10));
  if (comment) {
    comment.body = req.body.body || comment.body;
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// DELETE /comments/:id
router.delete('/:id', (req, res) => {
  const index = comments.findIndex(c => c.id === parseInt(req.params.id, 10));
  console.log(index)
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Comment not found');
  }
});

module.exports = router;
