'use strict';

var Beginning = function(game) {
  Phaser.Group.call(this, game);

  this.ladder = this.game.add.sprite(100,200,'cart');
  this.add(this.ladder);
};

Beginning.prototype = Object.create(Phaser.Group.prototype);
Beginning.prototype.constructor = Beginning;

Beginning.prototype.update = function() {
};

module.exports = Beginning;
