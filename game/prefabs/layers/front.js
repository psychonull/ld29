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
    this.add(this.game.add.image(i * 80, this.surfaceTop, 'envFront', 'surfaceTop'));
  }

};

LayerFront.prototype.generateBot = function(){
  
  for(var i = 0; i < 100; i++){
    this.add(this.game.add.image(i * 80, this.surfaceBot, 'envFront', 'surfaceBot'));
  }

};


module.exports = LayerFront;
