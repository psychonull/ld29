'use strict';

var Beginning = function(game, state) {
  Phaser.Group.call(this, game);

  this.add(this.game.add.image(0, 300, 'start', 'company_assets'));
  
  var txt1 = this.game.add.bitmapText(38, 317, 'minecraftia_white', 'COMPANY', 20);
  txt1.tint = 0x756632;
  this.add(txt1);

  var txt2 = this.game.add.bitmapText(44, 340, 'minecraftia_white', 'ASSETS', 20);
  txt2.tint = 0x756632;
  this.add(txt2);

  this.surplusGoldText = this.game.add.bitmapText(60, 420, 'minecraftia_white', state.surplusGold + '.00', 20);
  this.surplusGoldText.tint = 0x82780e;
  this.add(this.surplusGoldText);

  ///////////////////////////////////////////

  this.add(this.game.add.image(160, 150, 'start', 'freedom_sight'));
  
  var txt3 = this.game.add.bitmapText(180, 205, 'minecraftia_white', 'FREEDOM', 20);
  txt3.tint = 0x257a15;
  this.add(txt3);

  this.freedomGoldText = this.game.add.bitmapText(180, 240, 'minecraftia_white', state.freedomGold + '.00', 25);
  this.freedomGoldText.tint = 0x2fb914;
  this.add(this.freedomGoldText);
};

Beginning.prototype = Object.create(Phaser.Group.prototype);
Beginning.prototype.constructor = Beginning;

Beginning.prototype.update = function() {
};

module.exports = Beginning;
