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

// let box0 = new Square(firstLevel, 40, 200);
// let box1 = new Square(firstLevel, 160, 100, 32, 64);
// let box2 = new Square(firstLevel, 700, 160);
// let box3 = new Square(firstLevel, 400, 16, 32, 800);

// let box = new Square(firstLevel, 400, 400, 40, 20);

let hero = new Unit(firstLevel, 'sprites/angel.png', 100, 100, 3);
hero.animations = 'sprites/angelrun.png';
let Amy = new Unit(firstLevel, 'sprites/man.png', 520, 100, 2);
let Rory = new Unit(firstLevel, 'sprites/man.png', 640, 100, 2);
let Doctor = new Unit(firstLevel, 'sprites/man.png', 100, 300, 2);
let Man1 = new Unit(firstLevel, 'sprites/man.png', 200, 320);
let Man2 = new Unit(firstLevel, 'sprites/man.png', 545, 365);

// game loop

firstLevel.addUnit(hero);
// firstLevel.start();
firstLevel.addUnit(Amy);
firstLevel.addUnit(Rory);
firstLevel.addUnit(Doctor);
firstLevel.addUnit(Man1);
firstLevel.addUnit(Man2);

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


// firstLevel.start();
let goalLabel = document.getElementById('goal');

let gameLoop = setInterval(() => {
  firstLevel.render();
  if (firstLevel.score === 5) {
    clearInterval(gameLoop);
    goalLabel.style.color = 'red';
    goalLabel.innerHTML = 'You\'re winner';
    console.log('You\'re winner');
  } else if (firstLevel.score === -1) {
    clearInterval(gameLoop);
    goalLabel.innerHTML = 'You\'re loser';
    console.log('You\'re loser');
  }
}, 16);

// setTimeout(() => {
//   clearInterval(gameLoop);
// }, 3000);
