ObstacleTypes = {
	"1" : {
		res: "cart",
		type: "lose",
		loseFactor: 2
	},
	"2" : {
		res: "env",
		frame: "floor",
		type: "lose",
		loseFactor: 1	
	},
	"3" : {
		res: "env",
		frame: "rock",
		type: "lose",
		loseFactor: 1	
	},
	"4" : {
		res: "env",
		frame: "plant",
		type: "lose",
		loseFactor: 1	
	},
	"-1" : {
		res: "env",
		frame: "stop_right",
		type: "win"
	},
	"-2" : {
		res: "env",
		frame: "stop_left",
		type: "start"
	}
};

ObstacleTypes.getById = function(id){
	return ObstacleTypes[id];
};

ObstacleTypes.getAvailableIds = function(){
	return [1, 2, 3, 4];
};

ObstacleTypes.WIN_ID = -1;
ObstacleTypes.START_ID = -2;

module.exports = ObstacleTypes;