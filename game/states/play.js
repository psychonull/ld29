'use strict';

var Cart = require('../prefabs/cart'),
    Rails = require('../prefabs/rails'),
    RailsMapGenerator = require('../utils/railsMapGenerator'),
    LayerBack = require('../prefabs/layers/back'),
    LayerFront = require('../prefabs/layers/front'),
    LayerGame = require('../prefabs/layers/game'),
    Hud = require('../prefabs/hud'),
    Beginning = require('../prefabs/beginning'),
    Ending = require('../prefabs/ending'),
    PlayerStateManager = require('../utils/playerStateManager');

function Play() {}

Play.prototype = {
  create: function() {
    this.initPlayerState();
    this.cartingStarted = false;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //  Resize our game world to be a 2000 x 800 square
    this.game.world.setBounds(0, 0, 50000, this.game.height);

    this.layerBack = new LayerBack(this.game);
    this.game.add.existing(this.layerBack);

    this.layerGame = new LayerGame(this.game);
    this.game.add.existing(this.layerGame);

    this.rails = new Rails(this.game, RailsMapGenerator.generate(this.game.playerState));
    this.game.add.existing(this.rails);

    this.layerFront = new LayerFront(this.game);
    this.game.add.existing(this.layerFront);

    this.cart = new Cart(this.game, 400, 0, this.rails);
    this.cart.rails = this.rails;

    this.cart.collectedStuff.add(function(amt){
      this.rails.setFacing(-1);
      
      this.cart.currentVelocity = 0;
      this.hud.startCowntdown(1*1000);
      this.hud.timer.visible = true;
      this.ending.start();
      
      this.hud.timerExpired.add(function(){
        // If blow up, put back .to({x: 500}
        this.game.add.tween(this.game.camera.deadzone).to({x: 750}, 1000, Phaser.Easing.Linear.NONE, true, 0, 0, false);
        this.cart.currentVelocity = this.game.playerState.getCartSpeed();
        this.ending.end();
      }, this);

    }, this);

    this.cart.collidedObstacle.add(function(amt){
      this.hud.score(amt * this.game.rnd.integerInRange(-50, -5));
      this.cart.gold = this.hud.score();
    }, this);

    this.cart.init(this.game.playerState);

    this.cart.collidedStartingPoint.add(function(){
      this.rails.setFacing(1);
      this.game.camera.follow(null);
      this.cart.currentVelocity = 0;
      this.cartingStarted = false;

      this.game.state.restart(false);
      this.game.playerState.railCartIndex = this.cart.currentRail;
      this.game.playerState.dumpGold(this.hud.score());

    }, this);
    
    this.game.add.existing(this.cart);
    this.game.camera.focusOnXY(0, 0);

    this.beginning = new Beginning(this.game, this.game.playerState);
    this.game.add.existing(this.beginning);

    this.ending = new Ending(this.game);
    this.game.add.existing(this.ending);
    this.ending.x = this.rails.x + this.rails.getEstimatedWidth();

    this.ending.goldClick.add(function(){
      var goldEarned = this.game.playerState.getRandomGoldAmountToPick();
      this.cart.gold += goldEarned; //Gold to sum for each click
      this.cart.animateTextGold("+" + goldEarned);
      this.hud.score(goldEarned);
    }, this);

    // Show FPS
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, 'FPS', { font: '12px helvetica', fill: '#ffffff' }
    );
    this.fpsText.fixedToCamera = true;

    this.hud = new Hud(this.game);
    this.hud.playerLost.add(function(){
      this.game.state.start('lose');
    }, this);
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
    if(!this.game.bgm){
      this.game.bgm = this.game.add.audio('bgm');
      this.game.bgm.play('', 0, 0.7, true);  
    }

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
      this.cart.body.velocity.x = this.game.playerState.getCartSpeed();
      this.cart.currentVelocity = this.game.playerState.getCartSpeed();
      this.game.camera.follow(this.cart);
      this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 10, 10);
    }, this);
  },
  initPlayerState: function(){
    if(!this.game.playerState){
      this.game.playerState = new PlayerStateManager();
    }
    this.game.playerState.gamesPlayed++;
  }
};

module.exports = Play;