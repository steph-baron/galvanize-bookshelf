'use strict';

const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE
// rows = data
module.exports = router;

router.get('/books', (req, res, next) => {
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

router.get('/books/:id', function(req, res, next) {
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

router.post('/books', function(req, res, next) {
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

router.patch('/books/:id', function(req, res, next) {
  const id = parseInt(req.params.id);

  if(Number.isNaN(id)) {
    res.next(req.params.id +" is not a number, dum dum");
  }
  knex('books')
    .where('id', id)
    .first()
    .then(function(book){
      const {title, author, genre, description, cover_url} = req.body;

      const updateBook = {};

      if (title) {
        updateBook.title = title;
      }

      if (author) {
        updateBook.author = author;
      }

      if (genre) {
        updateBook.genre = genre;
      }

      if (description) {
        updateBook.description = description;
      }

      if (cover_url) {
        updateBook.cover_url = cover_url;
      }

      return knex('books')
        .update(updateBook)
        .where('id', id);
    })

    .then(function(rows){
      const book = rows[0];
      res.send(book);
    })

    .catch(function (err) {
      next(err);
    })

});

router.delete('/books/:id', function(req, res, next) {
  const id = parseInt(req.params.id);

  if(Number.isNaN(id)) {
    res.next(req.params.id +" is not a number, dum dum");
  }

  let book;

  knex('books')
    .where('id', id)
    .first()
    .then(function(row){
      book = row
      return knex('books')
        .del()
        .where('id', id);
    })
    .then(function(){
      res.send(book);
    })
});
