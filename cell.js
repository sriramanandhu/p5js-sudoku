// OOPs ...

function Cell(row, col, num) {
  this.row = row;
  this.col = col;
  this.num = num;

  this.size = w / 9;
  this.xpos = col * this.size;
  this.ypos = row * this.size;
  this.color = 230;

  if (this.num) {
    this.isPredefined = true;
    this.color = 150;
  }
  else
    this.isPredefined = false;

  this.show = function() {
    this.mapColor(this.possibleValues());
    
    fill(this.color);
    
    stroke(50);
    strokeWeight(1.2);
    rect(this.xpos, this.ypos, this.size, this.size);

    fill(0);
    noStroke();
    if (this.num)
      text(this.num, this.xpos + 0.28 * this.size, this.ypos + 0.8 * this.size);
  }

  this.clicked = function(mx, my) {
    if (mx > this.xpos & mx < this.xpos+this.size) {
      if (my > this.ypos & my < this.ypos+this.size) {
        if (!this.isPredefined)
        return true;
      }
    }
    return false;
  }

  this.possibleValues = function() {
    //return possible values
    if (this.isPredefined)
      return false;
    
    let allNum = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
    for (let j = 0; j < 9; j++) {
      let newNum = cellArray[this.row][j].num;
      allNum.delete(newNum);
    }
    
    for (let i = 0; i < 9; i++) {
      let newNum = cellArray[i][this.col].num;
      allNum.delete(newNum);
    }
    
    let secTopX = 3*floor(this.row/3);
    let secTopY = 3*floor(this.col/3);
    for (let i=secTopX; i<secTopX+3; i++) {
      for (let j=secTopY; j<secTopY+3; j++) {
        let newNum = cellArray[i][j].num;
        allNum.delete(newNum);
      }
    }
    
    // console.log(allNum);
    return allNum;
  }
  
  this.mapColor = function(hSet) {
    if (this.isPredefined)
      return 0;
    
    let s = hSet.size;
    // console.log(s);
    
    let g = map(s, 1, 6, 250, 0);
    
    let gg = color(0, 255, 0);
    let ww = color(255, 255, 255);
    
    g = lerpColor(ww, gg, 1/s);
    
    this.color = g;//[255-g, 255, 255-g];
    // return (0, g, 0);
  }
}

