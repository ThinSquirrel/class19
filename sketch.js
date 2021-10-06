var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);
  
  if (gameState === "play"){
    
    if(tower.y > 400){
      tower.y = 300
    }

    createdoor();

    if(keyDown("space")){

      ghost.velocityY -= 5;
    }
    
    ghost.velocityY += 1;

    if(keyDown("left")){

      ghost.x = ghost.x -3
    }

    if(keyDown("right")){

      ghost.x = ghost.x +3
  
    }

    if(climbersGroup.isTouching(ghost)){

      ghost.velocityY = 0
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){

      ghost.destroy();
      gameState = "end"

    }

    drawSprites();
  }

  if(gameState === "end"){

    stroke("red");
    fill("red");
    textSize(30);
    text("Game over",230,250)
  }

  
}

function createdoor(){

  if(frameCount % 240 === 0){

    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);
    door.x = Math.round(random(120,400));

    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    climber.x = door.x;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(200,15);
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true;
    ghost.depth = door.depth
    ghost.depth += 1
  }
}