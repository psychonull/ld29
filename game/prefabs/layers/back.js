'use strict';

var LayerBack = function(game) {
  Phaser.Group.call(this, game);

  this.bgPos = 140;

  this.generateSky();
  this.generateBg();
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

/*
LayerBack.prototype.generateSky = function(){
  
  for(var i = 0; i < 100; i++){
    this.add(this.game.add.image(i * 80, this.skyPos, 'envFront', 'sky'));
  }

};

LayerBack.prototype.generateBg = function(){
  
  for(var i = 0; i < 100; i++){
    this.add(this.game.add.image(i * 80, this.bgPos, 'envFront', 'bg'));
    this.add(this.game.add.image(i * 80, this.bgPos + 80, 'envFront', 'bg'));
  }

};
*/
module.exports = LayerBack;
