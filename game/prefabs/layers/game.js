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
    var tile = this.game.add.tileSprite(i * 50, this.grassPos, 80, 80, 'env');
    tile.tilePosition.y = -160;
    this.add(tile);
  }

};

module.exports = LayerGame;
