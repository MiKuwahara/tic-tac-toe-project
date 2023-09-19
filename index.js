const player1 = "X";
const player2 = "O";
const playersMark = new Array(9).fill("");
let activePlayer = player1;
let winner = false;
let numMoves = 0;


function playAgain(){
    playersMark.fill("");
    activePlayer = player1;
    winner=false;
    numMoves=0;

    document.querySelectorAll('.grid-item').forEach((value,index)=>{
        console.log(value.getAttribute('class'));
        let className = value.getAttribute('class').split(" ");
        console.log(className[1]);
        document.querySelector('.' + className[1]).innerHTML = '';
    })

    document.querySelector('p').innerHTML = '';
    document.getElementById('play-again').style.display = 'none';
}

function fun(event){
    
    const classNameList = event.srcElement.className.split(" ");
    const className = classNameList[1];

    if(document.querySelector("." + className).innerHTML === "" && winner === false){
        //document.querySelector("." + className).innerHTML = activePlayer;
        console.log( `<p>${activePlayer}</p>`);
        

        /*
        if(activePlayer === "X"){
            document.querySelector("." + className).innerHTML = `<p class="player1">${activePlayer}</p>`;
        }else{
            document.querySelector("." + className).innerHTML = `<p class="player2">${activePlayer}</p>`;
        }
        */

        document.querySelector("." + className).innerHTML = activePlayer;

        
        numMoves++;
       
        let index = Number(className.split("-")[1]);
        playersMark[index-1] = activePlayer;

        if(calculateWinner()){
            document.querySelector('p').innerHTML = `${activePlayer} wins!`;
            document.getElementById('play-again').style.display = 'block';
            
        }

        if(!(winner) && numMoves == 9){
            document.querySelector('p').innerHTML = 'It\'s a tie!';
            document.getElementById('play-again').style.display = 'block';
        }
        nextPlayer();
    }
}

function nextPlayer(){
    if(activePlayer === "X"){
        activePlayer = player2;
    }else{
        activePlayer = player1;
    }
}

// This function allows hoisting
function calculateWinner(){
    const answers = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ]

    for(let i = 0; i<answers.length; i++){
        let index1 = answers[i][0];
        let index2 = answers[i][1];
        let index3 = answers[i][2];
        //console.log(playersMark[index1-1]);

        if(playersMark[index1-1] !== "" && playersMark[index1-1] === playersMark[index2-1] && playersMark[index1-1] === playersMark[index3-1]){
            console.log("Winner: "+ playersMark[index1-1]);
            winner=true;
            return winner;
        }
    }
}