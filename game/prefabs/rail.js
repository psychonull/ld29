'use strict';

var Rail = function(game, map) {
  Phaser.Group.call(this, game);

  this.max = 17;
  this.generateRail(map);
};

Rail.prototype = Object.create(Phaser.Group.prototype);
Rail.prototype.constructor = Rail;

Rail.prototype.update = function() {
  
};

Rail.prototype.generateRail = function(map){

  for(var i = 0; i < this.max; i++){

    var rail = this.game.add.sprite(i * 50, 0, 'env', 'rail');
    rail.anchor.setTo(0.5, 0);
    this.add(rail);

    /*
    if(map[i]){
      var obstacle = this.game.add.sprite(i * 50, 20, 'cart');
      obstacle.checkWorldBounds = true;
      obstacle.outOfBoundsKill = true;
      this.add(obstacle);
    }
    */
  }

};

Rail.prototype.regenerate = function(map, from, j){
  
  for(var i = from; i < from + this.max; i++){
      
    var rail = this.getFirstDead();

    if (rail){
      rail.revive();
      rail.reset(i * 50, 0);
      continue;
    }
    else {

      var rail = this.game.add.sprite(i * 50, 0, 'env', 'rail');
      rail.checkWorldBounds = true;
      rail.outOfBoundsKill = true;
      this.add(rail);        
    }
  }

};

Rail.prototype.getCartY = function(){
  return this.y + this.parent.y + 50 - 10;
};

module.exports = Rail;
