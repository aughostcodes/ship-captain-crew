'use strict';

// DOM VARIABLES //

const completedArea = document.querySelector('.completed-area');
const rollingArea = document.querySelector('.rolling-area');
const ship = document.getElementById('ship');
const captain = document.getElementById('captain');
const crew = document.getElementById('crew');
const rollButton = document.getElementById('roll-button');

// MANIPULATED VARIABLES //

let rollArray = [];
let diceRemaining = 5;
let turnsRemaining = 3;
let roundsRemaining;
let shipTrue = false;
let captainTrue = false;
let crewTrue = false;

// ROLLING THE DICE //

const rollDie = () => {
    let roll = Math.floor(Math.random() * 6) + 1;
    return roll;
}

const rollAllFiveDice = () => {
    for (let i = 0; i < 5; i++) {
        rollArray.push(rollDie());
    }
    console.log(rollArray);
    checkForSCC();
}

// CHECKING THE DICE FOR VALUES //

const checkForShip = () => {
    if (rollArray.includes(6)) {
        ship.style.backgroundImage = "url('./img/dice6.png')";
        diceRemaining--;
        console.log(`Dice remaining: ${diceRemaining}`);
        shipTrue = true;
    }
}

const checkForCaptain = () => {
    if ((rollArray.includes(6) && rollArray.includes(5)) || (shipTrue && rollArray.includes(5))) {
        captain.style.backgroundImage = "url('./img/dice5.png')";
        diceRemaining--;
        console.log(`Dice remaining: ${diceRemaining}`);
        captainTrue = true;
    }
}

const checkForCrew = () => {
    if ((rollArray.includes(6) && rollArray.includes(5) && rollArray.includes(4)) || (captainTrue && rollArray.includes(4))) {
        crew.style.backgroundImage = "url('./img/dice4.png')";
        diceRemaining--;
        console.log(`Dice remaining: ${diceRemaining}`);
        crewTrue = true;
    }
}

const checkForSCC = () => {
    checkForShip();
    checkForCaptain();
    checkForCrew();
    turnsRemaining--;
    if (turnsRemaining === 0) {
        // tally up total of last two dice and put total in cargo hold
        console.log('GAME IS OVER');
    }
    rollArray = [];
}

const changePlaceholderBgs = () => {
    // rollArray.forEach()
}

// INCOMPLETE THOUGHTS //

const rollRemainingDice = () => {
    if (shipTrue) {
        console.log('You found the ship');
        for (let i = 0; i < 4; i++) {
            console.log(rollDie());
        }
    }
}

function updateRollArea() {
    if (rollDie() === 6) {
        ship.style.backgroundImage = "url('./img/dice6.png')";
        diceRemaining--;
        console.log(diceRemaining);
        shipTrue = true;
    }
}

// EVENT LISTENERS //

rollButton.addEventListener('click', rollAllFiveDice);