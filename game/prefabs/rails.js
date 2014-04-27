'use strict';
var Rail = require('./rail');

var Rails = function(game, map) {
  this.map = map;
  Phaser.Group.call(this, game);
  

  this.lastGenerated = 0;
  this.facing = 1;
  this.y = 270;
  
  this.generateRails(map);
};

Rails.prototype = Object.create(Phaser.Group.prototype);
Rails.prototype.constructor = Rails;

Rails.RAILS_SEPARATION = 50;
Rails.RAILS_COUNT = 4;

Rails.prototype.update = function() {
  var OFFSET_GEN = 0;
  if(typeof this.lastGenerated === 'undefined'){
    this.lastGenerated = 0;
  }
  var nextCamRails = this.nextCameraViewToRails(this.game.camera.view);
  if(this.facing === 1){
    if(this.lastGenerated < nextCamRails.to && this.lastGenerated !== this.map[0].length){
      if(nextCamRails.to > this.map[0].length){
        this.generateRails(this.map, this.lastGenerated, this.map[0].length);
      }
      else{
        this.generateRails(this.map, this.lastGenerated,nextCamRails.to + OFFSET_GEN);
      }
    }
  }
  else if(this.facing === -1){
    if(this.lastGenerated > nextCamRails.from && this.lastGenerated !== 0){
      if(nextCamRails.from < 0){
        this.generateRails(this.map, this.lastGenerated, 0);
      }
      else{
        this.generateRails(this.map, this.lastGenerated, nextCamRails.from - OFFSET_GEN);
      }
    }
  }
};

Rails.prototype.generateRails = function(map, from, to){
  for(var i = 0; i < Rails.RAILS_COUNT; i++){
    if (this.children[i]){
      this.children[i].regenerate2(map[i], this.lastGenerated, to);
    }
    else {
      var rail = new Rail(this.game, map[i]);
      rail.y = i * Rails.RAILS_SEPARATION;
      this.add(rail);
    }
  }
  this.lastGenerated = to;
};

Rails.prototype.getLast = function(){
  return this.children[this.length - 1];
};

Rails.prototype.setFacing = function(facing){
  console.log(this.lastIndex);
  this.lastIndex += 0;
  this.facing = facing;
};

Rails.prototype.getObstacleGroups = function(){
  var obstacles = [];
  for(var i = 0; i < this.children.length; i++){
    var child = this.children[i];
    for(var obsName in child.obstaclesPool){
      obstacles.push(child.obstaclesPool[obsName].children);
    }
  } 

  return obstacles;
};

Rails.prototype.cameraViewToRails = function(view){
  var spriteWidth = 50;
  var starting = view.x / 50;
  var ending = starting + (view.width / 50);
  return {
    from: starting,
    to: ending
  };
};

Rails.prototype.nextCameraViewToRails = function(view){
  var spriteWidth = 50;
  var cameraTiles = Math.round(view.width / 50);
  var starting = Math.round(view.x / 50);
  var ending = starting + (cameraTiles);
  return {
    from: starting + cameraTiles * this.facing,
    to: ending + cameraTiles * this.facing
  };
};

module.exports = Rails;