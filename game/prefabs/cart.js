'use strict';

var Cart = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cart', frame);

  this.inputEnabled = true;

  game.physics.arcade.enable(this);

  this.body.velocity.x = game.rnd.integerInRange(100,200);
  this.body.velocity.y = 0;
  this.anchor.setTo(0.5, 0.5);

  // cart cannot go away from World
  this.body.collideWorldBounds = true;

  this.nextMove = 0;
  this.moveRate = 200;
  this.moveSize = 80;

  this.cursors = game.input.keyboard.createCursorKeys();
};

Cart.prototype = Object.create(Phaser.Sprite.prototype);
Cart.prototype.constructor = Cart;

Cart.prototype.update = function() {
  
  var canMove = this.game.time.now > this.nextMove;
  var hasMove = false;

  if (this.cursors.up.isDown && canMove) {
    this.y -= this.moveSize;
    hasMove = true;
  }
  else if (this.cursors.down.isDown && canMove) {
    this.y += this.moveSize;
    hasMove = true;
  }

  if (hasMove){
    this.nextMove = this.game.time.now + this.moveRate;
  }
};

module.exports = Cart;
