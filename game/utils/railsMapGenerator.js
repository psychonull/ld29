'use strict';
var Rails = require('../prefabs/rails'),
	Rail = require('../prefabs/rail');

var RailsMapGenerator = {
	width: 200,
	height: 4,
	difficulty: 1,

	generate: function(){
		var map = [[],[],[],[]];
		for (var i = 0; i < map.length; i++){
			for(var j = 0; j < 200; j++){
				map[i].push(Math.round(Math.random() * 20) === 17);

			}
		}
		return map;
	}
};

module.exports = RailsMapGenerator;