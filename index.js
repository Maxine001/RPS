let score = JSON.parse(localStorage.getItem('score')) ||
{
  wins: 0,
  losses: 0,
  ties: 0
}


let isAutoplaying = false
let intervalId;

function autoplay() {
  if(!isAutoplaying)
    {intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      //console.log(intervalId);
    },1000);

    isAutoplaying = true;



  }else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
  
}


function autoplayHTML(){
  const autoButton = document.querySelector('.js-auto-button');
  if(autoButton.innerHTML === 'Auto play'){
    autoButton.innerHTML = 'Stop';
  }else{
    autoButton.innerHTML = 'Auto play';
  }
  
}


document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p') {
    playGame('paper');
  }else if(event.key === 's') {
    playGame('scissors');
  }
   
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
    
    let result ='';
     
    if(playerMove ==='rock'){
      if (computerMove ==='rock') {result ='Tie.';}
      else if(computerMove ==='paper') {result ='You lose.';}
      else if(computerMove === 'scissors') {result ='You win.';}
    }

    else if(playerMove ==='paper') {
      if (computerMove ==='rock') {result ='You win.';}
      else if(computerMove ==='paper') {result ='Tie.';}
      else if(computerMove === 'scissors') {result ='You lose.';}
    }
    
    else if(playerMove ==='scissors') {
      if (computerMove ==='rock') {result ='You lose.';}
      else if(computerMove ==='paper') {result ='You win.';}
      else if(computerMove === 'scissors') {result ='Tie.';}
    
    };
      
    if(result === 'You win.') {score.wins+=1}
    else if(result === 'You lose.'){score.losses+=1}
    else if(result === 'Tie.') {score.ties+=1}

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();
    

    let html ='';

    html +=`
    <p class="result-css">${result}</p>
    <p>
    You picked <img class="move-icon" src="images/${playerMove}-emoji.png"> Computer picked <img class="move-icon" src="images/${computerMove}-emoji.png">
    </p>

    `;
    document.querySelector('.js-result')
    .innerHTML = html;

    console.log(html);
  
}


function pickComputerMove() {
  let randomNumber = Math.random();
  let computerMove ='';

  if (randomNumber > 0 && randomNumber <= 1/3) {
    computerMove ='rock';
  }
  else if(randomNumber > 1/3 && randomNumber <= 1/2) {
    computerMove ='paper';
  }
  else if(randomNumber > 1/2 && randomNumber <= 1) {
    computerMove ='scissors';
  }
 return computerMove;
}

function updateScore() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins} losses: ${score.losses} Ties: ${score.ties}`;
}