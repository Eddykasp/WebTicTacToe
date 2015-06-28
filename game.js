var game = new gameState();

function playTurn(field) {
  cross(field);
}

function cross(field) {
  field.src = "resources/cross.png";
  field.alt = "Cross";
  field.onclick = "";
  game.fillField('X', Number(field.id.charAt(0)), Number(field.id.charAt(1)));
  document.getElementById('debug').innerHTML = game.toString();
}

function gameState(){
  this.state = [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']];
  this.fillField = function (pl, row, col) {this.state[row][col] = pl;};
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
  }
}
