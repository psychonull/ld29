'use strict';
var Rail = require('./rail');

var Rails = function(game, map) {
  Phaser.Group.call(this, game);

  // initialize your prefab here
  this.generateRails(map);
  this.y = 270;
};

Rails.prototype = Object.create(Phaser.Group.prototype);
Rails.prototype.constructor = Rails;

Rails.RAILS_SEPARATION = 50;
Rails.RAILS_COUNT = 4;

Rails.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Rails.prototype.generateRails = function(map){
  var rail;
  if(!map){
    for(var i = 0; i < Rails.RAILS_COUNT; i++){
      rail = new Rail(this.game);
      rail.y = i * Rails.RAILS_SEPARATION;
      this.add(rail);
    }
  }
  else {
    for(var i = 0; i < map.length; i++){
      rail = new Rail(this.game, map[i]);
      rail.y = i * Rails.RAILS_SEPARATION;
      this.add(rail);
    }
  }
};

Rails.prototype.getLast = function(){
  return this.children[this.length - 1];
};

module.exports = Rails;