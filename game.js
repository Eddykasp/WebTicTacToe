var game = new gameState();

function playTurn(field) {
  cross(field);
  calcGameTree();
}

function aiTurn() {

}

function calcGameTree() {
  var gameLevel = 0, i, j,
  childGameStates = [],
  emptyFields = [[true,true,true],
                 [true,true,true],
                 [true,true,true]],
  emptyCoords = [];

  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (game.state[i][j] !== " ") {
        gameLevel++;
        emptyFields[i][j] = false;
      } else {
        emptyCoords.push([i,j]);
      }
    }
  }
  console.log(emptyCoords.length);
  for (i = 0; i < 9 - gameLevel; i++) {
    childGameStates.push(cloneGameState());
    childGameStates[i].state[emptyCoords[i][0]][emptyCoords[i][1]] =
      'O';
    emptyCoords.shift();
    console.log(childGameStates[i].toString());
  }
}

function cross(field) {
  field.src = "resources/cross.png";
  field.alt = "Cross";
  field.onclick = "";
  game.fillField('X', Number(field.id.charAt(0)), Number(field.id.charAt(1)));
}

function nought(field) {
  field.src = "resources/nought.png";
  field.alt = "Nought";
  field.onclick = "";
  game.fillField('O', Number(field.id.charAt(0)), Number(field.id.charAt(1)));
}

function gameState(){
  this.state = [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']];
  this.fillField = function (pl, row, col) {
    this.state[row][col] = pl;
  };
  this.toString = function () {
    var i,j,
    str = "";
    for(i = 0; i < 3; i++) {
      str += "|";
      for (j = 0; j < 3; j++) {
        str += this.state[i][j] + "|";
      }
      str += "<br>";
    }
    return str;
  };
}

function cloneGameState() {
  var g = new gameState();
  g.state = game.state;
  return g;
}
