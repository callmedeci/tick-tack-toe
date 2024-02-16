'use strict';

const block = document.getElementsByClassName('cube');
const stats = document.getElementById('status');
const stopGame = document.getElementById('stop-game');
const btnReset = document.getElementById('btn-reset');
const playerOneScore = document.getElementById('plr-one-score');
const playerTwoScore = document.getElementById('plr-two-score');


const winner = [
    ['1x1', '2x2', '3x3'],
    ['1x3', '2x2', '3x1'],
    ['1x1', '2x1', '3x1'],

    ['1x2', '2x2', '3x2'],
    ['1x3', '2x3', '3x3'],
    ['1x1', '1x2', '1x3'],

    ['2x1', '2x2', '2x3'],
    ['3x1', '3x2', '3x3'],
];


let selectedBox = {};
let isWinner = false;
let isPlayerOne = true;
let turns = 0;
let has_stop = false;


if (!sessionStorage.getItem('player_one_score')) {
    sessionStorage.setItem('player_one_score', 0);
}

if (!sessionStorage.getItem('player_two_score')) {
    sessionStorage.setItem('player_two_score', 0);
}

let playerOneScoreHolder = parseInt(sessionStorage.getItem('player_one_score'));
let playerTwoScoreHolder = parseInt(sessionStorage.getItem('player_two_score'));

function select(event) {

    const box = event.target;
    const boxPos = box.getAttribute('data-col');

    if (boxPos in selectedBox) {
        return;
    };
    if (has_stop) {
        return;
    }

    selectedBox[boxPos] = {
        box: box,
        player: isPlayerOne ? true : false,
    };

    box.classList.remove("hover:bg-zinc-100/90");

    if (isPlayerOne) {
        box.classList.remove("bg-zinc-100");
        box.classList.add("bg-indigo-600");
        isPlayerOne = false;
        stats.innerText = "Red Turn ⭕";
    }
    else {
        box.classList.remove("bg-zinc-100");
        box.classList.add("bg-rose-600");
        isPlayerOne = true;
        stats.innerText = "Blue Turn 🔹";
    }

    turns++;

    if (turns >= 5) {
        winner.forEach(
            win => {
                const box1 = selectedBox[win[0]];
                const box2 = selectedBox[win[1]];
                const box3 = selectedBox[win[2]];


                if (box1 === undefined || box2 === undefined || box3 === undefined) {
                    return;
                }
                if (box1.player === true && box2.player === true && box3.player === true) {
                    has_stop = true;
                    stats.innerText = 'Blue 🔹 Wins 🏆';
                    stopGame.classList.remove('translate-y-96');
                    playerOneScoreHolder += 1;
                    sessionStorage.setItem('player_one_score', playerOneScoreHolder);
                    playerOneScore.innerText = playerOneScoreHolder;
                }
                else if (box1.player === false && box2.player === false && box3.player === false) {
                    has_stop = true;
                    stats.innerText = 'Red ⭕ Wins 🎉';
                    stopGame.classList.remove('translate-y-96');
                    playerTwoScoreHolder += 1;
                    sessionStorage.setItem('player_two_score', playerTwoScoreHolder);
                }
                else if (turns >= 9) {
                    stats.innerText = "Draw 🛡";
                    stopGame.classList.remove('translate-y-96');
                    return;
                }
            }
        )
    }
}

function resetHandler() {
    window.location.reload();
}

for (const box of block) {
    box.addEventListener('click', select);
}

btnReset.addEventListener('click', resetHandler);

playerOneScore.innerText = playerOneScoreHolder;
playerTwoScore.innerText = playerTwoScoreHolder;



