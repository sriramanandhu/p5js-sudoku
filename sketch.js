var w, windowSize; // = 300; // size of the grid
var grid = [];

var mode = 0;
const welcomeScreen = 0;
const gameScreen = 1;

var cellArray = [];
var btnArray = [];
var selectedCell = -1;
var hintText = "";

function initGame() {
  w = 0.8 * windowSize;
  // w = width;
  textSize(28);

  // initialize an empty grid
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
    let x = (i * (w / 9) + (w / 10));
    // let newBtn = new Button(x, 350, w/9, i);
    let newBtn = createButton(str(i), str(i));
    newBtn.position(x, 0.92 * windowSize);
    newBtn.size(w/10, w/10);
    newBtn.mousePressed(function() {
      setNum(newBtn.value());
    });
    btnArray.push(newBtn);
  }
}

function setup() {
  if (windowWidth > windowHeight) {
    windowSize = windowHeight;
  } else {
    windowSize = windowWidth;
  }
  createCanvas(windowSize, windowSize);

  initGame();
}

function draw() {
  background(220);

  if (mode === welcomeScreen) {
    textSize(40);
    textFont("courier");
    textStyle(BOLD);
    textAlign(CENTER);
    text("Sudoku", width / 2, height / 2);
    textSize(16);
    text("Click to Start!", width / 2, 0.6 * height);

  } else if (mode === gameScreen) {

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
    textAlign(LEFT);
    text(hintText, 0, -10);
    pop();
  }
}

function mousePressed() {
  if (mode == welcomeScreen) {
    mode = gameScreen;
    textSize(28);
    // textFont("original");
    textAlign(LEFT);
  } else if (mode == gameScreen) {
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
    // selectedCell = -1;
  }
}

function keyTyped() {
  if (!isNaN(int(key))) { // checks if it is number
    setNum(key);
  }
  // console.log(int(key));
}

function keyPressed() {
  if (mode == gameScreen && selectedCell != -1) {
    let curr_i = selectedCell.row;
    let curr_j = selectedCell.col;

    if (keyCode == RIGHT_ARROW && curr_j < 8) {
      selectedCell = cellArray[curr_i][curr_j + 1];
    } else if (keyCode == LEFT_ARROW && curr_j > 0) {
      selectedCell = cellArray[curr_i][curr_j - 1];
    } else if (keyCode == UP_ARROW && curr_i > 0) {
      selectedCell = cellArray[curr_i - 1][curr_j];
    } else if (keyCode == DOWN_ARROW && curr_i < 8) {
      selectedCell = cellArray[curr_i + 1][curr_j];
    }

    let hintSet = selectedCell.possibleValues();
    hintText = setHintText(hintSet);
  }
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
