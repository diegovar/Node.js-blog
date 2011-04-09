
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var express =   require('express'),
    mustache =  require('mustache'),
    stache =    require('./stache');

mongoose.connect('mongodb://localhost/blog');

var repository = require('./repository');



var app = module.exports = express.createServer();-

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set("view options", {
    layout: true,
    extension: '.html'
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.register("html", stache);
  repository.setup();
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  port = 3000;
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
  port = 80;
});

// Routes

app.get('/', function(req, res){
  var BlogPost = mongoose.model('BlogPost');
  BlogPost.find({}, function(err, docs) {
    
  });
  res.render("index.html", {
      locals: {
        area: 'home'
      },
      partials: {}
  });
});

app.get('/posts/fancy/:topic/:name', function(req, res) {
    var BlogPost = mongoose.model('BlogPost');
    res.render("fancyposts/" + req.params.name + ".html", {
      locals: {
        area: 'fancyposts',
        topic: req.params.topic,
        page: req.params.name
      }
    });
});

app.get('/posts/:topic/:name', function(req, res) {
    res.render("posts/" + req.params.topic + "/" + req.params.name + ".html", {
      locals: {
        area: 'posts',
        topic: req.params.topic,
        page: req.params.name
      }
    });
});

app.get('about', function(req,res){
    res.render("about.html", {});
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(port);
  console.log("Express server happily listening on port %d", app.address().port);
}
