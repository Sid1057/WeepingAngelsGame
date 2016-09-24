'use strict';

class gameObject {
  constructor(level, x = 0, y = 0, width = 32, height = 32) {
    this.level = level;
    this.context = level.context;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  get getX() {
    return this.x;
  }

  get getY() {
    return this.y;
  }

  get getWidth() {
    return this.width;
  }

  get getHeight() {
    return this.height;
  }

  get rightEnd() {
    return this.x + this.width / 2;
  }

  get leftEnd() {
    return this.x - this.width / 2;
  }

  get upEnd() {
    return this.y - this.height / 2;
  }

  get downEnd() {
    return this.y + this.height / 2;
  }
}

class Square extends gameObject {
  constructor(level, x = 0, y = 0, width = 32, height = 32) {
    super(level, x, y, width, height);
    this.shapeType = 'square';
  }

  render() {
    let ctx = this.context;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2,
                 this.width, this.height);
  }
}

class Circle extends gameObject {
  constructor(level, spriteSrc, x = 0, y = 0) {
    super(level, x, y, 16, 16);

    this.radius = 8;
    this.speed = 3;
    this.angle = 0;

    this.newX = x;
    this.newY = y;
    this.shouldUpdateX = true;
    this.shouldUpdateY = true;
    this.xObstacle = false;    
    this.yObstacle = false;    
    this.moved = false;

    this.image = new Image();
    this.image.src = spriteSrc;
    this.imageRun = new Image();
    this.imageRun.src = spriteSrc;

    this.shapeType = 'circle';
    // test
    this.time = 0;
  }

  get getAngle() {
    return this.angle;
  }

  get getRadius() {
    return this.radius;
  }

  get getMaxLength() {
    return this.radius * 2;
  }

  set animations(imageRunSrc) {
    this.imageRun.src = imageRunSrc;
  }

  checkObstacle(moveAngle = 0) {
    let mapArray = this.level.mapInArray;

    let currentXCell = Math.floor(this.newX / 32);
    let currentYCell = Math.floor(this.newY / 32);

    let angle = (360 + this.angle + moveAngle) % 360;
    let radius = this.radius;

    if (angle < 90 || angle > 270) { 
      // up
      let newYCell = Math.floor((this.newY - radius) / 32);
      if (mapArray[newYCell][currentXCell] === 1) {
        this.shouldUpdateY = false;
      }
    }
    if (angle > 90 && angle < 270) {
      // down
      let newYCell = Math.floor((this.newY + radius) / 32);
      if (mapArray[newYCell][currentXCell] === 1) {
        this.shouldUpdateY = false;
      }
    }
    if (angle > 0 && angle < 180) {
      // right
      let newXCell = Math.floor((this.newX + radius) / 32);
      if (mapArray[currentYCell][newXCell] === 1) {
        this.shouldUpdateX = false;
      }
    }
    if (angle > 180 && angle < 360) {
      // left
      let newXCell = Math.floor((this.newX - radius) / 32);
      if (mapArray[currentYCell][newXCell] === 1) {
        this.shouldUpdateX = false;
      }
    }
  }

  moveUp() {
    this.moved = true;
    this.newY = this.y - this.speed * Math.cos(Math.PI * this.angle / 180);
    this.newX = this.x + this.speed * Math.sin(Math.PI * this.angle / 180);
    this.checkObstacle();
  }

  moveDown() {
    this.moved = true;
    this.newY = this.y + this.speed * Math.cos(Math.PI * this.angle / 180);
    this.newX = this.x - this.speed * Math.sin(Math.PI * this.angle / 180);
    this.checkObstacle(180);
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  turnLeft() {
    this.angle += 355;
    this.angle %= 360;
    this.checkObstacle(this.angle);
  }

  turnRight(angle = 5) {
    this.angle += angle;
    this.angle %= 360;
    this.checkObstacle(this.angle);
  }

  get isXObstacle() {
    return this.xObstacle;
  }

  get isYObstacle() {
    return this.yObstacle;
  }

  consoleCoordinats() {
    console.log(this.x, this.y);
  }

  updatePosition() {
    if (this.shouldUpdateX === true) {
      this.x = this.newX;
      this.xObstacle = false;
    } else {
      this.newX = this.x;
      this.xObstacle = true;
    }
    if (this.shouldUpdateY === true) {
      this.y = this.newY;
      this.yObstacle = false;
    } else {
      this.newY = this.y;
      this.yObstacle = true;
    }
  }

  endUpdatePosition() {
    this.shouldUpdateX = true;
    this.shouldUpdateY = true;
    this.moved = false;
  }

  checkCollision() {
  }

  clear() {
    let ctx = this.context;

    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 180 * this.angle);

    let background = this.level.getBackground;

    ctx.rotate(-Math.PI / 180 * this.angle);
    ctx.translate(-this.x, -this.y);

    ctx.drawImage(background, this.x - 32, this.y - 32, 64, 64,
                  this.x - 32, this.y - 32, 64, 64);
  }

  render() {
    let ctx = this.context;
    // let radius = this.radius;
    this.updatePosition();

    ctx.beginPath();

    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 180 * this.angle);

    if (this.moved === true) {
      ctx.drawImage(this.imageRun, -this.radius, -this.radius);
    } else {
      ctx.drawImage(this.image, -this.radius, -this.radius);
    }

    ctx.rotate(-Math.PI / 180 * this.angle);
    ctx.translate(-this.x, -this.y);

    ctx.stroke();

    this.endUpdatePosition();
  }
}

class Unit extends Circle {
  constructor(level, spriteSrc, x = 0, y = 0, speed = 1) {
    super(level, spriteSrc, x, y);
    super.speed = speed;
    this.shapeType = 'Unit';
    this.visibility = false;
  }

  get isVisible() {
    return this.visibility;
  }

  set visible(boolValue) {
    this.visibility = boolValue;
  }

  stop() {
    this.shouldUpdateX = false;
    this.shouldUpdateY = false;
  }

  isTouched(item) {
    return (Math.abs(item.getX - this.getX) ** 2 + Math.abs(item.getY - this.getY) ** 2) < 
      (item.getRadius + this.getRadius) ** 2;
  }

  moveRandom() {
    // super.updatePosition();
    // super.checkObstacle();
    // console.log(rnd);
    if (super.isYObstacle === true && (super.getAngle === 0 || super.getAngle === 180)) {
      let rnd = Math.floor(Math.random() * 100);
      
      if (rnd > 51) {
        super.turnRight(90);
      } else if (rnd > 2) {
        super.turnRight(270);
      } else {
        super.turnRight(180);
      }
    } else if (super.isXObstacle === true && (super.getAngle === 90 || super.getAngle === 270)) {
      let rnd = Math.floor(Math.random() * 100);

      if (rnd > 51) {
        super.turnRight(90);
      } else if (rnd > 2) {
        super.turnRight(270);
      } else {
        super.turnRight(180);
      }    
    } else {
      let rnd = Math.floor(Math.random() * 1000);

      if (rnd < 5) {
        super.turnRight(90);
      } else if (rnd < 10) {
        super.turnRight(270);
      } else {
        super.moveUp();        
      }
    }
    // this.updatePosition();
  }
}
