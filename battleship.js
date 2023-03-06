/* Old Code
let randomLoc = Math.floor(Math.random() * 5)
let location1 = randomLoc;
let location2 = location1 + 1;
let location3 = location2 + 1;
let guess;
let hits = 0;
let guesses = 0;
let isSunk = false;

while (isSunk == false) {
    guess = prompt("Ready, aim, fire! (enter a number between 0-6) :");
    if (guess < 0 || guess > 6) {
        alert("please enter a valid cell number!");
    } else {
        guesses = guesses + 1;

        if (guess == location1 || guess == location2 || guess == location3) {
            alert("HIT!");
            hits = hits + 1;
            if (hits == 3) {
                isSunk = true;
                alert("You sank my battleship!");
            }
        } else {
            alert("MISS!");
        }

    }
}

let stats = `You took ${guesses} guesses to sink the battleship, which means your shooting accuracy was ${3 / guesses}`;

alert(stats);
*/

//New Code
let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");

    },
    displayMiss: function(location){
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};
let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships:  [{ locations: ["06", "16", "26"], hits: ["", "", ""]},
             { locations: ["24", "34", "44"], hits: ["", "", ""]},
             { locations: ["10", "11", "12"], hits: ["", "", ""]}],
    fire: function(guess) {
        for (let i = 0; i< this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },
    isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },
    generateShipLocations: function() {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },
    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row;
        let col;
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize -(this.shipLength +1)));
        }else {
            row = Math.floor(Math.random() * (this.boardSize -(this.shipLength +1)));
            col = Math.floor(Math.random() * this.boardSize);
        }
        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            }else {
                newShipLocations.push((row + i) + "" + col);
            }
            
        }
        return newShipLocations;
    },

};

let controller = {
    guesses: 0,
    processGuess: function(guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage(`You sank all my battleships in ${this.guesses} guesses`)
            }
        }
    }
}

function parseGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board");
        } else {
            return row + column;
        }
    }
    return null;
}
function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
}

function handleKeyPress (e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";
}
window.onload = init;