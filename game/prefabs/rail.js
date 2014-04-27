'use strict';
var Obstacle = require('./obstacle');

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
  /*
  for(var obsName in this.obstaclesPool){
    var obstacles = this.obstaclesPool[obsName].children;
    for(var i = 0; i < obstacles.length; i++){
      this.game.debug.body(obstacles[i]);
    }
  }
  */
};

Rail.prototype.generateRail = function(map){
  this.regenerate2(map, 0, this.max);
};

Rail.prototype.doRegenerate = function(map, i ){
    
  var rail = this.railsPool.getFirstDead();

  if (rail){
    rail.revive();
    console.log('HOLY revive');
    rail.reset(i * 50, 0);
  }
  else {
    var rail = this.game.add.sprite(i * 50, 0, 'env', 'rail');
    rail.checkWorldBounds = true;
    rail.outOfBoundsKill = true;
    console.warn('FKIN REGENERATE');
    rail.anchor.setTo(0.5, 0);
    this.railsPool.add(rail);        
  }
  if(map[i]){
    this.addObstacle(map, i);
  }

};

Rail.prototype.regenerate2= function(map, from, to){
  if (from < to){
    for(var i = from; i < to; i ++){
      this.doRegenerate(map, i);
    }
  }
  else {
    for(var i = from; i > to; i --){
      this.doRegenerate(map, i);
    }
  }
};

Rail.prototype.regenerate = function(map, from, facing){
  if (facing === 1){
    for(var i = from; i < from + this.max; i ++){
      this.doRegenerate(map, i);
    }
  }
  else {
    for(var i = from; i > from - this.max; i--){
      this.doRegenerate(map, i);
    }
  };
/*
  for(var i = from; i < from + this.max; i += facing){
    
    var rail = this.railsPool.getFirstDead();

    if (rail){
      rail.revive();
      //console.log('revive');
      rail.reset(i * 50, 0);
    }
    else {
      var rail = this.game.add.sprite(i * 50, 0, 'env', 'rail');
      rail.checkWorldBounds = true;
      rail.outOfBoundsKill = true;
      //console.warn('FKIN REGENERATE');
      this.railsPool.add(rail);        
    }
    if(map[i]){
      this.addObstacle(map, i);
    }

  }
*/
};

Rail.prototype.getCartY = function(){
  return this.y + this.parent.y + 50 - 10;
};

Rail.prototype.addObstacle = function(map, i){
  var obstacleId = map[i];
  var pool = this.getObstaclePool(obstacleId);
  var obstacle = pool.getFirstDead();

  if(obstacle){
    obstacle.revive();
    obstacle.reset(i * 50, 0);
  }
  else {
    obstacle = new Obstacle(this.game, i * 50, 0, obstacleId);
    obstacle.anchor.setTo(0.5, 0);

    this.game.physics.enable(obstacle, Phaser.Physics.ARCADE);
    obstacle.body.immovable = true;
    obstacle.body.setSize(35, 30, 0, 30);

    pool.add(obstacle);
  }
  
};

Rail.prototype.getObstaclePool = function(obstacleName){
  if(!this.obstaclesPool[obstacleName]){
    this.obstaclesPool[obstacleName] = this.game.add.group();
    this.obstaclesPool[obstacleName].enableBody = true;
    this.obstaclesPool[obstacleName].physicsBodyType = Phaser.Physics.ARCADE;
    this.add(this.obstaclesPool[obstacleName]);
  }
  return this.obstaclesPool[obstacleName];
};

module.exports = Rail;
