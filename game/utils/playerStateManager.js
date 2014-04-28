'use strict';

var game = Phaser.GAMES[0];

var PlayerStateManager = function(){
  this.gamesPlayed = 0;

  this.freedomGold = 0;
  this.surplusGold = 0;

  this.railCartIndex = 3;
};

PlayerStateManager.prototype = {
  addFreedomGold: function(amt){
    this.freedomGold += amt;
  },
  addSurplusGold: function(amt){
    this.surplusGold += amt;
  },
  dumpGold: function(amt){
    if(amt > 0){
      this.addFreedomGold(Math.round(amt * 0.1));
      this.addSurplusGold(Math.round(amt * 0.9));
    }
    else {
      // losses to the worker
      this.addFreedomGold(amt);
    }
  },
  getRandomGoldAmountToPick: function(){
    return this.gamesPlayed * game.rnd.integerInRange(100, 500);
  },
  getCartSpeed: function(){
    var speed = 750;
    if ( this.gamesPlayed == 1){
      speed = 400;
    }
    else if(this.gamesPlayed > 1 && this.gamesPlayed < 5){
      speed = 700;
    }
    else if(this.gamesPlayed >= 5 && this.gamesPlayed < 7){
      speed = 900;
    }
    else {
      speed = 900 * (this.gamesPlayed / 6);
    }
    return speed;
  }
};

PlayerStateManager.LOSE_THRESHOLD = -10000;
PlayerStateManager.GOLD_REQUIRED_FOR_FREEDOM = 100000;

module.exports = PlayerStateManager;