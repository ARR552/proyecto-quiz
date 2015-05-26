var express = require('express');
var multer = require('multer');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');
var favController = require('../controllers/fav_controller');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});
router.get('/author', function(req, res){
	res.render('author', { title: 'Créditos', errors: [] });
});


//Autoload de comandos con :quizId
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('userId', userController.load);  // autoload :userId

//Definicion de rutas de sesion
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// Definición de rutas de cuenta
router.get('/user',  userController.new);     // formulario sign un
router.post('/user',  userController.create);     // registrar usuario
router.get('/user/:userId(\\d+)/edit',  sessionController.loginRequired, userController.ownershipRequired, userController.edit);     // editar información de cuenta
router.put('/user/:userId(\\d+)',  sessionController.loginRequired, userController.ownershipRequired, userController.update);     // actualizar información de cuenta
router.delete('/user/:userId(\\d+)',  sessionController.loginRequired, userController.ownershipRequired, userController.destroy);     // borrar cuenta
router.get('/user/:userId(\\d+)/quizes',  quizController.index);     // ver las preguntas de un usuario

//Definicion de rutas quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, multer({ dest: './public/media/'}), quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.ownershipRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.ownershipRequired, multer({ dest: './public/media/'}), quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.ownershipRequired, quizController.destroy);

router.get('/quizes/statistics', quizController.statistics);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.ownershipRequired, commentController.publish);


router.get('/user/:userId(\\d+)/favoritos',  sessionController.loginRequired, userController.ownershipRequired, favController.show);
router.get('/quizes/:quizId(\\d+)/:userId(\\d+)/favoritos',  sessionController.loginRequired, userController.ownershipRequired, favController.create);     

module.exports = router;
