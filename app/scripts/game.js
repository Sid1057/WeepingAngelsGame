/* jshint browser: true */
'use strict';

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

let firstLevel = new LevelMap(ctx, 'sprites/map.png');
firstLevel.mapInArray = 
[
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

class Game {
  constructor(levels, fps = 60) {
    this.levels = levels;
    this.frameTime = 16;
    this.leftColumn = document.getElementById('left-column');
    this.rightColumn = document.getElementById('right-column');
    this.currentLevel = this.levels;
    this.previousScore = -1;
    this.lastStepComplete = true;
  }  

  start() {
    // this.currentLevel.fullRender();
  }

  get currentScore() {
    return this.currentLevel.score;
  }

  sendMessage(msg, color = 'red') {
    this.leftColumn.style.color = color;
    this.leftColumn.innerHTML = msg;
    console.log(msg);
  }

  gameLoop() {
    let gameLoopVar = setInterval(() => {
      this.currentLevel.render();
      if (this.currentScore != this.previousScore) {
        game.sendMessage(`Goal:<br>Find ${5 - game.currentScore} man(s) on the map and touch to kill them.<br>\
                  You can not move when mans see you`, 'grey');
        this.previousScore = this.currentScore;
      }
      if (this.currentLevel.score === 5) {
        clearInterval(gameLoopVar);
        this.sendMessage('Win');
      } else if (this.currentLevel.score === -1) {
        clearInterval(gameLoopVar);
        this.sendMessage('Lose');
      }
    }, this.frameTime);
  }
}

let hero = new Unit(firstLevel, 'sprites/angel.png', 100, 100, 3);
hero.animations = 'sprites/angelrun.png';
let Amy = new Unit(firstLevel, 'sprites/man.png', 520, 100, 2);
let Rory = new Unit(firstLevel, 'sprites/man.png', 640, 100, 2);
let Doctor = new Unit(firstLevel, 'sprites/man.png', 100, 300, 2);
let Man1 = new Unit(firstLevel, 'sprites/man.png', 200, 320);
let Man2 = new Unit(firstLevel, 'sprites/man.png', 545, 365);

// game loop

firstLevel.addUnit(hero);
firstLevel.addUnit(Amy);
firstLevel.addUnit(Rory);
firstLevel.addUnit(Doctor);
firstLevel.addUnit(Man1);
firstLevel.addUnit(Man2);

firstLevel.start();

let rnd = Math.floor(Math.random() * 4);
Amy.turnRight(rnd * 90);
rnd = Math.floor(Math.random() * 4);
Rory.turnRight(rnd * 90);
rnd = Math.floor(Math.random() * 4);
Doctor.turnRight(rnd * 90);
rnd = Math.floor(Math.random() * 4);
Man1.turnRight(rnd * 90);
rnd = Math.floor(Math.random() * 4);
Man2.turnRight(rnd * 90);


firstLevel.start();

let game = new Game(firstLevel);
game.sendMessage(`Goal:<br>Find ${5 - game.currentScore} mans on the map and touch to kill them.<br>\
                  You can\'t move when mans see you`, 'grey');
game.start();
game.gameLoop();