'use strict';

var LayerFront = function(game) {
  Phaser.Group.call(this, game);
  
  this.surfaceTop = 110;
  this.surfaceBot = 500;

  this.generateTop();
  this.generateBot();
};

LayerFront.prototype = Object.create(Phaser.Group.prototype);
LayerFront.prototype.constructor = LayerFront;

LayerFront.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

LayerFront.prototype.generateTop = function(){
  
  for(var i = 0; i < 100; i++){
    var tile = this.game.add.tileSprite(i * 80, this.surfaceTop, 80, 80, 'envFront');
    tile.tilePosition.y = -80;
    this.add(tile);
  }

};

LayerFront.prototype.generateBot = function(){
  
  for(var i = 0; i < 100; i++){
    var tile = this.game.add.tileSprite(i * 80, this.surfaceBot, 80, 80, 'envFront');
    tile.tilePosition.y = -160;
    this.add(tile);
  }

};


module.exports = LayerFront;
