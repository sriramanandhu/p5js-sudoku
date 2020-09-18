//jshint esversion: 6

var w = 300;
var grid = [];
// var grid = [
//   [0, 0, 0, 0, 3, 0, 0, 2, 7],
//   [0, 6, 2, 0, 5, 0, 0, 9, 0],
//   [0, 7, 0, 0, 0, 0, 0, 0, 0],
//   [0, 9, 0, 6, 0, 0, 1, 0, 0],
//   [1, 0, 0, 0, 2, 0, 0, 0, 4],
//   [0, 0, 8, 0, 0, 5, 0, 7, 0],
//   [0, 0, 0, 0, 0, 0, 0, 8, 0],
//   [0, 2, 0, 0, 1, 0, 7, 5, 0],
//   [3, 8, 0, 0, 7, 0, 0, 4, 2]
// ];

var cellArray = [];
var btnArray = [];
var selectedCell = -1;
var hintText = "";

function setup() {
  createCanvas(400, 400);

  // w = width;
  textSize(28);

  for (let i = 0; i < 9; i++) {
    grid.push([]);
    for (let j = 0; j < 9; j++) {
      grid[i].push(0);
    }
  }

  for (let i = 0; i < 9; i++) {
    cellArray.push([]);
    for (let j = 0; j < 9; j++) {
      let newCell = new Cell(i, j, grid[i][j]);
      cellArray[i].push(newCell);
    }
  }

  for (let i = 0; i <= 9; i++) {
    let x = (i * w / 9 + 35);
    // let newBtn = new Button(x, 350, w/9, i);
    let newBtn = createButton(str(i), str(i));
    newBtn.position(x, 360);
    newBtn.mousePressed(function() {
      setNum(newBtn.value());
    });
    btnArray.push(newBtn);
  }
}

function draw() {
  background(220);
  translate(width / 9, width / 9);

  for (let cRow of cellArray) {
    for (let c of cRow)
      c.show();
  }
  blueBoxs();
  // greyLines();

  highlightSelected();

  // displayHint();
  push();
  noStroke();
  fill(0);
  text(hintText, 0, -10);
  pop();
}

function mousePressed() {
  for (let cRow of cellArray) {
    for (let c of cRow) {
      if (c.clicked(mouseX - width / 9, mouseY - width / 9)) {
        selectedCell = c;
        let hintSet = c.possibleValues();
        hintText = setHintText(hintSet);
        return;
      }
    }
  }
  selectedCell = -1;
}

function keyTyped() {
  if (!isNaN(int(key))) {
    setNum(key);
  }
  // console.log(int(key));
}

function blueBoxs() {
  strokeWeight(3);
  stroke(64, 71, 201);

  noFill();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      bx = i * (w / 3);
      by = j * (w / 3);
      rect(bx, by, w / 3, w / 3);
    }
  }
}

function greyLines() {
  strokeWeight(1.3);
  stroke(120);

  let glines = [1, 2, 4, 5, 7, 8];
  for (let g of glines) {
    lx = g * (width / 9);
    ly = g * (height / 9);

    line(lx, 0, lx, height);
    line(0, ly, width, ly);
  }
}

function highlightSelected() {
  if (selectedCell != -1) {
    highlightBox(selectedCell.xpos, selectedCell.ypos, selectedCell.size);
  }
}

function setNum(n) {
  // console.log(int(n));
  if (selectedCell != -1) {
    selectedCell.num = int(n);
  }
}

function setHintText(hintSet) {
  let hint = "";

  for (let item of hintSet.values()) {
    // console.log(item);
    hint += item + " ";
  }

  console.log(hint);
  // textSize(32);
  // text(hint, 0, 0);

  return hint;
}
