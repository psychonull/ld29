'use strict';

var LayerBack = function(game) {
  Phaser.Group.call(this, game);

  this.bgPos = 140;

  this.generateSky();
  this.generateBg();
  this.createStart();
};

LayerBack.prototype = Object.create(Phaser.Group.prototype);
LayerBack.prototype.constructor = LayerBack;

LayerBack.prototype.update = function() {
  this.sky.tilePosition.x = -this.game.camera.x;
  this.bg.tilePosition.x = -this.game.camera.x;
};

LayerBack.prototype.generateSky = function(){
  this.sky = this.game.add.tileSprite(0, 0, 800, 80, 'envBgs');
  this.sky.fixedToCamera = true;
  this.add(this.sky);
};

LayerBack.prototype.generateBg = function(){
  this.bg = this.game.add.tileSprite(0, this.bgPos, 800, 160, 'envBgs');
  this.bg.tilePosition.y = -240;
  this.bg.fixedToCamera = true;
  this.add(this.bg);
};

LayerBack.prototype.createStart = function(){
  this.add(this.game.add.image(30, this.bgPos, 'start', 'stair'));
  this.add(this.game.add.image(30, this.bgPos + 80, 'start', 'stair'));

  this.add(this.game.add.image(10, this.bgPos, 'start', 'light'));
};

module.exports = LayerBack;
