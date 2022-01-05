var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while(isSunk == false){
    guess = prompt("Hit it! Enter number from 0 to 6!")
    if(guess < 0 || guess > 6){
        alert('You have entered wrong number: enter number from 0 to 6 only');
    }else{
        guesses = guesses + 1;
            if(guess == location1 || guess == location2 || guess == location3){
                hits = hits + 1;
                if(hits == 3){
                    isSunk = true;
                    alert('Congrats!You are win!');
            }
        }
            else{
                alert('You are lost')
        }
    }
}