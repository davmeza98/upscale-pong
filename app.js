const game = document.getElementById('game')
const scoreElement= document.getElementById('score')
const score2Element = document.getElementById('score2')
const player1Element = document.getElementById('playername')

const status = document.getElementById('status')
const ctx = game.getContext('2d');
const startScreen = document.getElementById('start');
const startButton = document.getElementById('start-button')
const container = document.getElementById('container');
const playerInput = document.getElementById('player')

console.log(status)

let plate1;
let plate2;
let meatball;



const playerPlateImg1 = document.getElementById('plate1');
const playerPlateImg2 = document.getElementById('plate2');
const meatballImg = document.getElementById('meatball');
//paint initial screen
startButton.addEventListener('click', startGameScreen);
function startGameScreen() {
    startScreen.style.opacity= '0';
    container.style.transitionDelay = '1s'
    container.style.opacity = '1';
    player1Element.textContent = playerInput.value;
    let runGame = setInterval(gameLoop, 60);
   }


window.addEventListener('DOMContentLoaded', function(){
    //plate1 = new Player(785, 150, playerPlateImg1, 10, 75); not working- Follow up
    //plate2 = new Player(5, 150, playerPlateImg2, 10, 75); not working - follow up
    plate1 = new Player(785, 150, 'silver', 10, 75)
    plate2 = new Player(5, 150, 'silver', 10, 75)
    meatball = new Meatball(400, 200, 'brown', 10, 10, 10);
});

document.addEventListener('keydown', movementHandler);

//Canvas render
game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);

//set player classes

class Player {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        

       // this.render = function() {
          //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        //}
        this.render = function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
class Meatball {
    constructor(x, y, color, radius, vx, vy){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
    
    this.render = function(){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
        ctx.fill();
        }
    }
}



function movementHandler(e) {
    console.log('movement :', e.key);
    if (e.key === 'ArrowUp' || e.key === 'w'){
        plate2.y - 20 >= 0 ? (plate2.y -= 20) : null;
        
    } else if (e.key === 'ArrowDown' || e.key === 's'){
        plate2.y + 20 <= game.height - plate2.height ? (plate2.y += 20) : null;
    }
}
function moveCPUPlate() {
    const plateCenter = plate1.y + plate1.height / 2
    if (meatball.y < plateCenter){
        plate1.y - 7 >= 0 ? (plate1.y -= 7) : null;
        
    } else if (meatball.y > plateCenter){
        plate1.y + 7 <= game.height - plate1.height ? (plate1.y += 7) : null;
    }
}


//Game Process
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    plate1.render();
    plate2.render();
    meatball.render();
    meatball.x += meatball.vx;
    meatball.y += meatball.vy;

   detectHit(meatball, plate1);
   detectHit2(meatball, plate2);
   meatballReset(meatball);
   moveCPUPlate()
        
    if (meatball.y + meatball.vy > game.height - meatball.radius ||
        meatball.y + meatball.vy < meatball.radius) {
            meatball.vy = -meatball.vy;

    if (score === 6 || score2 === 6){
    clearInterval(runGame);
    showWinner()
    }
}
}
function detectHit(meatball, plate1){
if (meatball.x + meatball.radius >= plate1.x - plate1.width &&
    meatball.y + meatball.radius >= plate1.y &&
    meatball.y <= plate1.y + plate1.height){
        console.log('hit here')
        meatball.vx = -meatball.vx * 1.25
        meatball.vy = -meatball.vy * 1.5
    }
}

function detectHit2(meatball, plate2){
   
    if (meatball.x - meatball.radius <= plate2.x + plate2.width &&
        meatball.y + meatball.radius >= plate2.y &&
        meatball.y - meatball.radius <= plate2.y + plate2.height){
            console.log('hit here')
            meatball.vx = -meatball.vx * 1.25
            meatball.vy = -meatball.vy * 1.5
        }
    }

    let score = 0
    let score2 = 0

function meatballReset(ball){
    if (ball.x + ball.radius < 0) {
        ball.x = game.width / 2;
        ball.y = game.height / 2;
        ball.vx = -10;
        ball.vy = -10;
        score2 ++
        score2Element.textContent = score2
        status.textContent = 'Harold scored...better step it up!'
        //status.textContent = new Typed('Harold Scored..better step it up!')
    }
    else if (ball.x - ball.radius > game.width){
        ball.x = game.width / 2;
        ball.y = game.height / 2;
        ball.vx = 10;
        ball.vy = 10;
        score ++
        scoreElement.textContent = score
        status.textContent = player1Element.textContent + ' scored! Keep it up!'
       // status.textContent = new Typed(player1Element.textContent + ' scored! Keep it up!')
    }
    }

function showWinner(){
    if (score === 6) {
        status.textContent = player1Element.textContent + ' wins! Not going broke today!'
    } else if (score2 === 6){
        status.textContent = 'Harold won.....better get to washing dishes.';

    }
    startScreen.style.opacity = '1'
    startScreen.style.transitionDelay = '5s'
}