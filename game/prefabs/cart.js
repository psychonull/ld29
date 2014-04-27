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

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(35, 30, 0, 10);

  this.currentRail = 3;
  this.enabled = true;
};

Cart.prototype = Object.create(Phaser.Sprite.prototype);
Cart.prototype.constructor = Cart;

Cart.prototype.init = function(rails){
  this.moveToRail(this.currentRail);
}

Cart.prototype.update = function() {
  
  var canMove = this.enabled && (this.game.time.now > this.nextMove);
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

Cart.prototype.checkCollisions = function(railsGroup){
  //this.game.debug.body(this);

  var obstacles = railsGroup.getObstacleGroups();
  for(var i = 0; i < obstacles.length; i++){
    //this.game.debug.body(obstacles[i]);
    this.game.physics.arcade.collide(this, obstacles[i], collisionHandler, null, this);
  }

  function collisionHandler(cart, obstacle){
    console.log('Loose Money!');
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.enabled = false;
  }
}

module.exports = Cart;
