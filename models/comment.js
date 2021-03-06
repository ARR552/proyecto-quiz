// Definicion del modelo de Comment con la validacion
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Comment', 
		{ texto: {
		type: DataTypes.STRING,
		validate: { notEmpty: {msg: "--> Falta el comentario"}}
		},
		publicado: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
		}
	      }
	    );
}
