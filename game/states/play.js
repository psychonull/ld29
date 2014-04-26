
'use strict';

var Cart = require('../prefabs/cart');

function Play() {}

Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //  Resize our game world to be a 2000 x 800 square
    this.game.world.setBounds(-500, 0, 2000, this.game.height);

    //  Our tiled scrolling background
    this.land = this.game.add.tileSprite(0, 0, 800, 600, 'earth');
    this.land.fixedToCamera = true;

    this.cart = new Cart(this.game, 100, this.game.height/2);
    this.game.add.existing(this.cart);

    this.game.camera.follow(this.cart);
    this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 10, 10);
    this.game.camera.focusOnXY(0, 0);
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