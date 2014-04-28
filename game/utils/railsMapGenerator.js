'use strict';
var Rails = require('../prefabs/rails'),
	Rail = require('../prefabs/rail'),
	ObstacleTypes = require('./obstacleTypes');

var game = Phaser.GAMES[0];

var RailsMapGenerator = {
	difficulty: 3,
	startingOffset: 6,

	generate: function(state){
		var obstacles = ObstacleTypes.getAvailableIds();
		var width = 25 * (state.gamesPlayed);
		console.log(width);
		var map = [[],[],[],[]];
		for (var i = 0; i < map.length; i++){
			map[i].push(ObstacleTypes.START_ID);
			this.addOffset(map[i]);
			for(var j = 0; j < width; j++){
				map[i].push(Math.round(Math.random() * 50 / this.difficulty) === 0 ? game.rnd.pick(obstacles) : 0);
			}
			map[i].push(ObstacleTypes.WIN_ID);
		}
		return map;
	},

	addOffset: function(array){
		for(var i = 0; i < this.startingOffset; i++){
			array.push(0);
		}
	}

};



module.exports = RailsMapGenerator;