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
    this.add(this.game.add.tileSprite(i * 50, this.skyPos, 80, 80, 'envFront'));
  }

};

LayerBack.prototype.generateBg = function(){
  
  for(var i = 0; i < 100; i++){
    var tileA = this.game.add.tileSprite(i * 50, this.bgPos, 80, 80, 'envFront');
    var tileB = this.game.add.tileSprite(i * 50, this.bgPos + 80, 80, 80, 'envFront');
    tileA.tilePosition.y = -320;
    tileB.tilePosition.y = -320;
    this.add(tileA);
    this.add(tileB);
  }

};

module.exports = LayerBack;
