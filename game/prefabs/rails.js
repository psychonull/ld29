'use strict';
var Rail = require('./rail');

var Rails = function(game, map) {
  this.map = map;
  Phaser.Group.call(this, game);
  

  this.lastGenerated = 0;
  this.facing = 1;
  this.y = 270;
  this.x = 350;
  
  this.lastViewX = -1;
  this.lastPos = { from:-1, to: -1};
  this.lastGen = { from:-1, to: -1};

  this.generateRails(map);
};

Rails.prototype = Object.create(Phaser.Group.prototype);
Rails.prototype.constructor = Rails;

Rails.RAILS_SEPARATION = 50;
Rails.RAILS_COUNT = 4;

Rails.prototype.update = function() {
  if(typeof this.lastGenerated === 'undefined'){
    this.lastGenerated = 0;
  }

  if (this.game.camera.view.x !== this.lastViewX){
    this.lastViewX = this.game.camera.view.x;

    var nextCamRails = this.nextCameraViewToRails(this.game.camera.view);
    if (nextCamRails.from !== this.lastPos.from || nextCamRails.to !== this.lastPos.to){
      this.lastPos = {
        from: nextCamRails.from,
        to: nextCamRails.to
      };

      if(this.facing === 1){
        if(this.lastGenerated < nextCamRails.to && this.lastGenerated !== this.map[0].length){
          if(nextCamRails.to > this.map[0].length){
            this.generateRails(this.map, this.map[0].length);
          }
          else{
            this.generateRails(this.map,nextCamRails.to);
          }
        }
      }
      else if(this.facing === -1){
        if(this.lastGenerated > nextCamRails.from && this.lastGenerated >= 0){
          if(nextCamRails.from < 0){
            this.generateRails(this.map, 0);
          }
          else{
            this.generateRails(this.map, nextCamRails.from);
          }
        }
      }

    }

  }
};

Rails.prototype.generateRails = function(map, to){

  if (this.lastGenerated !== this.lastGen.from || to !== this.lastGen.to){
    this.lastGen = {
      from: this.lastGenerated,
      to: to
    };

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
  }
};

Rails.prototype.getLast = function(){
  return this.children[this.length - 1];
};

Rails.prototype.setFacing = function(facing){
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

Rails.prototype.getEstimatedWidth = function(){
  return this.map[0].length * 50;
};

module.exports = Rails;