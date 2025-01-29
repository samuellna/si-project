class Food {
  constructor(i, j) {
    // O tile onde a comida está localizada
    this.i = i;
    this.j = j;
  }

  // Método auxiliar para desenhar a comida como um círculo
  drawEllipse(x, y, width, height) {
    fill("yellow");
    strokeWeight(1);
    stroke("black");
    ellipse(x, y, width, height);
  }

  // Desenha a comida no centro do tile
  draw(cellWidth, cellHeight) {
    this.drawEllipse(
      this.i * cellWidth + cellWidth / 2,
      this.j * cellHeight + cellHeight / 2, 
      cellWidth / 2, 
      cellHeight / 2
    );
  }

  // Desenha a comida na descrição
  drawOnDescription(x, y, radius) {
    this.drawEllipse(x, y, radius, radius);
  }
}
