
var PlayerStateManager = require('../utils/playerStateManager');

'use strict';

var Beginning = function(game, state) {
  Phaser.Group.call(this, game);

  //company assets
  var compAssets = this.game.add.image(0, 350, 'start', 'company_assets');
  compAssets.scale.x = 0.75;
  compAssets.scale.y = 0.75;
  this.add(compAssets);
  
  this.add(this.game.add.bitmapText(35, 365, 'minecraftia', 'COMPANY', 12));
  this.add(this.game.add.bitmapText(40, 380, 'minecraftia', 'ASSETS', 12));

  this.add(this.game.add.bitmapText(40, 440, 'minecraftia', window.formatNumber(state.surplusGold, 8), 16));

  //happiness on sale
  var saleX = 95;
  var saleY = 170;
  var sales = this.game.add.image(saleX, saleY, 'start', 'freedom_sight');
  sales.scale.x = 0.9;
  sales.scale.y = 0.9;
  this.add(sales);
  
  this.add(this.game.add.bitmapText(saleX + 62, saleY + 22, 'minecraftia', 'HAPPINESS', 14));
  this.add(this.game.add.bitmapText(saleX + 82, saleY + 42, 'minecraftia', 'ON SALE', 14));
  this.add(this.game.add.bitmapText(saleX + 62, saleY + 65, 'minecraftia', 
    window.formatNumber(PlayerStateManager.GOLD_REQUIRED_FOR_FREEDOM, 6), 20));

  //my savings
  var savingX = 350;
  var savingY = 160;
  var savings = this.game.add.image(savingX, savingY, 'start', 'savings_sight');
  savings.scale.x = 0.9;
  savings.scale.y = 0.75;
  this.add(savings);
  
  this.add(this.game.add.bitmapText(savingX + 12, savingY + 45, 'minecraftia', 'MY SAVINGS', 14));
  this.add(this.game.add.bitmapText(savingX + 15, savingY + 65, 'minecraftia', window.formatNumber(state.freedomGold, 6), 16));
};

Beginning.prototype = Object.create(Phaser.Group.prototype);
Beginning.prototype.constructor = Beginning;

Beginning.prototype.update = function() {

};

module.exports = Beginning;
