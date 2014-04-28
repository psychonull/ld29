'use strict';

var Ending = function(game) {
  Phaser.Group.call(this, game);

  this.add(this.game.add.image(0, 295, 'end', 'floor_right'));

  var gold = this.game.add.image(100, 300, 'end', 'gold_pile');
  this.add(gold);
  gold.inputEnabled = true;

  this.goldClick = new Phaser.Signal();
  gold.events.onInputDown.add(this.clickGold, this);

  this.goldEmitter = this.game.add.emitter(200, 350, 10);
  this.add(this.goldEmitter);
};

Ending.prototype = Object.create(Phaser.Group.prototype);
Ending.prototype.constructor = Ending;

Ending.prototype.clickGold = function() {
  this.goldClick.dispatch();

  this.goldEmitter.x = this.game.input.x - 150;
  //this.goldEmitter.y = this.game.input.y - 300;
  
  this.goldEmitter.makeParticles('gold', [0,1,2,3], 3, true, true);

  this.goldEmitter.minParticleSpeed.setTo(-200, -300);
  this.goldEmitter.maxParticleSpeed.setTo(200, -400);
  this.goldEmitter.minParticleScale = 0.2;
  this.goldEmitter.maxParticleScale = 1;
  this.goldEmitter.gravity = 150;
  this.goldEmitter.bounce.setTo(0.5, 0.5);
  this.goldEmitter.angularDrag = 30;

  this.goldEmitter.start(true, 8000, 0, 0);
};

Ending.prototype.update = function() {

};

Ending.prototype.start = function(){
  
};

Ending.prototype.end = function(){

};

module.exports = Ending;
