const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    //primer piso
    box1 = new Box(900,320,70,70);
    box2 = new Box(1120,320,70,70);
    pig1 = new Pig(1010, 350);
    log1 = new Log(1010,260,300, PI/2);

    //segundo piso
    box3 = new Box(900,240,70,70);
    box4 = new Box(1120,240,70,70);
    pig3 = new Pig(1010, 220);
    log2 = new Log(1010,180,300, PI/2);

    //tercer piso
    box5 = new Box(900,240,70,70);
    box6 = new Box(1120,240,70,70);
    pig4 = new Pig(1010, 220);
    log3 = new Log(1010,180,300, PI/2);

    //cuarto piso
    box7 = new Box(1010,160,70,70);
    log4 = new Log(960,120,150, PI/7);
    log5 = new Log(1070,120,150, -PI/7);


    //primer piso segundo edificio
    box8 = new Box(550,320,70,70);
    box9 = new Box(770,320,70,70);
    pig5 = new Pig(660, 350);
    log6 = new Log(660,260,300, PI/2);

    //segundo piso segundo edificio
    box10 = new Box(550,240,70,70);
    box11 = new Box(770,240,70,70);
    pig6 = new Pig(660, 220);
    log7 = new Log(660,180,300, PI/2);

    //tercer piso segundo edificio
    box12 = new Box(660,160,70,70);
    log8 = new Log(610,120,150, PI/7);
    log9 = new Log(720,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("( ͡❛ ‿‿ ͡❛)\n\nScore: " + score, width-1180, 100)
    
    Engine.update(engine);
    //strokeWeight(4);
    ground.display();

    //primer piso
    box1.display();
    box2.display();
    pig1.display();
    pig1.score();
    log1.display();

    //segundo piso
    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log2.display();

    //tercer piso
    box5.display();
    box6.display();
    pig4.display();
    pig4.score();
    log3.display();
    
    //cuarto piso
    box7.display();
    log4.display();
    log5.display();

    //primer piso segundo edificio
    box8.display();
    box9.display();
    pig5.display();
    pig5.score();
    log6.display();

    //segundo pisosegundo edificio
    box10.display();
    box11.display();
    pig6.display();
    pig6.score();
    log7.display();

    //tercer piso segundo edificio
    box12.display();
    log8.display();
    log9.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body,{x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200, y:50})
        slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Mexico_City");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}