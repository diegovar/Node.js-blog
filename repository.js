var mongoose = require('mongoose');

function loadTestData() {
    var BlogPost = mongoose.model('BlogPost');
    var post = new BlogPost();
    post.id = 0;
    post.title = "title";
    post.thumbUrl: 
    post.save();
};

exports.setup = function() {
	var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;
	
	var BlogPost = new Schema({
		id:         ObjectId,
		title:      String,
		thumbUrl:   String,
		url:        String
	});
	
	mongoose.model('BlogPost', BlogPost);
	
	loadTestData();
};
