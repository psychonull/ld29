
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.text = this.game.add.text(325,this.game.height/2 + 70, "LOADING...");
    this.text.font = 'Arial';
    this.text.fontWeight = 'bold';
    this.text.fontSize = 30;
    this.text.fill = '#ffffff';


    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    
    this.load.spritesheet('cart', 'assets/cart.png', 80, 80, 10);  
    this.load.spritesheet('gold', 'assets/gold.png', 64, 64, 4);

    this.load.atlas('env', 'assets/env_tiles.png', 'assets/env_tiles.json');
    this.load.atlas('envFront', 'assets/env_tiles_front.png', 'assets/env_tiles_front.json');
    this.load.image('envBgs', 'assets/env_bg_tiles.png');
    this.load.atlas('start', 'assets/start.png', 'assets/start.json');
    this.load.atlas('end', 'assets/end.png', 'assets/end.json');

    this.game.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia.png', 'assets/fonts/minecraftia.xml');
    this.game.load.bitmapFont('minecraftia_white', 'assets/fonts/minecraftia_white.png', 'assets/fonts/minecraftia_white.xml');

    this.game.load.audio('playSfx', 'assets/sounds/mainMenuPlay.wav');

    window.formatNumber = function(nbo, zeros){
      function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
      }

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      var attach = "";
      if (nbo < 0){
        nbo *= -1;
        attach = "-";
      }
      return attach + numberWithCommas(pad(nbo, zeros || 6));
    };
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
