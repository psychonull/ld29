'use strict';

var Ending = function(game) {
  Phaser.Group.call(this, game);

  this.minigame = this.game.add.sprite(100,200,'cart');
  this.add(this.minigame);
};

Ending.prototype = Object.create(Phaser.Group.prototype);
Ending.prototype.constructor = Ending;

Ending.prototype.update = function() {
};

Ending.prototype.start = function(){
  
};

Ending.prototype.end = function(){

};

module.exports = Ending;
