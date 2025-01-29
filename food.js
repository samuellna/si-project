class Food {
  constructor(i, j) {
    this.position = { i, j };
  }

  drawEllipse({ x, y, width, height }) {
    fill("yellow");
    strokeWeight(1);
    stroke("black");
    ellipse(x, y, width, height);
  }

  draw(cellWidth, cellHeight) {
    this.drawEllipse({
      x: this.position.i * cellWidth + cellWidth / 2,
      y: this.position.j * cellHeight + cellHeight / 2,
      width: cellWidth / 2,
      height: cellHeight / 2
    });
  }

  drawOnDescription(x, y, radius) {
    this.drawEllipse({ x, y, width: radius, height: radius });
  }
}
