var express= require('express');
var app= express();
var S = require('string');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('userprofile', ['user']);
app.use(bodyParser.json());
app.use(express.static(__dirname+ "/public"));

app.get('/userlist',function (req,res) {
   db.user.find(function (err, docs) {
    res.json(docs);
  });

})

app.post('/userlist', function (req, res) {
  db.user.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/userlist/:id', function (req, res) {
  var id = req.params.id;

  db.user.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
app.get('/userlist/:id', function (req, res) {
  var id = req.params.id;

  db.user.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/userlist/:id', function (req, res) {
  var id = req.params.id;

  db.user.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8000);
