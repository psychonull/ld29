
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    
    this.load.image('cart', 'assets/cart.png');

    this.load.atlas('env', 'assets/env_tiles.png', 'assets/env_tiles.json');
    this.load.atlas('envFront', 'assets/env_tiles_front.png', 'assets/env_tiles_front.json');

    this.game.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia.png', 'assets/fonts/minecraftia.xml');

    this.game.load.audio('playSfx', 'assets/sounds/mainMenuPlay.wav');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
