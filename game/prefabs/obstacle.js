'use strict';
var ObstacleTypes = require('../utils/obstacleTypes');

var Obstacle = function(game, x, y, id) {

  this.data = ObstacleTypes.getById(id);

  Phaser.Sprite.call(this, game, x, y, this.data.res, this.data.frame);


  // initialize your prefab here

};

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Obstacle;
