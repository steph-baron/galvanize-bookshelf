'use strict';

const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
// rows = data
module.exports = router;

router.get('/books', (_req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((rows) => {
      console.log(rows);

      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get('/books/:id', function(req, res) {
  const id = parseInt(req.params.id);

  if(Number.isNaN(id)) {
    res.send(req.params.id +" is not a number, dum dum");
  }
  knex('books')
    .where('id', id)
    .first()
    .then(function(row){
      if(!row) {
        res.status(404).send('BAD!!!');
      }
      res.send(row);
    })
    .catch(function(err){
      next(err);
    })
})

router.post('/books', function(req, res) {
  knex('books')
    .insert(req.body)
    .then(function(rows){
      const book = rows[0];
      res.send(book);
    })
    // .catch((err) => {
    //   next(err);
    // });

})
