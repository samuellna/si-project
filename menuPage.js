class MenuPage {
  constructor() {
    this.options = [
      'BFS',
      'DFS',
      'Greedy Search',
      'Uniform Cost Search',
      'A* Search'
    ];
    this.itemHeight = 560/8;
  }

  draw() {
    background(0);
    
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text('Selecione o tipo de busca:', 400, 130);
    
    for (let i = 0; i < this.options.length; i++) {
      fill(100, 100, 250);
      noStroke();
      rect(200, 210 + (i * this.itemHeight), 400, this.itemHeight - 10, 10);

      fill(255);
      textSize(32);
      textAlign(LEFT, CENTER);
      text(`${i + 1}. ${this.options[i]}`, 220, 210 + (i * this.itemHeight) + (this.itemHeight - 10) / 2);
    }
  }
}