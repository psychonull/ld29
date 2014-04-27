ObstacleTypes = {
	"1" : {
		res: "cart",
		type: "lose",
		loseFactor: 3
	},
	"2" : {
		res: "env",
		frame: "floor",
		type: "lose",
		loseFactor: 1	
	},
	"-1" : {
		res: "env",
		frame: "floor",
		type: "win"
	}
};

ObstacleTypes.getById = function(id){
	return ObstacleTypes[id];
};

ObstacleTypes.getAvailableIds = function(){
	return [1, 2];
};

ObstacleTypes.WIN_ID = -1;

module.exports = ObstacleTypes;