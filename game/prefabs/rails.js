'use strict';
var Rail = require('./rail');

var Rails = function(game) {
  Phaser.Group.call(this, game);

  // initialize your prefab here
  this.generateRails();
  
};

Rails.prototype = Object.create(Phaser.Group.prototype);
Rails.prototype.constructor = Rails;

Rails.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Rails.prototype.generateRails = function(){
  var rail;
  for(var i = 0; i < 4; i++){
    rail = new Rail(this.game);
    rail.y = i * 100;
    this.add(rail);
  }
}

module.exports = Rails;
