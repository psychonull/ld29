'use strict';

var Cart = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cart', frame);

  this.inputEnabled = true;

  game.physics.arcade.enable(this);

  this.body.velocity.x = 450;
  this.body.velocity.y = 0;
  this.anchor.setTo(0.5, 0.5);

  // cart cannot go away from World
  this.body.collideWorldBounds = true;

  this.nextMove = 0;
  this.moveRate = 200;
  this.moveSize = 50;

  this.cursors = game.input.keyboard.createCursorKeys();

  this.currentRail = 3;
};

Cart.prototype = Object.create(Phaser.Sprite.prototype);
Cart.prototype.constructor = Cart;

Cart.prototype.update = function() {
  
  var canMove = this.game.time.now > this.nextMove;
  var hasMove = false;

  if (this.cursors.up.isDown && canMove) {
    hasMove = this.moveToRail(this.currentRail - 1);
  }
  else if (this.cursors.down.isDown && canMove) {
    hasMove = this.moveToRail(this.currentRail + 1);
  }

  if (hasMove){
    this.nextMove = this.game.time.now + this.moveRate;
  }
};

Cart.prototype.moveToRail = function(railIndex){
  var nextRail = this.rails.children[railIndex];
  if(nextRail){
    this.y = nextRail.getCartY();
    this.currentRail = railIndex;
    return true;
  }
  return false;
};

module.exports = Cart;
