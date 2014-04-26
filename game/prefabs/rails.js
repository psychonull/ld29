'use strict';
var Rail = require('./rail');

var Rails = function(game) {
  Phaser.Group.call(this, game);

  // initialize your prefab here
  this.generateRails();
  this.y = 200;
};

Rails.prototype = Object.create(Phaser.Group.prototype);
Rails.prototype.constructor = Rails;

Rails.RAILS_SEPARATION = 80;

Rails.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Rails.prototype.generateRails = function(){
  var rail;
  for(var i = 0; i < 4; i++){
    rail = new Rail(this.game);
    rail.y = i * Rails.RAILS_SEPARATION;
    this.add(rail);
  }
};

Rails.prototype.getLast = function(){
  return this.children[this.length - 1];
};

module.exports = Rails;
