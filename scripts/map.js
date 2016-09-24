'use strict';

class LevelMap {
	constructor (context, backgroundSrc = null, collisions = null) {
    this.ctx = context;
    this.player = undefined;
    this.pull = new Array();
    this.staticObjects = new Array();
    this.mapArray = new Array(15).fill(new Array(30).fill(0));
    this.playerScore = 0;
    this.renderStep = 0;
    this.background = new Image();
    this.background.src = backgroundSrc;
  }

  get score() {
    return this.playerScore;
  }

  get context() {
    return this.ctx;
  }

  get getBackground() {
    return this.background;
  }

  get mapInArray() {
    return this.mapArray;
  }

  set mapInArray(arr) {
    this.mapArray = arr;
    for (let i = 0; i < this.mapArray.length; i++) {
      let ctx = this.context;

      for (let j = 0; j < this.mapArray[i].length; j++) {
        if (this.mapArray[i][j] === 1) {
          ctx.fillStyle = 'black';
          ctx.fillRect(j * 32, i * 32, 32, 32);
        }
      }
    }
  }

  addPlayer(unit) {
    this.pull.unshift(unit);
  }

  start() {
    this.context.drawImage(this.background, 0, 0);
    // this.render();
  }

  addUnit(unit) {
    this.pull.push(unit);
  }

  deleteUnit(unit) {
    console.log('deleting');
    this.pull = this.pull.filter((item) => item != unit);
  }

  addStaticObject(unit) {
    this.staticObjects.push(unit);
  }

  unitRender() {

  }

  isFooViewBar(foo, bar) {
    let [xVector, yVector] = [bar.getX - foo.getX, bar.getY - foo.getY];
    let vectorLength = (xVector ** 2 + yVector ** 2) ** 0.5;

    let bufAngle = Math.acos(xVector / vectorLength) * 180 / Math.PI;
    let playerAngle = foo.getAngle;
    let angle = yVector >= 0 ? bufAngle : (360 - bufAngle) % 360;

    angle += 90;
    angle %= 360;

    let bigAngle = angle > playerAngle ? angle : playerAngle;
    let littleAngle = angle <= playerAngle ? angle : playerAngle;
    
    return (bigAngle - littleAngle <= 90 || bigAngle - littleAngle >= 270);
  }

  checkController(player) {
    if (this.pull.length > 0) {
      if (Key.isDown(Key.UP)) player.moveUp();
      if (Key.isDown(Key.LEFT)) player.turnLeft();
      if (Key.isDown(Key.DOWN)) player.moveDown();
      if (Key.isDown(Key.RIGHT)) player.turnRight();

      player.render();
    }
  }

  clear() {
    //clear all items
    for (let i = 0 ; i < this.pull.length; i++) {
      let item = this.pull[i]; 
      if (item !== undefined) {
        item.clear();
      }
    }    
  }

  render() {
    // magic about background render
    if (this.renderStep === 0) {
      this.context.drawImage(this.background, 0, 0);
    }
    
    this.clear();

    //player controller
    this.player = this.pull[0];
    let player = this.player;
    player.visible = false;
    // player.consoleCoordinats();


    //check collisions and render ability of all other units
    for (let i = 1; i < this.pull.length; i++) {
      let item = this.pull[i];
      item.moveRandom();

      if (item !== undefined) {
        //delete item if player(angel) touch this
        if (item.isTouched(player)) {
          this.deleteUnit(item);
          this.playerScore ++;
        }
        
        //check units visible
        let obstacles = 0;

        let minX = item.getX <= player.getX ? item.getX : player.getX;
        let maxX = item.getX > player.getX ? item.getX : player.getX;
        let minY = item.getY <= player.getY ? item.getY : player.getY;
        let maxY = item.getY > player.getY ? item.getY : player.getY;

        if (Math.abs(maxX - minX) < 8) {
          let checkingXCell = Math.floor(minX / 32);

          for (let i = minY; i < maxY; i++) {
            let checkingYCell = Math.floor(i / 32);

            if (this.mapArray[checkingYCell][checkingXCell] === 1) {
              obstacles = 1;
              break;
            }
          }
        } else {
          for (let i = minX; i < maxX; i += (maxX - minX) < 32 ? 1 : 4) {
            let checkingXCell = Math.floor(i / 32);
            let checkingYCell = Math.floor((minY + (i - minX) * (maxY - minY) / (maxX - minX)) / 32);
  
            if (this.mapArray[checkingYCell][checkingXCell] === 1) {
              obstacles = 1;
              break;
            }
          }
        }
        
        if (obstacles === 0) {
          // let angle = player.getAngle;
          
          if (this.isFooViewBar(player, item)) {
            item.render();
          } else {
            item.updatePosition();
            item.endUpdatePosition();
          }
          
          if (this.isFooViewBar(item, player)) {
            player.visible = true;
          } 
        } else {
          // smt?
          item.updatePosition();
          item.endUpdatePosition();
        }
      }
    }
    if (player.isVisible === false) {
      this.checkController(player);
    } else {
      player.render();
    }

    this.renderStep++;
  }
}
