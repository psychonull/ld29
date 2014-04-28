'use strict';
var PlayerStateManager = require('../utils/playerStateManager');

  function Lose() {}
  Lose.prototype = {
    preload: function() {
      // Override this method to add some load operations. 
      // If you need to use the loader, you may need to use them here.
    },
    create: function() {
      this.game.stage.backgroundColor = '#000';
      this.lostText = this.game.add.bitmapText(0, 150, 'minecraftia_white','YOU LOST', 52);
      this.lostText.align = 'center';
      this.lostText.x = this.game.width / 2 - this.lostText.textWidth / 2;
      this.lostText.tint = 0xFF1100;


      this.awayText1 = this.game.add.bitmapText(50, this.lostText.y + 100, 'minecraftia_white','you were only', 22);
      this.awayAmountText = this.game.add.bitmapText(this.awayText1.x + this.awayText1.textWidth + 10, 
                                                    this.lostText.y + 100, 
                                                    'minecraftia_white','$' + this.getGoldRemainingForFreedom(), 22);
      this.awayAmountText.tint = 0xF8F801;
      this.awayText2 = this.game.add.bitmapText(this.awayAmountText.x + this.awayAmountText.textWidth + 10, 
                                                this.awayText1.y, 
                                                'minecraftia_white','away from freedom.', 22);

      this.textInstructions = this.game.add.bitmapText(this.lostText.x, 
                                                this.awayText1.y + 100, 
                                                'minecraftia_white','Click to start over again', 15);

    },
    update: function() {
      if(this.game.input.activePointer.justPressed()) {
        this.restartGame();
      }
    },
    paused: function() {
      // This method will be called when game paused.
    },
    render: function() {
      // Put render operations here.
    },
    shutdown: function() {
      // This method will be called when the state is shut down 
      // (i.e. you switch to another state from this one).
    },
    restartGame: function(){
      this.game.playerState = new PlayerStateManager();
      this.game.state.start('play');    
    },
    getGoldRemainingForFreedom: function(){
      return PlayerStateManager.GOLD_REQUIRED_FOR_FREEDOM - this.game.playerState.freedomGold;
    }
  };
module.exports = Lose;
