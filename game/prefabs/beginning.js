'use strict';

var Beginning = function(game) {
  Phaser.Group.call(this, game);

  //this.ladder = this.game.add.sprite(100,200,'cart');
  //this.add(this.ladder);
/*
  var tile = this.game.add.image(0, 300, 'start', 'floor');
  tile.bringToFront();
  this.add(tile);
*/
};

Beginning.prototype = Object.create(Phaser.Group.prototype);
Beginning.prototype.constructor = Beginning;

Beginning.prototype.update = function() {
};

module.exports = Beginning;
