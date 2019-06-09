var chose = [1, -1, 0, 0, 0, 0, 0];
var typeOfTypes = [0, 1, 2, 3, 4];
var colors = [];
var types = [];
types[0] = [[0, 2, 0], [0, 1, 0], [0, -1, 0], [0, -2, 0]];
types[1] = [[1, 0, 0], [0, 0, -1], [1, 0, -1], [1, 1, 0], [0, 1, -1], [1, 1, -1], [0, 1, 0]];
types[2] = [[1, 0, 0], [0, -1, 0], [0, -2, 0]];
types[3] = [[1, 0, 0], [0, -1, 0], [-1, -1, 0]];
types[4] = [[1, 0, 0], [-1, 0, 0], [0, -1, 0]];
var ship;
var timer = 0;
var world = [];
var timerMax = 30;


function setup()  {
  createCanvas(600, 600, WEBGL);
  colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0), color(255, 0, 255), color(0, 255, 255), color(255, 153, 51)];
  frameRate(30);
  ship = new Ship(3, random(colors));
  for(var i = 0; i < 11; i++) {
    for(var j = 0; j < 11; j++) {
      world[i * 11 + j] = new Block((i-5)*height/30, height/3, (j-5)*height/30, color(200, 200, 200));
    }
  }
}

function draw() {
  background(0);
  ambientLight(255);
  camera(width/2, -height/2, width/2, 0, 0, 0, 0, 1, 0);
  //rotateY(map(mouseX, 0, width, -HALF_PI, HALF_PI));
  //rotateX(map(mouseY, 0, height, HALF_PI, -HALF_PI));
  if(timer == timerMax)  {
    for(var i = 0; i < world.length; i++) {
      if(ship.collision(world[i]))  {
        world.push(new Block(ship.xCenter, ship.yCenter, ship.zCenter, ship.color));
        for(var j = 0; j < ship.blocks.length; j++)
        world.push(ship.blocks[j]);
        ship = new Ship(random(typeOfTypes), random(colors)); //poi rendilo = a ship preparatoria!
        timerMax = 30;
        break;
      }
      lineBreak();
    }
    ship.move();
    timer = 0;
  } else {
    timer++;
  }
  ship.show();
  for(var i = 0; i < world.length; i++)
    world[i].show();
}

function keyPressed() {
  if(keyCode == 38)
    ship.shift(1);
  if(keyCode == 37)
    ship.shift(2);
  if(keyCode == 40)
    ship.shift(3);
  if(keyCode == 39)
    ship.shift(4);
  if(keyCode == 68)
    ship.Xrotate();
  if(keyCode == 87)
    ship.Yrotate();
  if(keyCode == 65)
    ship.Zrotate();
  if(keyCode == 32) {
    timerMax = 3;
    timer = 0;
  }
}

function lineBreak() {
  var line = [];
  for(var i = 121; i < world.length; i++)  {
    var index = world[i].y - height/3;
    if(line[index] == undefined)
      line[index] = 1;
    else
      line[index] += 1;
  }
  for(var i = 0; i < line.length; i++)  {
    if(line[i] >= 121) {
    for(var j = world.length - 1; j >= 0; j--)  {
      if(world[j].y < i + height/3)
        world[i].y += world[i].dim;
      if(world[j].y == i + height/3)
        world.splice(j, 1);
      }
    }
  }
}
