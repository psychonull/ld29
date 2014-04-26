'use strict';

var LayerBack = function(game) {
  Phaser.Group.call(this, game);

  this.skyPos = 0;
  this.bgPos = 140;

  this.generateSky();
  this.generateBg();
};

LayerBack.prototype = Object.create(Phaser.Group.prototype);
LayerBack.prototype.constructor = LayerBack;

LayerBack.prototype.update = function() {
  
};

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

module.exports = LayerBack;
