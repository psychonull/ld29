'use strict';

var LayerGame = function(game) {
  Phaser.Group.call(this, game);

  this.grassPos = 65;

  this.generateGrass();
};

LayerGame.prototype = Object.create(Phaser.Group.prototype);
LayerGame.prototype.constructor = LayerGame;

LayerGame.prototype.update = function() {
  this.grass.tilePosition.x = -this.game.camera.x;  
};

LayerGame.prototype.generateGrass = function(){
  this.grass = this.game.add.tileSprite(0, this.grassPos, 800, 80, 'envBgs');
  this.grass.tilePosition.y = -480;
  this.grass.fixedToCamera = true;
  this.add(this.grass);

  this.add(this.game.add.image(30, 40, 'start', 'hole'));
};

module.exports = LayerGame;
