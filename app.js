"use strict"

//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;


//dino
let dinoWidth = 88;
let dinoHeight = 90;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}


let cactusArray = [];
let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;


let birdArray = [];
let bird1Width = 34;

let birdHeight = 50;

let birdX = 700;
let birdY = 150;
let bird1Img;
let bird2Img;


//physique
let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

//cactus
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");// use for drawing

    //dessiner le dino
    // context.fillStyle="green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png"
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
    }

    cactus1Img = new Image()
    cactus1Img.src = "./img/cactus1.png"

    cactus2Img = new Image()
    cactus2Img.src = "./img/cactus2.png"

    cactus3Img = new Image()
    cactus3Img.src = "./img/cactus3.png"
    
    bird1Img = new Image()
    bird1Img.src = "./img/bird1.png"

    bird2Img = new Image()
    bird2Img.src = "./img/bird2.png"
    
    document.addEventListener("keydown", dinoMove)
    requestAnimationFrame(update)
    setInterval(placeCactus, 1000)
    // if(score > 3000){
        setInterval(placeBird,2500)
    // }
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    context.clearRect(0,0,board.width,board.height)

    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);//applique la gravité à dino.y pour être sur de ne pas dépasser le sol..
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)

    for(let i=0;i<cactusArray.length;i++){
        let cactus = cactusArray[i]
        cactus.x += velocityX
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height)
        if(detecCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png"
            console.log(dinoImg.src)
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
            }
            // let gameOverImg = new Image("./img/game-over.png")
            // gameOverImg.onload = function() {
            //     context.drawImage(gameOverImg, 100, 100, 200, 20)
            // }
        }
    }

    for(let i=0;i<birdArray.length;i++){
        let bird = birdArray[i]
        bird.x += velocityX
        console.log(bird.x)
        context.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height)
        if(detecCollision(dino, bird)) {
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png"
            console.log(dinoImg.src)
            dinoImg.onload = function() {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
            }
            // let gameOverImg = new Image("./img/game-over.png")
            // gameOverImg.onload = function() {
            //     context.drawImage(gameOverImg, 100, 100, 200, 20)
            // }
        }
    }


    //score
    context.fillStyle="black"
    context.font = "20px courier"
    score++;
    context.fillText(score, 5, 20)
}

function dinoMove(e) {
    if (gameOver) {
        return;
    }

    if((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY){
        //saut
        velocityY = -10;

        dinoY=160


        dino.height = 90;
        dinoImg.src = "./img/dino.png";

    }else if(e.code == "ArrowDown" && dino.y == dinoY) {

        dinoY=200
        dino.height = 50;
        dinoImg.src = "./img/dino-duck1.png";
    }else{
        
        // dino.height = 90;
        // context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)

        // dinoImg.src = "./img/dino.png";
    }
}

function placeCactus() {
    if (gameOver) {
        return;
    }
        let bird = {
            img : null,
            x : birdX,
            y : birdY,
            width : null,
            height : birdHeight
        }

        
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusHeight
    }

    let placeCactusChance = Math.random();

    if(placeCactusChance > 0.90){
        cactus.img = cactus3Img
        cactus.width = cactus3Width
        cactusArray.push(cactus)
    }else if (placeCactusChance > 0.70){
        cactus.img = cactus2Img
        cactus.width = cactus2Width
        cactusArray.push(cactus)  
    }else if (placeCactusChance > 0.50 && score >3000){
        bird.img = bird1Img
        bird.width = bird1Width
        birdArray.push(bird)
    }else if (placeCactusChance > 0.50) {
        cactus.img = cactus1Img
        cactus.width = cactus1Width
        cactusArray.push(cactus)
    }

    if( birdArray.length > 5) {
        birdArray.shift()//suppr le premier élément, donc le tableau n'aura pas plus de 5 élément à la fois
    }
    if( cactusArray.length > 5) {
        cactusArray.shift()//suppr le premier élément, donc le tableau n'aura pas plus de 5 élément à la fois
    }
}

    // function placeBird() {
    //     if(gameOver){
    //         return;
    //     }

    //     let bird = {
    //         img : null,
    //         x : birdX,
    //         y : birdY,
    //         width : null,
    //         height : birdHeight
    //     }
    //         bird.img = bird1Img
    //         bird.width = bird1Width
    //         birdArray.push(bird)

    //     if( birdArray.length > 5) {
    //         birdArray.shift()//suppr le premier élément, donc le tableau n'aura pas plus de 5 élément à la fois
    //     }

    // }
//la fonction vérifie toute les façon dont a et b pourrait se toucher
function detecCollision(a, b) {
    return a.x < b.x + b.width && //le coin supérieur gauche de a n'atteint pas le coin supérieur droit de b
           a.x +  a.width > b.x &&// le coin supérieur droit de a passe au coin supérieur gauche de b
           a.y < b.y + b.height &&//le coin supérieur gauche de a n'atteint pas le coin inferieur gauche de b
           a.y + a.height > b.y;//le coin inférieur gauche de a  passe au coin supérieur gauche de b
}