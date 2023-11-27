document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
        game('rock')
    }else if(event.key === 'p'){
        game('paper')
    }else if(event.key === 's'){
        game('scissors')
    }else if(event.key === 'a'){
        autoPlay()
    }else if(event.key === ' '){
        resetScore()
    }else if(event.key === 'Backspace'){
        document.querySelector('.reset-confirmation'). innerHTML = `
        Are you sure you want to reset the score? 
        <button class='white-btn yes-btn'>Yes</button>
        <button class='white-btn no-btn'>No</button>
        `
        document.querySelector('.yes-btn').addEventListener('click', () => {
            resetScore()
            document.querySelector('.reset-confirmation'). innerHTML = ''
        })

        document.querySelector('.no-btn').addEventListener('click', () => {
            document.querySelector('.reset-confirmation'). innerHTML = ''
        })

            document.body.addEventListener('keydown', (event) => {
            if (event.key === 'y'){
                resetScore()
                document.querySelector('.reset-confirmation'). innerHTML = ''
            }else if(event.key === 'n'){
                document.querySelector('.reset-confirmation'). innerHTML = ''
            }
        
        })
    }
})

let score = JSON.parse(localStorage.getItem('score')) || {
        win: 0,
        lose: 0,
        draw: 0
     }

function updateScreen(){
document.querySelector('.win').innerHTML = `wins: ${score.win}`
document.querySelector('.lose').innerHTML = `loses: ${score.lose}`
document.querySelector('.draw').innerHTML = `draws: ${score.draw}`
}
updateScreen()


let isAutoPlaying = false
let intervalId;
function autoPlay(){
if(!isAutoPlaying){

   intervalId = setInterval(function(){
        let pcResponce = '';
    let randomNo = Math.random();

    if(randomNo < 1/3){
        pcResponce = 'rock';
    }else if(randomNo >= 1/3 && randomNo < 2/3){
        pcResponce = 'paper';
    }else{
        pcResponce = 'scissors';
    }
        game(pcResponce)
    }, 1000)

    document.querySelector('#auto-btn').innerHTML = 'Stop'
    isAutoPlaying = true
}else{
    clearInterval(intervalId)

    document.querySelector('#auto-btn').innerHTML = 'Auto play'
    isAutoPlaying = false
}
}
     
function game(playerMove){
let result = '';
let pcResponce = '';
let randomNo = Math.random();

if(randomNo < 1/3){
    pcResponce = 'rock';
}else if(randomNo >= 1/3 && randomNo < 2/3){
    pcResponce = 'paper';
}else{
    pcResponce = 'scissors';
}

if (playerMove === 'scissors'){
    if(pcResponce === 'rock'){
        score.lose +=1;
        result = 'You lost!';
    }else if(pcResponce === 'paper'){
        score.win += 1;
        result = 'You win!';
    }else{
        score.draw += 1;
        result = 'Draw!';
    }   
}else if (playerMove === 'rock'){
    if(pcResponce === 'rock'){
        score.draw +=1;
        result = 'Draw!';
    }else if(pcResponce === 'paper'){
        score.lose += 1;
        result = 'You lost!';
    }else{
        score.win += 1;
        result = 'You win!';
    }
}else{
    if(pcResponce === 'rock'){
        score.win +=1;
        result = 'You win!';
    }else if(pcResponce === 'paper'){
        score.draw += 1;
        result = 'Draw!';
    }else{
        score.lose += 1;
        result = 'You lost!';
    }
}

localStorage.setItem('score', JSON.stringify(score));

updateScreen()

document.querySelector('.result').innerHTML = result;
document.querySelector('.responces').innerHTML = `            You
    <img class="answer-img" src="Images/${playerMove}-emoji.png" alt="">
    <img class="answer-img" src="Images/${pcResponce}-emoji.png" alt="">
    PC`;

}


function resetScore(){
    localStorage.removeItem('score');

    score.win = 0;
    score.lose = 0;
    score.draw = 0;

    updateScreen()
}

document.querySelector('.js-reset').addEventListener('click', () => {
    document.querySelector('.reset-confirmation'). innerHTML = `
            Are you sure you want to reset the score? 
            <button class='white-btn yes-btn'>Yes</button>
            <button class='white-btn no-btn'>No</button>
            `
            document.querySelector('.yes-btn').addEventListener('click', () => {
                resetScore()
                document.querySelector('.reset-confirmation'). innerHTML = ''
            })

            document.querySelector('.no-btn').addEventListener('click', () => {
                document.querySelector('.reset-confirmation'). innerHTML = ''
            })

                document.body.addEventListener('keydown', (event) => {
                if (event.key === 'y'){
                    resetScore()
                    document.querySelector('.reset-confirmation'). innerHTML = ''
                }else if(event.key === 'n'){
                    document.querySelector('.reset-confirmation'). innerHTML = ''
                }
            
            })
})