'use strict';

var Rail = function(game, map) {
  Phaser.Group.call(this, game);

  // initialize your prefab here
  this.generateRail(map);

};

Rail.prototype = Object.create(Phaser.Group.prototype);
Rail.prototype.constructor = Rail;

Rail.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Rail.prototype.generateRail = function(map){
  if(!map){
    for(var i = 0; i < 100; i++){
      this.add(this.game.add.tileSprite(i * 50, 0, 80, 80, 'env'));
    }
  }
  else {
    for(var i = 0; i < map.length; i++){
      if(map[i]){
        this.add(this.game.add.tileSprite(i * 50, 0, 80, 80, 'env'));
        var obstacle = this.game.add.sprite(i * 50, 20, 'cart');
        this.add(obstacle);
      }
      else {
        this.add(this.game.add.tileSprite(i * 50, 0, 80, 80, 'env'));
      }
    }
  }
};

Rail.prototype.getCartY = function(){
  return this.y + this.parent.y + 50 - 10;
};

module.exports = Rail;
