
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      
      //  Resize our game world to be a 2000 x 800 square
      this.game.world.setBounds(-500, 0, 2000, this.game.height);

      //  Our tiled scrolling background
      this.land = this.game.add.tileSprite(0, 0, 800, 600, 'earth');
      this.land.fixedToCamera = true;

      var cart = this.game.add.sprite(0, 200, 'cart');
      cart.inputEnabled = true;

      this.game.physics.arcade.enable(cart);

      cart.body.velocity.x = this.game.rnd.integerInRange(100,200);
      cart.body.velocity.y = this.game.rnd.integerInRange(0,0);
      cart.anchor.setTo(0.5, 0.5);

      // cart cannot go away from World
      cart.body.collideWorldBounds = true;

      this.game.camera.follow(cart);
      this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
      this.game.camera.focusOnXY(0, 0);

/*
      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
      this.sprite.inputEnabled = true;
      
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      this.sprite.body.bounce.setTo(1,1);
      this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

      this.sprite.events.onInputDown.add(this.clickListener, this);
*/
    },
    update: function() {
      this.land.tilePosition.x = -this.game.camera.x;
      this.land.tilePosition.y = -this.game.camera.y;
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;