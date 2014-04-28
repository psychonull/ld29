'use strict';

var Hud = function(game) {
  this._score = 0;
  Phaser.Group.call(this, game);

  this.y = 535;
  this.fixedToCamera = true;

  this.scoreText = this.game.add.bitmapText(0, 20, 'minecraftia','$ 10.000', 22);
  this.add(this.scoreText);

  this.score(1000);

};

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.update = function() {
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

module.exports = Hud;
