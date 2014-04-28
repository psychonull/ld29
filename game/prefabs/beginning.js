'use strict';

var Beginning = function(game, state) {
  Phaser.Group.call(this, game);

  this.freedomGoldText = this.game.add.bitmapText(200, 220, 'minecraftia', state.freedomGold + '.00', 10);
  this.add(this.freedomGoldText);  

  this.surplusGoldText = this.game.add.bitmapText(50, 270, 'minecraftia', state.surplusGold + '.00', 10);
  this.add(this.surplusGoldText);
};

Beginning.prototype = Object.create(Phaser.Group.prototype);
Beginning.prototype.constructor = Beginning;

Beginning.prototype.update = function() {
};

module.exports = Beginning;
