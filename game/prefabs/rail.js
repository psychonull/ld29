'use strict';

var Rail = function(game) {
  Phaser.Group.call(this, game);

  // initialize your prefab here
  this.generateRail();

  
};

Rail.prototype = Object.create(Phaser.Group.prototype);
Rail.prototype.constructor = Rail;

Rail.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Rail.prototype.generateRail = function(){
  for(var i = 0; i < 100; i++){
    this.add(this.game.add.tileSprite(i * 50, 0, 80, 80, 'env'));
  }
};

Rail.prototype.getCartY = function(){
  return this.y + this.parent.y + 50 - 10;
};

module.exports = Rail;
