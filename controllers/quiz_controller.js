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
	models.Quiz.findAll({where: ["pregunta like ?", '%' + req.query.search + '%'], order: 'pregunta ASC'}).then(function(quizes){ res.render('quizes/index.ejs', {quizes: quizes, title: 'Listado', errors: [] })}).catch(function(error) { next(error);});
	}else{
	console.log('ha entrado en el if normal');
	models.Quiz.findAll().then(function(quizes) {
	res.render('quizes/index.ejs', {quizes: quizes, title: 'Listado', errors: [] });
}).catch(function(error) { next(error);});
};
}


// GET /quizes/:Id
exports.show = function(req, res){
      models.Quiz.find(req.params.quizId).then(function(quiz) {
	res.render('quizes/show', {quiz: req.quiz, title: 'Quiz-pregunta', errors: [] });
});
};


// GET /quizes/answer
exports.answer = function(req, res){
models.Quiz.find(req.params.quizId).then(function(quiz) {
if (req.query.respuesta === req.quiz.respuesta){
res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', title: 'Quiz-Respuesta', errors: [] });
} else {
res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto', title: 'Quiz-Respuesta', errors: [] });
}
})
};


// GET /quizes/new
exports.new =function(req, res) {
var quiz = models.Quiz.build( //crea un objeto quiz
{pregunta: "Pregunta", respuesta: "Respuesta"}
);
res.render('quizes/new', {quiz: quiz, title: 'Crear', errors: [] });
};


// POST /quizes/create
exports.create=function(req, res){
var quiz= models.Quiz.build( req.body.quiz );
//guarda en DB los campos pregunta y respuesta de quiz
quiz.validate().then(function(err){
if(err){
res.render('quizes/new', {quiz: quiz, errors: err.errors, title: 'Crear'});
}else{
quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
res.redirect('/quizes');
}) //Redireccion http (url relativo) lista de preguntas
}
});
};

// GET /quizes/:id/edit
exports.edit =function(req, res) {
var quiz = req.quiz;
res.render('quizes/edit', {quiz: quiz, errors: [], title: 'Crear', errors: [] });
};

// PUT /quizes/:id
exports.update=function(req, res){
req.quiz.pregunta = req.body.quiz.pregunta;
req.quiz.respuesta = req.body.quiz.respuesta;

req.quiz.validate().then(function(err){
if(err){
res.render('quizes/edit', {quiz: req.quiz, errors: err.errors, title: 'Editar'});
}else{
req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
res.redirect('/quizes');
}) //Redireccion http (url relativo) lista de preguntas
}
});
};

// DELETE /quizes/:id
exports.destroy = function(req, res){
      req.quiz.destroy().then( function() {
	res.redirect('/quizes');
}).catch(function(error) { next(error);});
};


