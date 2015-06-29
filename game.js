var game = new gameState();

function playTurn(field) {
  if (field.class !== 'unclickable') {
    cross(field);
    aiTurn(calcGameTree());
  }
}

function aiTurn(gameTreeLevel) {
  var choice = Math.floor(Math.random() * gameTreeLevel.length);
  var i = 0,j = 0;

  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (game.state[i][j] !== gameTreeLevel[choice].state[i][j]) {
        nought(document.getElementById(String(i)+j));
        break;
      }
    }
  }
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

  for (i = 0; i < 9 - gameLevel; i++) {
    var x=emptyCoords[i][0],
    y=emptyCoords[i][1];
    childGameStates.push(cloneGameState());
    childGameStates[i].state[x][y] = 'O';
    console.log(childGameStates[i].toString());
  }
  return childGameStates;
}

function cross(field) {
  field.src = "resources/cross.png";
  field.alt = "Cross";
  field.class = 'unclickable';
  game.fillField('X', Number(field.id.charAt(0)), Number(field.id.charAt(1)));
}

function nought(field) {
  field.src = "resources/nought.png";
  field.alt = "Nought";
  field.class = 'unclickable';
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
  var i,j = 0;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      g.state[i][j] = game.state[i][j];
    }
  }
  return g;
}

function reset() {
  game = new gameState();
  var fields = document.getElementsByTagName('img'), i = 0;
  for(i = 0; i < fields.length; i++) {
    fields[i].src = "resources/empty.png";
    fields[i].alt = "Empty Field";
    fields[i].class = 'clickable';
  }
}
