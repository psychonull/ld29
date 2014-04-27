'use strict';

var Cart = require('../prefabs/cart'),
    Rails = require('../prefabs/rails'),
    RailsMapGenerator = require('../utils/railsMapGenerator'),
    LayerBack = require('../prefabs/layers/back'),
    LayerFront = require('../prefabs/layers/front'),
    LayerGame = require('../prefabs/layers/game');

function Play() {}

Play.prototype = {
  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //  Resize our game world to be a 2000 x 800 square
    this.game.world.setBounds(0, 0, 50000, this.game.height);

    this.layerBack = new LayerBack(this.game);
    this.game.add.existing(this.layerBack);

    this.layerGame = new LayerGame(this.game);
    this.game.add.existing(this.layerGame);

    this.rails = new Rails(this.game, RailsMapGenerator.generate(1000));
    this.game.add.existing(this.rails);

    this.layerFront = new LayerFront(this.game);
    this.game.add.existing(this.layerFront);

    this.cart = new Cart(this.game, 100, 0, this.rails);
    this.cart.rails = this.rails;
    this.cart.init();
    
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

    this.scoreText = this.game.add.bitmapText(0, 540, 'minecraftia','$ 10.000', 22);
    this.scoreText.fixedToCamera = true;
  },
  update: function() {
    // Show FPS
    if (this.game.time.fps !== 0) {
      this.fpsText.setText(this.game.time.fps + ' FPS' + " /// " + this.game.camera.x);
    }

    this.cart.checkCollisions(this.rails);
  },
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;