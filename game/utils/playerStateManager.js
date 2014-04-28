'use strict';

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
  }
};

PlayerStateManager.LOSE_THRESHOLD = -100;
PlayerStateManager.GOLD_REQUIRED_FOR_FREEDOM = 100000;

module.exports = PlayerStateManager;