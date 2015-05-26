var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url =process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
		{dialect: protocol,
		 protocol: protocol,
		 port: port,
		 host: host, 
		 storage: storage, //solo SQlite (.env)
		 omitNull: true    //solo postgres

});

//Importar la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);
 
// Importar definicion de la tabla comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

//Importar definicion de la tabla Comment
var user_path = path.join(__dirname, 'user');
var User = sequelize.import(user_path);

var fav_path = path.join(__dirname, 'fav');
var Favoritos = sequelize.import(fav_path);

User.belongsToMany(Quiz, {through: 'Favoritos'});
Quiz.belongsToMany(User, {through: 'Favoritos'});

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//los quizes pertenecen a un usuario registrado
Quiz.belongsTo(User);
User.hasMany(Quiz);

//exportar tablas
exports.Quiz = Quiz; //exportar definicion de tabla Quiz
exports.Comment = Comment;
exports.User = User;
exports.Favoritos = Favoritos;
/*
//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
//success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
	if(count === 0){ //la tabla se inicializa solo si esta vacia
	   Quiz.create({ pregunta: '¿Cual es la capital de Italia?',
	   		 respuesta: 'Roma'
			});
	   Quiz.create({ pregunta: '¿Cual es la capital de Portugal?',
	   		 respuesta: 'Lisboa'
			})
	   .then(function(){console.log('Base de datos inicializada')});
	  };
  });
});
*/
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  User.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      User.create({username: 'admin',   password: '1234', isAdmin: true});
	User.create({username: 'pepe',   password: '5678'} // el valor por defecto de isAdmin es 'false' 
      ).then(function(){
        console.log('Base de datos (tabla user) inicializada');

        Quiz.count().then(function (count){
          if(count === 0) {   // la tabla se inicializa solo si está vacía
            Quiz.create({pregunta: 'Capital de Italia',   respuesta: 'Roma', UserId: 2}); // estos quizes pertenecen al usuario pepe (2)
	    Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'Lisboa', UserId: 2}
              ).then(function(){console.log('Base de datos (tabla quiz) inicializada');
Favoritos.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Favoritos.create({isFav: true,  QuizId: '1', UserId: '2'}
	
      ).then(function(){
        console.log('Base de datos (tabla favoritos) inicializada');


});
          };
        });
      });
 };
  });
});
    };
  });
});






