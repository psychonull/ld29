'use strict';
var BlinkingText = function(game, text, fill, period) {
  Phaser.Group.call(this, game);

  this.text = this.game.add.bitmapText(0, 0, 'minecraftia_white', text || 'EXAMPLE', 46);
  this.text.tint = fill || 0xFF0000;
  this.add(this.text);
  
  this.period = period || 200;
  this._timer = 0;
  this._running = false;

  this.timer = this.game.time.events.loop(Phaser.Timer.SECOND * 0.1 , function(){
    this.text.visible = !this.text.visible;
  }, this);

};

BlinkingText.prototype = Object.create(Phaser.Group.prototype);
BlinkingText.prototype.constructor = BlinkingText;

BlinkingText.prototype.update = function() {
 
};

BlinkingText.prototype.start = function(){
  this.timer.timer.start();
}

BlinkingText.prototype.stop = function(){
  this.timer.timer.stop();
}

module.exports = BlinkingText;