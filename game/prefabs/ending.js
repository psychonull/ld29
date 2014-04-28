'use strict';

var Ending = function(game) {
  Phaser.Group.call(this, game);

  this.add(this.game.add.image(0, 295, 'end', 'floor_right'));

  this.add(this.game.add.image(100, 300, 'end', 'gold_pile'));
  //this.minigame = this.game.add.sprite(100,200,'cart');
  //this.add(this.minigame);
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
