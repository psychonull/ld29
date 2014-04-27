'use strict';

var Rail = function(game, map) {
  Phaser.Group.call(this, game);

  this.max = 17;
  this.railsPool = this.game.add.group();
  this.add(this.railsPool);

  this.obstaclesPool = {};
  
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
    this.railsPool.add(rail);

    if(map[i]){
      this.addObstacle(map, i);
    }
    
  }

};

Rail.prototype.regenerate = function(map, from){
  
  for(var i = from; i < from + this.max; i++){
      
    var rail = this.railsPool.getFirstDead();

    if (rail){
      rail.revive();
      rail.reset(i * 50, 0);
    }
    else {
      var rail = this.game.add.sprite(i * 50, 0, 'env', 'rail');
      rail.checkWorldBounds = true;
      rail.outOfBoundsKill = true;
      this.railsPool.add(rail);        
    }
    if(map[i]){
      this.addObstacle(map, i);
    }

  }

};

Rail.prototype.getCartY = function(){
  return this.y + this.parent.y + 50 - 10;
};

Rail.prototype.addObstacle = function(map, i){
  var obstacleName = 'cart';
  var pool = this.getObstaclePool(obstacleName);
  var obstacle = pool.getFirstDead();
  if(obstacle){
    obstacle.revive();
    obstacle.reset(i * 50, 20);
  }
  else {
    obstacle = this.game.add.sprite(i * 50, 20, obstacleName);
    obstacle.checkWorldBounds = true;
    obstacle.outOfBoundsKill = true;
    pool.add(obstacle);
  }
  obstacle.bringToTop();
};

Rail.prototype.getObstaclePool = function(obstacleName){
  if(!this.obstaclesPool[obstacleName]){
    this.obstaclesPool[obstacleName] = this.game.add.group();
    this.add(this.obstaclesPool[obstacleName]);
  }
  return this.obstaclesPool[obstacleName];
};

module.exports = Rail;
