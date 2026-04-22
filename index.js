const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver= false;
let foodX, foodY;
let snakeX= 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;


//this is to get high score sa kanang local storage

 let highScore = localStorage.getItem("high-score") || 0;
 highScoreElement.innerText = `High Score: ${highScore}`;


//randomizer between 1 to 30 that determines da position sa foodies.

const updateFoodPosition = ()=> {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = ()=>{
    clearInterval(setIntervalId);
    alert( `GAME OVER! Press OK to restart again`);
    location.reload();
}

const changeDirection = e =>{
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key ==="ArrowDown" && velocityY !=-1){
        velocityX = 0;
        velocityY = 1;

    } else if(e.key ==="ArrowLeft" && velocityX !=1){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key ==="ArrowRight" && velocityX !=-1){
        velocityX = 1;
        velocityY = 0;
    }
}

//change direction on each key click

controls.forEach(button => button.addEventListener("click", ()=> changeDirection({key: button.dataset.key})));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"> </div>`;

    //when snake eat food

    if(snakeX === foodX && snakeY ===foodY){
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score :  highScore;

        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    //update snake head

    snakeX += velocityX;
    snakeY += velocityY;
    
    //shifting forward elements of snake body by 1

    for(let i = snakeBody.length - 1; i>0; i-- ){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    //to check if snake body hit the wall or not

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        return gameOver = true;

    }

    //automatically add div for each part of snake body

    for(let i = 0; i<snakeBody.length; i++){
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        //check if the head hit the body or nah

        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame,100);
document.addEventListener("keyup", changeDirection);
 