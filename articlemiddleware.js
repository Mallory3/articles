


app.get('/:slug', function(req, res, next) {
  artCol.findOne({'slug': req.params.slug}, function(err, docs) {
    if (err){
      console.log('Error', err);
    }
    console.log("found middleware")
    res.render(':slug', { slugs: docs })
    })
  })



