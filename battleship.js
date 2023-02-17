let location1 = 3;
let location2 = 4;
let location3 = 5;

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

        if (guess == location1 || location2 || location3){
            hits = hits + 1;
            alert("HIT!");
            if (hits == 3) {
                isSunk == true;
                alert("You sank my battleship!");
            }
        } else {
            alert("MISS!");
        }

    }
}

lets stats = `You took ${guess} guesses to sink the battleship, which means your shooting accuracy was ${3/guesses}`;

alert(stats);