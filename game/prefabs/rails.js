'use strict';
var Rail = require('./rail');

var Rails = function(game, map) {
  Phaser.Group.call(this, game);
  
  this.map = map;

  this.y = 270;
  
  this.lastIndex = 0;
  this.generateRails(map);
};

Rails.prototype = Object.create(Phaser.Group.prototype);
Rails.prototype.constructor = Rails;

Rails.RAILS_SEPARATION = 50;
Rails.RAILS_COUNT = 4;

Rails.prototype.update = function() {
  
  if (this.game.camera.x + this.game.width >= this.lastIndex*50) {
    this.generateRails(this.map);
  }

};

Rails.prototype.generateRails = function(map){
  var rail;

  var to = this.lastIndex + 16;
  for(var i = 0; i < Rails.RAILS_COUNT; i++){
    if (this.children[i]){
      this.children[i].regenerate(map[i], this.lastIndex, i);
    }
    else {
      rail = new Rail(this.game, map[i]);
      rail.y = i * Rails.RAILS_SEPARATION;
      this.add(rail);
    }
  }
    
  this.lastIndex = to;
};

Rails.prototype.getLast = function(){
  return this.children[this.length - 1];
};

Rails.prototype.getObstacleGroups = function(){
  var obstacles = [];
  for(var i = 0; i < this.children.length; i++){
    var child = this.children[i];
    for(var obsName in child.obstaclesPool){
      obstacles.push(child.obstaclesPool[obsName].children);
    }
  } 

  return obstacles;
};

module.exports = Rails;