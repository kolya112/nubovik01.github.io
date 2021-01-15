var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
var game_godmode = 0;

var bird = new Image();
var bg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// some variables
var gap = 143;
var constant;

var bX = 50;
var bY = 150;

var gravity = 1.5;

var game_score = 0;

// audio files
var fly = new Audio();
var scor = new Audio();
var sound = new Audio();

sound.src = "sounds/sound.mp3"
fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
// on key down
document.addEventListener("keydown",moveDown);

function moveDown(){
    bY -= 25;
    fly.play();
    sound.play();
}

// pipe coordinates
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images
function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - 0){
            if( game_godmode != 1) {
                location.reload(); // reload the page
            }
        }
        
        if(pipe[i].x == 5){
            game_score++;
            console.log(`Игровых очков: ${game_score}`)
            scor.play();
        }
        
        
    }
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "15px Verdana";
    ctx.fillText("Нажимайте на SPACE / ОБТ / Очки: "+game_score,10,cvs.height-490);
    
    requestAnimationFrame(draw);
    
}

draw();