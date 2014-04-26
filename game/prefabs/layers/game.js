'use strict';

var LayerGame = function(game) {
  Phaser.Group.call(this, game);

  this.grassPos = 30;

  this.generateGrass();
};

LayerGame.prototype = Object.create(Phaser.Group.prototype);
LayerGame.prototype.constructor = LayerGame;

LayerGame.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

LayerGame.prototype.generateGrass = function(){
  
  for(var i = 0; i < 100; i++){
    this.add(this.game.add.image(i * 50, this.grassPos, 'env', 'grass'));
  }

};

module.exports = LayerGame;
