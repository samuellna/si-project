class MenuPage {
  constructor() {
    this.options = [
      'BFS',
      'DFS',
      'Greedy Search',
      'Uniform Cost Search',
      'A* Search'
    ];
    this.itemHeight = 560 / 8;
    this.bgColor = [92, 148, 252];
    this.buttonColor = [255, 0, 0];
    this.borderColor = [255, 204, 0];
  }

  draw() {
    background(...this.bgColor);
    this.drawClouds();
    this.drawGrass();
    
    fill(30);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('Selecione o tipo de busca:', 400, 130);
    
    for (let i = 0; i < this.options.length; i++) {
      fill(...this.borderColor);
      rect(195, 205 + (i * this.itemHeight), 410, this.itemHeight - 5, 12);
      fill(...this.buttonColor);
      rect(200, 210 + (i * this.itemHeight), 400, this.itemHeight - 10, 10);
      
      fill(255);
      textSize(32);
      textAlign(LEFT, CENTER);
      text(`${i + 1}. ${this.options[i]}`, 220, 210 + (i * this.itemHeight) + (this.itemHeight - 10) / 2);
    }
  }

  drawClouds() {
    fill(255);
    noStroke();
    ellipse(150, 80, 100, 60);
    ellipse(180, 60, 80, 50);
    ellipse(210, 80, 100, 60);
    
    ellipse(500, 150, 100, 60);
    ellipse(530, 130, 80, 50);
    ellipse(560, 150, 100, 60);
  }

  drawGrass() {
    fill(0, 180, 0);
    rect(0, 550, 800, 500);
  }
}
