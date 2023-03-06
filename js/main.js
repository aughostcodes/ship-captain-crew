'use strict';

// DOM VARIABLES //

const completedArea = document.querySelector('.completed-area');
const rollingArea = document.querySelector('.rolling-area');
const ship = document.getElementById('ship');
const captain = document.getElementById('captain');
const crew = document.getElementById('crew');
const rollButton = document.getElementById('roll-button');
const rerollButton = document.getElementById('reroll-button');
const passButton = document.getElementById('pass-button');

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
    if (turnsRemaining === 3 || (!shipTrue)) {
        for (let i = 0; i < 5; i++) {
            rollArray.push(rollDie());
        }
        console.log(rollArray);
        checkForSCC();
    }
    turnsRemaining--;

    addCargo();
}

const rollRemainingDice = () => {
    console.log('rolling remaining dice');
    // if (turnsRemaining < 3 && turnsRemaining >= 0) {
    if (crewTrue) {
        console.log('You found the ship, captain, and crew');
        for (let i = 0; i < 2; i++) {
            rollArray.push(rollDie());
        }
        console.log(rollArray);
    } else if (captainTrue) {
        console.log('You found both the ship and the captain');
        for (let i = 0; i < 3; i++) {
            rollArray.push(rollDie());
        }
        console.log(rollArray);
    } else if (shipTrue) {
        console.log('You found the ship');
        for (let i = 0; i < 4; i++) {
            rollArray.push(rollDie());
        }
        console.log(rollArray);
    } else {
        console.log('testing here');
    }
    // }
    turnsRemaining--;
    checkForSCC();
    addCargo();
    rollArray = [];
}

const addCargo = () => {
    let sum = 0;
    if (turnsRemaining === 0) {
        rollArray.forEach(num => {
            sum += num;
        });
        return sum;
    }
    console.log(sum);
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
        console.log('TURN IS OVER');
    }
    addCargo();
    rollArray = [];
}

const changePlaceholderBgs = () => {
    // rollArray.forEach()
}

// INCOMPLETE THOUGHTS //

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
rerollButton.addEventListener('click', rollRemainingDice);
// rollButton.addEventListener('click', rollAllFiveDice);