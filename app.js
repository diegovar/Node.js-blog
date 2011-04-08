
/**
 * Module dependencies.
 */

//var mongoose = require('mongoose');
var express =   require('express'),
    mustache =  require('mustache'),
    stache =    require('stache');

//mongoose.connect('mongodb://localhost/blog');

//var repository = require('./repository');



var app = module.exports = express.createServer();-

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set("view options", {layout: true});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.register("html", stache);
  
  //repository.setup();
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    //var BlogPost = mongoose.model('BlogPost');
    //BlogPost.find({}, function(err, docs) {});
    res.render("index.html", {
        locals: {},
        partials: {}
    });
});

app.get('/posts/:topic/:name', function(req, res) {
    res.render("posts/" + req.params.topic + "/" + req.params.name + ".html", {
    });
});

app.get('about', function(req,res){
    res.render("about.html", {});
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
