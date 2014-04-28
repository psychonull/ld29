'use strict';

var Hud = function(game) {
  this._score = 0;
  Phaser.Group.call(this, game);

  this.y = 535;
  this.fixedToCamera = true;

  this.scoreText = this.game.add.bitmapText(0, 0, 'minecraftia_gold','$ 10.000', 30);
  this.add(this.scoreText);

  this.timer = this.game.add.bitmapText(0, 0, 'minecraftia','30.00', 22);
  this.timer.x = this.game.width * 0.9 - this.timer.textWidth / 2;
  this.timer.visible = false;
  this.add(this.timer);

  this.timerExpired = new Phaser.Signal();
  this.score(1000);
};

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.update = function() {
  if (this._cowntdownTimeStarted){
    this.updateTimer();
  }
};

Hud.prototype.score = function(amountToAdd){
  if(typeof amountToAdd == 'undefined'){
    return this._score;
  }
  else {
    this._score += amountToAdd;
    if(amountToAdd > 0){
      this.runScoreUpAnimation(amountToAdd);
    }
    else if (amountToAdd < 0){
      this.runScoreDownAnimation(amountToAdd);
    }
    this.scoreText.setText('$ ' + this._score);  
  }
};

Hud.prototype.runScoreUpAnimation = function(amt){

};

Hud.prototype.runScoreDownAnimation = function(amt){

};

Hud.prototype.startCowntdown = function(miliseconds){
  this._remainingTime = miliseconds;
  this._cowntdownTimeStarted = this.game.time.time;
};

Hud.prototype.stopCowntdown = function(){
  this._cowntdownTimeStarted = null;
  this.timerExpired.dispatch();
};

Hud.prototype.updateTimer = function(){
  var remaining = this._remainingTime - (this.game.time.time - this._cowntdownTimeStarted);
  if (remaining <= 0){
    remaining = 0;
    this.stopCowntdown();
  }
  var seconds = Math.floor(remaining / 1000) % 60;
  var milliseconds = Math.floor(remaining) % 100;
  if (milliseconds < 10)
      milliseconds = '0' + milliseconds;
  if (seconds < 10)
      seconds = '0' + seconds;

  this.timer.setText(seconds + '.' + milliseconds);
 
};

module.exports = Hud;
