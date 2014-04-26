'use strict';

var Cart = require('../prefabs/cart'),
    Rails = require('../prefabs/rails'),
    RailsMapGenerator = require('../utils/railsMapGenerator');

function Play() {}

Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //  Resize our game world to be a 2000 x 800 square
    this.game.world.setBounds(0, 0, 2000, this.game.height);

    //  Our tiled scrolling background
    this.land = this.game.add.tileSprite(0, 0, 800, 600, 'earth');
    this.land.fixedToCamera = true;
    
    this.rails = new Rails(this.game, RailsMapGenerator.generate());
    this.game.add.existing(this.rails);

    this.cart = new Cart(this.game, 100, this.rails.getLast().getCartY());
    this.cart.rails = this.rails;
    this.game.add.existing(this.cart);

    this.game.camera.follow(this.cart);
    this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 10, 10);
    this.game.camera.focusOnXY(0, 0);

    // Show FPS
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, 'FPS', { font: '12px helvetica', fill: '#ffffff' }
    );
    this.fpsText.fixedToCamera = true;
  },
  update: function() {
    // Show FPS
    if (this.game.time.fps !== 0) {
      this.fpsText.setText(this.game.time.fps + ' FPS');
    }

    this.land.tilePosition.x = -this.game.camera.x;
    this.land.tilePosition.y = -this.game.camera.y;
  },
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;