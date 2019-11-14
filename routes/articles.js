const express = require('express');
const mongoose = require('mongoose')

const router = express.Router();

const Articles = require('../models/Articles')

// Index Page
//need to enclose everything in router.get
//knowledge from https://blog.zingchart.com/
router.get('/posts', (req, res) => {

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const articles = require('../fixtures/articles');
const users = require('../fixtures/users');

const uri = process.env.DB_CONNECTION;
MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
   if(err) {
      console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   // perform actions on the collection object

  
   const db = client.db("final-project");

   const artCol = db.collection('articles');

   artCol.drop();
   artCol.insertMany(articles, (err, cursor) => {
    if (err) {
      console.log('There was a problem');
    }
    console.log(cursor.insertedCount);
    // console.log(articles)
  });
// http://zetcode.com/javascript/mongodb/
// find() creates a cursor for a query that can be used to iterate over results from mongoDB
//renders title to webpage
  artCol.find({}).toArray().then((docs) => {
    console.log("found articles for index")
    res.render('posts', { display: docs });
    console.log(docs)
  })

  const userCol = db.collection('users');

  userCol.drop();
  
  userCol.insertMany(users, function(err, cursor) {
   if (err) {
     console.log('There was a problem');
   }
   console.log(cursor.insertedCount);
 });

  client.close();
});
});

// router.get('/posts/:slug', (req, res, next) => {

//   const MongoClient = require('mongodb').MongoClient;
//   require('dotenv').config();
  
//   const articles = require('../fixtures/articles');
//   const users = require('../fixtures/users');
  
//   const uri = process.env.DB_CONNECTION;
//   MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
//      if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//      }
//      console.log('Connected...');
//      // perform actions on the collection object
  
    
//      const db = client.db("final-project");
  
//      const artCol = db.collection('articles');
  
//     //  artCol.drop();
//     //  artCol.insertMany(articles, (err, cursor) => {
//     //   if (err) {
//     //     console.log('There was a problem');
//     //   }
//     //   console.log(cursor.insertedCount);
//     //   // console.log(articles)
//     // });
//   // http://zetcode.com/javascript/mongodb/
//   // find() creates a cursor for a query that can be used to iterate over results from mongoDB
//   //renders title to webpage
//   artCol.findOne({'slug': req.params.slug}, function(err, docs) {
//     if (err){
//       console.log('Error', err);
//     }
//     console.log("found middleware")
//     res.render('posts', { display: docs })
//       console.log(docs)
//       next()
//     })
  
//     client.close();
//   });
//   });




router.get('/posts/:slug', (req, res) => {

  const MongoClient = require('mongodb').MongoClient;
  require('dotenv').config();
  
  const articles = require('../fixtures/articles');
  const users = require('../fixtures/users');
  
  const uri = process.env.DB_CONNECTION;
  MongoClient.connect(uri,{ useUnifiedTopology: true,useNewUrlParser: true }, function(err, client) {
     if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
     }
     console.log('Connected...');
     // perform actions on the collection object
  
    
     const db = client.db("final-project");
  
     const artCol = db.collection('articles');
  
    //  artCol.drop();
    //  artCol.insertMany(articles, (err, cursor) => {
    //   if (err) {
    //     console.log('There was a problem');
    //   }
    //   console.log(cursor.insertedCount);
    //   // console.log(articles)
    // });
  // http://zetcode.com/javascript/mongodb/
  // find() creates a cursor for a query that can be used to iterate over results from mongoDB
  //renders title to webpage
    artCol.find({}).toArray().then((docs) => {
      console.log("found articles for slug")
      res.render('posts', { display: docs, hello: docs });
      // console.log(docs)
    })
    
    client.close();
  });
  });


// router.get('/posts/:slug')
// router.get(':slug', (req,res, next) => {
//   if (req.params.slug === 'posts') {
//     return next()
//   }
//   res.render('posts', display)
// })
// router.get('/:slug', function(request, response){
//   response.render(request.params.slug);
// })

// router.get('/posts/:slug', (req, res) => res.render('posts'))


module.exports = router;