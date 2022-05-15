var object;
var mirror;
var image;

var focalLength = -100;

var objectDistance = -300;
var objectHeight = 50;

var imageDistance;
var imageHeight=5;


function setup() {
  createCanvas(800,400);

  mirror = createSprite(500,200,8,300);
  mirror.shapeColor = '#55e0e8';

  object = createSprite(mirror.x + objectDistance, 200, 5, objectHeight);
  object.shapeColor = 'orange';

  image = createSprite(mirror.x - objectDistance,200,5,objectHeight);
  image.shapeColor = 'red';

  
}

function draw() {
  background(200);

  imageDistance = 1/((1/focalLength) - (1/objectDistance));
  object.x =  mirror.x + objectDistance;
  image.x =  mirror.x + imageDistance;

  imageHeight = -(imageDistance*objectHeight/objectDistance);
  if(imageHeight>0){
    image.height = imageHeight;
  }
  else if (imageHeight<0){
    image.height = -imageHeight;
  }
  else if(imageHeight===0){
    image.height = imageHeight;
  }
  
  image.y = 200 - imageHeight/2;
  object.y = 200 - objectHeight/2;

  //objectDistance+=1;
  arrowControll();



  text('u:'+objectDistance,5,15);
  text('v:'+imageDistance,5,30);
  text('f:'+focalLength,5,45);
  push();
  stroke('green')
  strokeWeight(3);
  line(mirror.x+focalLength,195,mirror.x+focalLength,205);
  line(mirror.x+2*focalLength,195,mirror.x+2*focalLength,205);
  pop();
  push();
  fill('green');
  textSize(15);
  text('C',mirror.x+2*focalLength-5,220);
  text('F',mirror.x+focalLength-3,220);
  pop();

  textSize(20);
  text('Use arrow keys to change position of Object',50,350);

  drawDottedLine();
  
  
  drawSprites();
}


function drawDottedLine(){
  for(var i=0;i<800;i+=20){
    line(i,200,i+10,200);
  }
}

function arrowControll(){
  if(objectDistance<0){
    if(keyIsDown(RIGHT_ARROW)){
      objectDistance+=1;
    }
  }
  if(keyIsDown(LEFT_ARROW)){
    objectDistance-=1;
  }
}