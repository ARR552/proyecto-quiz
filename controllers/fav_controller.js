var models = require('../models/models.js');



exports.show = function(req, res){
    
	//var options = {};
	//if(req.user){
	//options.where = {UserId: req.user.id, model: models.Quiz};
	//}

	models.Quiz.findAll( {  include: [{ model: models.Quiz }, {model: models.Favoritos }] }).then(function(quizes) {

	res.render('quizes/fav.ejs', {quizes: quizes, title: 'Favoritos', errors: [] });
});
};

exports.create=function(req, res){
var fav= models.Favoritos.build( 
			{ isFav: true,
			  UserId: req.session.user.id,
			  QuizId: req.params.quizId
			});

fav.validate().then(function(err){
if(err){
res.render('comments/new.ejs', {fav: fav, errors: err.errors, title: 'Error fav', quizid: req.params.quizId});
}else{
fav.save().then(function(){
res.redirect('/quizes/' + req.params.quizId);
}) 
}
}).catch( function(error){next(error)});
};


exports.destroy = function(req, res){
    // for(i in quizes){
	//for(index in quizes[i].Favoritos){
	//if((QuizId ===req.params.quizId) && (UserId === req.session.user.id)){
	//console.log('dentro del if');
	//}
		
	//	}
	//}
	 req.favorito.destroy().then( function() {
	res.redirect('/quizes');
}).catch(function(error) { next(error);});
};

