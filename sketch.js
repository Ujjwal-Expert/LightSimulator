var object;
var mirror;
var image;

var focalLength = -80;

var mirrorDistance = 500;

var objectDistance = -300;
var objectHeight = 50;

var imageDistance;
var imageHeight=5;

var tetha;
var t;
var aperture=100;

var fInput;
var uInput;


function setup() {
  createCanvas(800,400);

  object = createSprite(mirrorDistance + objectDistance, 200, 5, objectHeight);
  object.shapeColor = 'orange';

  image = createSprite(mirrorDistance - objectDistance,200,5,objectHeight);
  image.shapeColor = 'red';

  fInput = createInput('');
  fInput.position(20,410);
  fInput.size(50);
  fButton = createButton('f');
  fButton.position(78,410);
  fButton.mousePressed(updatef);

  uInput = createInput('');
  uInput.position(20,430);
  uInput.size(50);
  uButton = createButton('u');
  uButton.position(75,430);
  uButton.mousePressed(updateu);
  
}

function draw() {
  background(230);

  imageDistance = 1/((1/focalLength) - (1/objectDistance));
  object.x =  mirrorDistance + objectDistance;
  image.x =  mirrorDistance + imageDistance;

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

  arrowControll();

  push();
  fill('#ee0000');
  text('u='+objectDistance,5,15);
  text('v='+imageDistance,5,30);
  text('f='+focalLength,5,45);
  text('objectH='+objectHeight,5,60);
  text('imageH='+imageHeight,5,75);
  pop();




  push();
  stroke('green')
  strokeWeight(3);
  line(mirrorDistance+focalLength,195,mirrorDistance+focalLength,205);
  line(mirrorDistance+2*focalLength,195,mirrorDistance+2*focalLength,205);
  pop();
  push();
  fill('green');
  textSize(15);
  text('C',mirrorDistance+2*focalLength-5,220);
  text('F',mirrorDistance+focalLength-3,220);
  pop();

  

  if(focalLength<=-(aperture/2)){
    t = asin((aperture)/(-(focalLength*2)));
  }
  else if(focalLength>=(aperture/2)){
    t = 180 -(asin((aperture)/(focalLength*2)));
  }
  else{
    t = 90;
  }

  push();
  noFill();
  stroke('#55e0e8');
  strokeWeight(5);
  if(focalLength>=-999999&&focalLength<0){

    arc(mirrorDistance+2*focalLength,200,-4*(focalLength),-4*(focalLength),360-t,t);
    //console.log('skjdfksjdflsjdflsjkdf')

  }else if(focalLength<=999999&&focalLength>0){

    arc(mirrorDistance+2*focalLength,200,-4*(focalLength),-4*(focalLength),t,360-t);

  }else if(focalLength<-999999 || focalLength > 999999){
    line(mirrorDistance,50,mirrorDistance,350);
  }
  
  pop();




  textSize(20);
  text('Use arrow keys to change position of Object',50,350);
  text('Use "a" and "d" to change focal length of mirror',45,380);

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
      objectDistance+=2;
    }
  }
  if(keyIsDown(LEFT_ARROW)){
    objectDistance-=2;
  }
  if(keyIsDown(65)){
    focalLength-=1;
  }
  if(keyIsDown(68)){
    focalLength+=1;
  }
}


function updatef(){
  focalLength = 1*fInput.value();
}

function updateu(){
  if(uInput.value()<0){
    objectDistance = 1*uInput.value();
  }
  
}