var models = require('../models/models.js');



exports.show = function(req, res){
    
	//var options = {};
	//if(req.user){
	//options.where = {UserId: req.user.id};
	//}

	models.Quiz.findAll( { where: { id: Number(UserId)}, include: [{ model: models.Quiz }] }).then(function(quizes) {

	res.render('quizes/fav.ejs', {quizes: quizes, title: 'Favoritos', errors: [] });
});
};

exports.create=function(req, res){
var fav= models.Comment.build( 
			{ isFav: true,
			  UserId: req.body.favoritos.userId,
			  QuizId: req.params.quizId
			});

fav.validate().then(function(err){
if(err){
res.render('comments/new.ejs', {fav: fav, errors: err.errors, title: 'Error fav', quizid: req.params.quizId});
}else{
comment.save().then(function(){
res.redirect('/quizes/' + req.params.quizId);
}) 
}
}).catch( function(error){next(error)});
};
