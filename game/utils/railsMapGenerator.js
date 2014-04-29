'use strict';
var Rails = require('../prefabs/rails'),
	Rail = require('../prefabs/rail'),
	ObstacleTypes = require('./obstacleTypes');

var game = Phaser.GAMES[0];

var RailsMapGenerator = {
	startingOffset: 6,

	generate: function(state){
		var obstacles = ObstacleTypes.getAvailableIds(),
			width = this.getLength(state),
			difficulty = this.getDifficulty(state);
		var map = [[],[],[],[]];
		for (var i = 0; i < map.length; i++){
			map[i].push(ObstacleTypes.START_ID);
			this.addOffset(map[i]);
			for(var j = 0; j < width; j++){
				map[i].push(Math.round(Math.random() * 50 / difficulty) === 0 ? game.rnd.pick(obstacles) : 0);
			}
			map[i].push(ObstacleTypes.WIN_ID);
		}
		return map;
	},

	addOffset: function(array){
		for(var i = 0; i < this.startingOffset; i++){
			array.push(0);
		}
	},

	getDifficulty: function(state){
		var dif = 1;
		var BASE_DIFICULTY = 3;
		if (state.gamesPlayed < 5){
			dif = BASE_DIFICULTY + Math.round(state.gamesPlayed) + 2;
		}
		else if(state.gamesPlayed >= 5 && state.gamesPlayed < 10){
	      	dif = BASE_DIFICULTY + Math.round(state.gamesPlayed) - 1;
	    }
	    else if(state.gamesPlayed >= 10 && state.gamesPlayed < 15){
	      dif =  7
	    }
	    else {
	    	dif = 10;
	    }
	    return Math.min(dif, 15);
		//return BASE_DIFICULTY + Math.round(state.gamesPlayed / 3)
	},

	getLength: function(state){
		return state.getMapLength();
	}

};



module.exports = RailsMapGenerator;