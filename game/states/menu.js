
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.game.stage.backgroundColor = '#61e1e9';
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'cart');
    this.sprite.anchor.setTo(0.5, 0.5);


    this.playText = this.game.add.bitmapText(0, 300, 'minecraftia_white','PLAY', 46);
    this.playText.align = 'center';
    this.playText.x = this.game.width / 2 - this.playText.textWidth / 2;
    this.playText.y = this.game.height / 2 - this.playText.textHeight / 2;
    
    this.instructionsText = this.game.add.bitmapText(270, 365, 'minecraftia', 'Click to begin. Use Up/Down Arrows to move', 16);
    this.instructionsText.x = this.game.width / 2 - this.instructionsText.textWidth / 2;

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 300, Phaser.Easing.Quadratic.InOut, true, 0, 300, true);

    this.game.sound.mute = true;
    this.audioFx = this.game.add.audio('playSfx');
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.pregameGlitch(function(){
        this.game.state.start('play');
      });
    }
  },
  pregameGlitch: function(done){
    var colors = ['#61e1e9','#967750','#584635'],
        timer = this.game.time.create(false),
        eventCount = 0;
    this.audioFx.play();
    var execEvent = function(){
      this.game.stage.backgroundColor = this.game.rnd.pick(colors);
      eventCount++;
      if (eventCount < 15){
        timer.add(this.game.rnd.integerInRange(50, 150), execEvent, this);
      }
      else {
        timer.stop();
        done.call(this);
      }
    };

    timer.loop(this.game.rnd.integerInRange(50, 150), execEvent, this);
    timer.start();
  }
};

module.exports = Menu;
