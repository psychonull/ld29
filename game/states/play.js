'use strict';

var Cart = require('../prefabs/cart'),
    Rails = require('../prefabs/rails'),
    RailsMapGenerator = require('../utils/railsMapGenerator'),
    LayerBack = require('../prefabs/layers/back'),
    LayerFront = require('../prefabs/layers/front'),
    LayerGame = require('../prefabs/layers/game'),
    Hud = require('../prefabs/hud'),
    Beginning = require('../prefabs/beginning'),
    Ending = require('../prefabs/ending');

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

    this.rails = new Rails(this.game, RailsMapGenerator.generate(100));
    this.game.add.existing(this.rails);

    this.layerFront = new LayerFront(this.game);
    this.game.add.existing(this.layerFront);

    this.cart = new Cart(this.game, 400, 0, this.rails);
    this.cart.rails = this.rails;

    this.cart.collectedStuff.add(function(amt){
      this.hud.score(amt);
      this.rails.setFacing(-1);
      
      this.cart.currentVelocity = 0;
      this.hud.startCowntdown(5*1000);
      this.hud.timer.visible = true;

      this.hud.timerExpired.add(function(){
        this.game.add.tween(this.game.camera.deadzone).to({x: 500}, 1000, Phaser.Easing.Linear.NONE, true, 0, 0, false);
        this.cart.currentVelocity = 750;

        this.cart.gold = 1;
      }, this);

    }, this);

    this.cart.collidedObstacle.add(function(amt){
      this.hud.score(amt * this.game.rnd.integerInRange(-50, -5));
    }, this);

    this.cart.init();

    this.cart.collidedStartingPoint.add(function(){
      this.rails.setFacing(1);
      this.game.camera.follow(null);
      this.cart.currentVelocity = 0;
      this.cartingStarted = false;

      this.cart.gold = 0;
    }, this);
    
    this.game.add.existing(this.cart);
    this.game.camera.focusOnXY(0, 0);

    this.beginning = new Beginning(this.game);
    this.game.add.existing(this.beginning);

    this.ending = new Ending(this.game);
    this.game.add.existing(this.ending);
    this.ending.x = this.rails.x + this.rails.getEstimatedWidth();

    // Show FPS
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, 'FPS', { font: '12px helvetica', fill: '#ffffff' }
    );
    this.fpsText.fixedToCamera = true;

    this.hud = new Hud(this.game);
    this.game.add.existing(this.hud);

    //  Stop the following keys from propagating up to the browser
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
    var self = this;
    this.game.input.keyboard.onDownCallback = function(){
      if(!self.cartingStarted){
        self.startCarting();
      }
    };

    this.game.stage.backgroundColor = "#000";
  },
  update: function() {
    // Show FPS
    if (this.game.time.fps !== 0) {
      this.fpsText.setText(this.game.time.fps + ' FPS' + " /// " + this.game.camera.x);
    }

    if (this.cart.currentVelocity !== 0){
      this.hud.updateMinimap(this.cart, this.rails);
    }

    this.cart.checkCollisions(this.rails);
  },
  startCarting: function(){
    this.cartingStarted = true;
    var moveCamTween = this.game.add.tween(this.game.camera).to({x: this.cart.x - 100}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);
    moveCamTween.onComplete.add(function(){
      this.cart.body.velocity.x = 750;
      this.cart.currentVelocity = 750;
      this.game.camera.follow(this.cart);
      this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 10, 10);
    }, this);
  }
};

module.exports = Play;