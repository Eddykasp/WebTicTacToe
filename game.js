function playTurn(field) {
  cross(field);
}

function cross(field) {
  field.src = "resources/cross.png";
  field.alt = "Cross";
  field.onclick = "";
}
