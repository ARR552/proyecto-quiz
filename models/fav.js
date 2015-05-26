module.exports=function(sequelize, DataTypes){
	return sequelize.define('Favoritos',
		{ isFav: {
		  type: DataTypes.BOOLEAN,
                defaultValue: true },
		QuizId: {
		  type: DataTypes.STRING},
		UserId: {
		  type: DataTypes.STRING}
		 
		});
}
