'use strict';
var Rails = require('../prefabs/rails'),
	Rail = require('../prefabs/rail'),
	ObstacleTypes = require('./obstacleTypes');

var game = Phaser.GAMES[0];

var RailsMapGenerator = {
	height: 4,
	difficulty: 1,

	generate: function(width){
		var obstacles = ObstacleTypes.getAvailableIds();
		var map = [[],[],[],[]];
		for (var i = 0; i < map.length; i++){
			for(var j = 0; j < width; j++){
				map[i].push(Math.round(Math.random() * 20) === 1 ? game.rnd.pick(obstacles) : 0);
			}
			map[i].push(ObstacleTypes.WIN_ID);
		}
		return map;
	}
};

module.exports = RailsMapGenerator;