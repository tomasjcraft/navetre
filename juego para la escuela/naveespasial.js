var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("espacio.png");
  boyImg = loadImage("nave_espacial_activada.png");
  cashImg = loadImage("moneda.png");
  diamondsImg = loadImage("pordos.png");
  jwelleryImg = loadImage("por3.png");
  swordImg = loadImage("meteorito.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
//crear el canvas y ajustar el tamaño de la ventana para que sea compatible con el dispositivo 
canvas = createCanvas(1000,800);
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//crear sprite boy corriendo
boy = createSprite(width/2,height-70,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=2.0;
  
//suelo.y=suelo.width/2
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();


boy.setCollider("circle",0,0,20)
boy.debug=false


}

function draw() {


  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;

  if (path.y>1000){

    path.y=path.width/2

  } 
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para reiniciar el fondo

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  if (path){

  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Dinero: "+ treasureCollection,width-150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
   //Modificar las posiciones del dinero 
    var cash = createSprite(Math.round(random(50, 950),40, 20, 20));
    cash.addImage(cashImg);
  cash.scale=1.0;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
       // Modificar las posiciones de los diamantes 

    var diamonds = createSprite(Math.round(random(50, 950),40, 20, 20));
    diamonds.addImage(diamondsImg);
  diamonds.scale=1.0;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    //Modificar las posiciones de las joyas para hacerlas aparecer en el tamaño de pantaña disponible.

    var jwellery = createSprite(Math.round(random(50, 950),40, 20, 20));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=1.0;                                                                                                                                                                                                                                                                                                                                                                      ;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 50 == 0) {
    //Modificar las prosiciones de la espada para hacerla aparecer en el tamaño de pantaña disponible. 

    var sword = createSprite(Math.round(random(50, 950),40, 20, 20));
    sword.addImage(swordImg);
  sword.scale=1.0;
  sword.velocityY = 6;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}
