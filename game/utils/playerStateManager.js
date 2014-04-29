'use strict';

var game = Phaser.GAMES[0];

var PlayerStateManager = function(){
  this.gamesPlayed = 0;
  this.gamesLost = 0;

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
    //if()
    return this.gamesPlayed * game.rnd.integerInRange(100, 500);
  },
  getRandomBaseGoldAMountToDrop: function(){
    // THIS WILL BE MULTIPLIED BY THE OBSTACLE RATE
    return game.rnd.integerInRange(-1000, -10);
  },
  getCartSpeed: function(){
    var speed = 750;
    if ( this.gamesPlayed == 1){
      speed = 400;
    }
    else if(this.gamesPlayed > 1 && this.gamesPlayed < 5){
      speed = 500;
    }
    else if(this.gamesPlayed >= 5 && this.gamesPlayed < 10){
      speed = 600;
    }
    else if(this.gamesPlayed >= 10 && this.gamesPlayed < 15){
      speed = 700;
    }
    else if(this.gamesPlayed >= 15 && this.gamesPlayed < 20){
      speed = 800;
    }
    else {
      speed = 900 * (this.gamesPlayed / 6);
    }
    if(speed > PlayerStateManager.MAX_SPEED){
      return PlayerStateManager.MAX_SPEED;
    }
    return speed;
  },
  getCollectTime: function(){
    if(this.gamesPlayed == 1){
      return 3000
    }
    else{
      return 1000;
    }
  },
  getMapLength: function(){
    return Math.min(25 * (this.gamesPlayed), PlayerStateManager.MAX_MAP_LENGTH);
  }
};

PlayerStateManager.LOSE_THRESHOLD = -6666;
PlayerStateManager.GOLD_REQUIRED_FOR_FREEDOM = 100000;
PlayerStateManager.MAX_SPEED = 1000;
PlayerStateManager.MAX_MAP_LENGTH = 800;

module.exports = PlayerStateManager;