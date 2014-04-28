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
		this.addFreedomGold(Math.round(amt * 0.1));
		this.addSurplusGold(Math.round(amt * 0.9));
	}
};

module.exports = PlayerStateManager;