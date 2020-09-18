function highlightBox(xpos, ypos, size) {
  let s = 0.15*size;
  
  corner("top-left", xpos, ypos, s);
  corner("top-right", xpos+size, ypos, s);
  corner("bottom-right", xpos+size, ypos+size, s);
  corner("bottom-left", xpos, ypos+size, s);
}

function corner(orientation, xpos, ypos, size = 10) {
  push();
  translate(xpos, ypos);

  if (orientation == "top-left") {
    rotate(0);
  } else if (orientation == "top-right") {
    rotate(HALF_PI);
  } else if (orientation == "bottom-right") {
    rotate(PI);
  } else if (orientation == "bottom-left") {
    rotate(3*HALF_PI);
  }

  fill(255, 255, 0);
  stroke(0);
  strokeWeight(1.3);

  beginShape();
  vertex(0, 0);
  vertex(2.5 * size, 0);
  vertex(2.5 * size, 1 * size);
  vertex(1 * size, 1 * size);
  vertex(1 * size, 2.5 * size);
  vertex(0, 2.5 * size);
  endShape(CLOSE);

  pop();
}