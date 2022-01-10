document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user');
  const computerGrid = document.querySelector('.grid-computer');
  const displayGrid = document.querySelector('.grid-display');
  const ships = document.querySelectorAll('.ship');
  const destroyer = document.querySelector('.destroyer-container');
  const submarine = document.querySelector('.submarine-container');
  const cruiser = document.querySelector('.cruiser-container');
  const buttleship = document.querySelector('.buttleship-container');
  const carrier = document.querySelector('.carrier-container');
  const startButton =document.querySelector('#start');
  const rotateButton = document.querySelector('#rotate');
  const turnDisplay = document.querySelector('#whose go');
  const infoDisplay = document.querySelector('#info')
  const userSquares = [];
  const computerSquares = [];
  let isHorizontal = true;
  let isGameOver = false;
  let currentPlayer = 'user';

  const width = 10;
  
  function createBoard(grid, squares, width) {
    for (let i=0; i<width*width; i++){
      const square = document.createElement('div');
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard(userGrid, userSquares, width);
  createBoard(computerGrid, computerSquares, width);

  const shipArray = [
    {
    name: 'destroyer',
    directions: [
    [0, 1],
    [0, width]
    ]
    },
    {
      name: 'submarine',
      directions: [
        [0, 1, 2],
        [0, width, width*2]
      ]
    },
    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, width, width*2]
      ]
    },
    {
      name: 'buttleship',
      directions: [
        [0, 1, 2, 3],
        [0, width, width*2, width*3]
      ]
    },
    {
      name: 'carrier',
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width*2, width*3, width*4]
      ]
    },
]

  function generate(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)));

    const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'));
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width -1);
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0);

    if(!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name));
    else generate(ship);
  }

  generate(shipArray[0]);
  generate(shipArray[1]);
  generate(shipArray[2]);
  generate(shipArray[3]);
  generate(shipArray[4]);

  function rotate() {
    if(isHorizontal){
      destroyer.classList.toggle('destroyer-container-vertical');
      submarine.classList.toggle('submarine-container-vertical');
      cruiser.classList.toggle('cruiser-container-vertical');
      buttleship.classList.toggle('buttleship-container-vertical');
      carrier.classList.toggle('carrier-container-vertical');
      isHorizontal = false;
      console.log(isHorizontal)
      return;
    }
    if(!isHorizontal){
      destroyer.classList.toggle('destroyer-container-vertical');
      submarine.classList.toggle('submarine-container-vertical');
      cruiser.classList.toggle('cruiser-container-vertical');
      buttleship.classList.toggle('buttleship-container-vertical');
      carrier.classList.toggle('carrier-container-vertical');
      isHorizontal = true;
      console.log(isHorizontal)
      return;
  }
}
  rotateButton.addEventListener('click', rotate);

  ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
  userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
  userSquares.forEach(square => square.addEventListener('dragover', dragOver))
  userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
  userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
  userSquares.forEach(square => square.addEventListener('drop', dragDrop))
  userSquares.forEach(square => square.addEventListener('dragend', dragEnd))

  let selectedShipNameWithIndex
  let draggedShip
  let draggedShipLength


  ships.forEach(ship => ship.addEventListener('mousedown',(e) => {
    selectedShipNameWithIndex = e.target.id;
    console.log(selectedShipNameWithIndex)
  }))

  function dragStart(){
    draggedShip = this
    draggedShipLength = this.childNodes.length
    
  console.log(draggedShip)
  }

  function dragOver(e){
    e.preventDefault()
  }

  function dragEnter(e){
    e.preventDefault()
  }

  function dragLeave(){
    console.log('drag leave')
  }

  function dragDrop(){
   let shipNameWithLastId = draggedShip.lastChild.id
   let shipClass = shipNameWithLastId.slice(0, -2)
   console.log(shipClass)
   let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
   let shipLastId = lastShipIndex + parseInt(this.dataset.id)
   console.log(shipLastId)
   const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 12, 22, 32, 42, 52, 62, 72, 82, 92,
                                  3, 13, 23, 33, 43, 53, 63, 73, 83, 93]
   const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71,
                               70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60]
  let newnotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
  let newnotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

   selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))

   shipLastId = shipLastId - selectedShipIndex
   console.log(shipLastId)

   if(isHorizontal && !newnotAllowedHorizontal.includes(shipLastId)){
     for (let i = 0; i< draggedShipLength; i++){
       userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass)
     }
   }else if(!isHorizontal && !newnotAllowedVertical.includes(shipLastId)){
    for (let i = 0; i< draggedShipLength; i++){
     userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', shipClass)
   }
 }else return

 displayGrid.removeChild(draggedShip)
}


  function dragEnd(){
    console.log('dragged')
  }

  function playGame(){
    if(isGameOver) return
    if(currentPlayer === 'user'){
      turnDisplay.innerHTML = 'Your go'
      computerSquares.forEach(square => square.addEventListener('click', function(e) {
        revealSquare(square)
      }))
    }
    if(currentPlayer === 'computer'){
      turnDisplay.innerHTML = 'Computers go'
      setTimeout(computerGo, 1000)
    }
  }
  startButton.addEventListener('click', playGame)

  let destroyerCount = 0;
  let submarineCount = 0;
  let cruiserCount = 0;
  let buttleShipCount = 0;
  let carrierCount = 0;
  function revealSquare(square) {
    if(square.classList.contains('boom')){
      if (square.classList.contains('destroyer')) destroyerCount++
      if (square.classList.contains('submarine')) submarineCount++
      if (square.classList.contains('cruiser')) cruiserCount++
      if (square.classList.contains('buttleShip')) buttleShipCount++
      if (square.classList.contains('carrierShip')) carrierCount++
    }
    if(square.classList.contains('taken')) {
      square.classList.add('boom');
    } else {
      square.classList.add('miss')
    }
    currentPlayer = 'computer'
    playGame
  }
  let cpuDestroyerCount = 0;
  let cpuSubmarineCount = 0;
  let cpuCruiserCount = 0;
  let cpuButtleShipCount = 0;
  let cpuCarrierCount = 0;
  function computerGo() {
    let random = Math.floor(Math.random * userSquares.length)
    if(!userSquares[random].classList.contains('boom')){
      userSquares[random].classList.add('boom')
      if (userSquares[random].classList.contains('destroyer')) cpuDestroyerCount++
      if (userSquares[random].classList.contains('submarine')) cpuSubmarineCount++
      if (userSquares[random].classList.contains('cruiser')) cpuCruiserCount++
      if (userSquares[random].classList.contains('buttleShip')) cpuButtleShipCount++
      if (userSquares[random].classList.contains('carrierShip')) cpuCarrierCount++
    }else computerGo()
    currentPlayer = 'user'
    turnDisplay.innerHTML = 'Your go'
  }
})



/*var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false) {
  guess = prompt("Hit it! Enter number from 0 to 6!");
  if (guess < 0 || guess > 6) {
    alert("You have entered wrong number: enter number from 0 to 6 only");
  } else {
    guesses = guesses + 1;
    if (guess == location1 || guess == location2 || guess == location3) {
      hits = hits + 1;
      if (hits == 3) {
        isSunk = true;
        alert("Congrats!You are win!");
      }
    } else {
      alert("You are lost");
    }
  }
}
*/
