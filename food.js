class Food{
  constructor(i, j){
    // the tile where the food is located
    this.i = i;
    this.j = j;
  }
  
  // draws the food in the center of its tile as a circle
  draw(cellWidth, cellHeight){
    fill("yellow");
    strokeWeight(1);
    stroke("black");
    ellipse(
      this.i * cellWidth + cellWidth / 2,
      this.j * cellHeight + cellHeight / 2, 
      cellWidth / 2, 
      cellHeight / 2
    );
  }
  drawOnDescription(x, y, radius){
    fill("yellow");
    strokeWeight(1);
    stroke("black");
    ellipse(
      x,
      y, 
      radius,
      radius
    );
  }
}