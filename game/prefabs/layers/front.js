'use strict';

var LayerFront = function(game) {
  Phaser.Group.call(this, game);
  
  this.surfaceTop = 110;
  this.surfaceBot = 490;

  this.generateTop();
  this.generateBot();
};

LayerFront.prototype = Object.create(Phaser.Group.prototype);
LayerFront.prototype.constructor = LayerFront;

LayerFront.prototype.update = function() {
  this.top.tilePosition.x = -this.game.camera.x;
  this.bot.tilePosition.x = -this.game.camera.x;
};

LayerFront.prototype.generateTop = function(){
  this.top = this.game.add.tileSprite(0, this.surfaceTop, 800, 80, 'envBgs');
  this.top.tilePosition.y = -160;
  this.top.fixedToCamera = true;
  this.add(this.top);

  /*
  for(var i = 0; i < 100; i++){
    this.add(this.game.add.image(i * 80, this.surfaceTop, 'envFront', 'surfaceTop'));
  }
  */
};

LayerFront.prototype.generateBot = function(){
  this.bot = this.game.add.tileSprite(0, this.surfaceBot, 800, 80, 'envBgs');
  this.bot.tilePosition.y = -400;
  this.bot.fixedToCamera = true;
  this.add(this.bot);

  /*
  for(var i = 0; i < 100; i++){
    this.add(this.game.add.image(i * 80, this.surfaceBot, 'envFront', 'surfaceBot'));
  }
  */
};


module.exports = LayerFront;
