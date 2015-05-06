var models = require('../models/models.js');

// Autoload factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
      models.Quiz.find(quizId).then(function(quiz) {
	if (quiz) {
	req.quiz = quiz;
	next();
	} else { 
	next(new Error('No existe quizId=' + quizId));}
}).catch(function(error) { next(error);});
};


// GET /quizes

exports.index = function(req, res){
      //models.Quiz.findAll().then(function(quizes) {
	if(req.query.search){
	console.log('ha entrado en el if de busqueda');
	models.Quiz.findAll({where: ["pregunta like ?", '%' + req.query.search + '%'], order: 'pregunta ASC'}).then(function(quizes){ res.render('quizes/index.ejs', {quizes: quizes, title: 'Listado' })});
	}else{
	console.log('ha entrado en el if normal');
	models.Quiz.findAll().then(function(quizes) {
	res.render('quizes/index.ejs', {quizes: quizes, title: 'Listado' });
});
};
}




// GET /quizes/:Id
exports.show = function(req, res){
      models.Quiz.find(req.params.quizId).then(function(quiz) {
	res.render('quizes/show', {quiz: req.quiz, title: 'Quiz-pregunta' });
});
};



// GET /quizes/answer
exports.answer = function(req, res){
models.Quiz.find(req.params.quizId).then(function(quiz) {
if (req.query.respuesta === req.quiz.respuesta){
res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', title: 'Quiz-Respuesta' });
} else {
res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto', title: 'Quiz-Respuesta' });
}
})
};
