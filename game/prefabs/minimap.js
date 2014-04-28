'use strict';

var Minimap = function(game) {
  Phaser.Group.call(this, game);

  this.x = this.game.width * 0.35;
  this.y = 7;

  this.minimap = this.game.add.tileSprite(0, 0, 300, 15, 'envFront', 'bg');
  this.add(this.minimap);
  this.overlay = this.game.add.tileSprite(0, 0, 300, 15, 'envFront', 'surfaceTop');
  this.add(this.overlay);

  this.minimapCart = this.game.add.sprite(-20, -15, 'cart');
  this.minimapCart.scale.x = 0.45;
  this.minimapCart.scale.y = 0.45;
  this.add(this.minimapCart);
  this.setPosition(0);
};

Minimap.prototype = Object.create(Phaser.Group.prototype);
Minimap.prototype.constructor = Minimap;

Minimap.prototype.update = function() {
};

Minimap.prototype.setPosition = function(pos){
	var width = this.minimap.width;
	var newPos = width * pos;
  	this.overlay.width = newPos;

	this.minimapCart.x =  newPos - 20;
};

Minimap.prototype.updateProgress = function(cart, rails){
	var elapsed = (cart.x - rails.x);
	var percentage = elapsed / rails.getEstimatedWidth(); 
	this.setPosition(percentage);
};


module.exports = Minimap;
