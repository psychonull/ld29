'use strict';

var Cart = require('../prefabs/cart'),
    Rails = require('../prefabs/rails'),
    RailsMapGenerator = require('../utils/railsMapGenerator'),
    LayerBack = require('../prefabs/layers/back'),
    LayerFront = require('../prefabs/layers/front'),
    LayerGame = require('../prefabs/layers/game'),
    Hud = require('../prefabs/hud');

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

    this.rails = new Rails(this.game, RailsMapGenerator.generate(900));
    this.game.add.existing(this.rails);

    this.layerFront = new LayerFront(this.game);
    this.game.add.existing(this.layerFront);

    this.cart = new Cart(this.game, 100, 0, this.rails);
    this.cart.rails = this.rails;
    this.cart.collectedStuff.add(function(amt){
      this.hud.score(amt);
      this.rails.setFacing(-1);
      this.game.add.tween(this.game.camera.deadzone).to({x: 500}, 1000, Phaser.Easing.Linear.NONE, true, 0, 0, false);
    }, this);

    this.cart.collidedObstacle.add(function(amt){
      this.hud.score(amt * this.game.rnd.integerInRange(-50, -5));
    }, this);
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

    this.hud = new Hud(this.game);
    this.game.add.existing(this.hud);
    
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