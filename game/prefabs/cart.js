'use strict';

var Cart = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cart', frame);

  this.inputEnabled = true;

  game.physics.arcade.enable(this);

  this.currentVelocity = 0;
  this.facing = 1;
  this.jumpOnCollide = 10;

  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.anchor.setTo(0.5, 0.5);

  // cart cannot go away from World
  this.body.collideWorldBounds = true;

  this.nextMove = 0;
  this.moveRate = 200;
  this.moveSize = 50;

  this.cursors = game.input.keyboard.createCursorKeys();
  this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.setSize(35, 30, 0, 10);

  this.currentRail = 3;

  this.enabled = true;

  this.collectedStuff = new Phaser.Signal();
  this.collidedObstacle = new Phaser.Signal();
  this.collidedStartingPoint = new Phaser.Signal();
  this.collided = false;

  this.gold = 0;

  this.animations.add('empty', [0,1,2,3,4], true);
  this.animations.add('filled', [5,6,7,8,9]);
  this.animations.play('empty'); 

  this.emitter = this.game.add.emitter(50, 50, 10);
};

Cart.prototype = Object.create(Phaser.Sprite.prototype);
Cart.prototype.constructor = Cart;

Cart.prototype.init = function(rails){
  this.moveToRail(this.currentRail, true);
}

Cart.prototype.update = function() {
  this.body.velocity.x = this.currentVelocity * this.facing;
  
  var canMove = this.enabled && (this.game.time.now > this.nextMove) && this.currentVelocity !== 0;
  var hasMove = false;

  if ((this.cursors.up.isDown || this.wKey.isDown) && canMove) {
    hasMove = this.moveToRail(this.currentRail - 1);
  }
  else if ((this.cursors.down.isDown || this.sKey.isDown) && canMove) {
    hasMove = this.moveToRail(this.currentRail + 1);
  }

  if (hasMove){
    this.nextMove = this.game.time.now + this.moveRate;
    this.shootParticles('chips');
  }

  if (this.collided){
    var duration = 100;
    this.game.add.tween(this).to({angle: 20 * this.facing}, duration, Phaser.Easing.Quadratic.InOut, true, 0, false);
    this.game.add.tween(this).to({angle: 10 * this.facing * -1}, duration, Phaser.Easing.Quadratic.OutIn, true, duration*2, false);
    this.game.add.tween(this).to({angle: 0}, duration, Phaser.Easing.Quadratic.OutIn, true, duration*3, false);
    this.collided = false;
  }

  if (this.body.velocity.x === 0){
    this.animations.stop();
  }
  else {
    this.animations.play(this.gold > 0 ? 'filled' : 'empty', 12, true); 
  }
};

Cart.VELOCITY_REDUCTION_ON_RAIL_MOVEMENT = 0.9;

Cart.prototype.moveToRail = function(railIndex, noAminate){  
  var nextRail = this.rails.children[railIndex];
  if(nextRail){

    if (noAminate){
      this.y = nextRail.getCartY();
      this.currentRail = railIndex;  
    }
    else {
      var nextY = nextRail.getCartY();

      var duration = 40;
      this.body.velocity.x = this.body.velocity.x * Cart.VELOCITY_REDUCTION_ON_RAIL_MOVEMENT;

      this.game.add.tween(this)
        .to({y: nextY}, duration*3, Phaser.Easing.Quadratic.OutIn, true, 0, false)
        .onComplete.add(function(){
          this.currentRail = railIndex;
          this.body.velocity.x = this.body.velocity.x * (1/Cart.VELOCITY_REDUCTION_ON_RAIL_MOVEMENT);
        }, this);

      this.game.add.tween(this).to({angle: 20 * this.facing * -1}, duration, Phaser.Easing.Quadratic.InOut, true, 0, false);
      this.game.add.tween(this).to({angle: 20 * this.facing}, duration, Phaser.Easing.Quadratic.OutIn, true, duration*2, false);
      this.game.add.tween(this).to({angle: 10 * this.facing * -1}, duration, Phaser.Easing.Quadratic.OutIn, true, duration*3, false);
      this.game.add.tween(this).to({angle: 0}, duration, Phaser.Easing.Quadratic.OutIn, true, duration*4, false);
    }

    return true;
  }
  return false;
};

Cart.prototype.shootParticles = function(type){
  switch(type){
    case "chips":
      this.emitter.x = this.x;
      this.emitter.y = this.y;

      this.emitter.makeParticles('chips', [0,1,2,3], 5, true, true);

      var velX = this.currentVelocity * this.facing;
      this.emitter.minParticleSpeed.setTo(velX * 0.5, -100);
      this.emitter.maxParticleSpeed.setTo(velX * 1.5, -300);

      this.emitter.minParticleScale = 0.2;
      this.emitter.maxParticleScale = 0.5;
      this.emitter.setAlpha(1, 0);
      this.emitter.gravity = 500;
      this.emitter.bounce.setTo(0.5, 0.5);
      this.emitter.angularDrag = 30;

      this.emitter.start(true, 8000, 0, 10);
      break;
  }
};

Cart.prototype.animateText = function(text){
  
  var x = this.x;
  var y = this.y;
  
  var txt = this.game.add.bitmapText(x + (100*this.facing), y, 'minecraftia_white', text , 30);
  txt.tint = 0xFF0000;
  this.game.add.tween(txt).to({alpha: 0, y: y-100, x: x + (this.facing*this.currentVelocity) }, 750, Phaser.Easing.Quadratic.InOut, true, 0, false);
};

Cart.prototype.animateTextGold = function(text){
  
  var x = this.x;
  var y = this.y-50;
  
  var txt = this.game.add.bitmapText(x, y, 'minecraftia_white', text , 30);
  txt.tint = 0xf3c907;
  this.game.add.tween(txt).to({alpha: 0, y: y-200 }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, false);
  //this.game.add.tween(txt).to(properties, duration, ease, autoStart, delay, repeat, yoyo);
};

Cart.prototype.checkCollisions = function(railsGroup){
  //this.game.debug.body(this);

  var obstacles = railsGroup.getObstacleGroups();
  for(var i = 0; i < obstacles.length; i++){
    //this.game.debug.body(obstacles[i]);
    this.game.physics.arcade.collide(this, obstacles[i], collisionHandler, null, this);
  }

  function collisionHandler(cart, obstacle){
    if(obstacle.data.type === 'win'){
      this.facing = -1;
      this.collectedStuff.dispatch(this.game.rnd.integerInRange(10,1000));
    }
    else if(obstacle.data.type === 'start'){
      this.facing = 1;
      this.collidedStartingPoint.dispatch();
    }
    else {
      this.shootParticles('chips');

      this.collidedObstacle.dispatch(obstacle.data.loseFactor, obstacle);
      this.x += this.jumpOnCollide * this.facing;
      this.animateText("-" + obstacle.data.loseFactor.toString());
    }
    
    this.collided = true;
  }
};

module.exports = Cart;
