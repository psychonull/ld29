'use strict';
var BlinkingText = require('./blinkingText');

var Ending = function(game) {
  this._running = false;
  Phaser.Group.call(this, game);

  this.add(this.game.add.image(-50, 295, 'end', 'floor_right'));

  var gold = this.game.add.image(100, 300, 'end', 'gold_pile');
  this.add(gold);
  gold.inputEnabled = true;

  this.goldClick = new Phaser.Signal();
  gold.events.onInputDown.add(this.clickGold, this);

  this.goldEmitter = this.game.add.emitter(200, 350, 10);
  this.add(this.goldEmitter);

  this.space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.space_key.onDown.add(this.clickGold, this);

  this.collectText = new BlinkingText(this.game, 'COLLECT');
  this.collectText.x = 200;
  this.collectText.y = 20;
  this.add(this.collectText);
  this.collectText.start();
  this.coinPickupSound = this.game.add.audio('coinPickup');
  this.coinPickupSound.volume = 0.3;
};

Ending.prototype = Object.create(Phaser.Group.prototype);
Ending.prototype.constructor = Ending;

Ending.prototype.clickGold = function() {
  if(!this._running){
    return;
  }
  
  this.coinPickupSound.play();  

  this.goldClick.dispatch();

  this.goldEmitter.x = this.game.rnd.integerInRange(120,280);
  
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
  this._running = true;
};

Ending.prototype.end = function(){
  this._running = false;
};

module.exports = Ending;
