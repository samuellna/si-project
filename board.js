class Board{
  constructor(){
    this.totalCells = 9;
    this.cellHeight = 600/12
    this.cellWidth = 800/9
    this.text = [
      "Agente",
      "Comida",
      "Areia: 1",
      "Atoleiro: 5",
      "Água: 10",
      "Obstáculo",
      "Caminho",
      "Marcado",
      "Visitado"
    ];
    
    this.searches = {
      0: "Nenhum",
      1: "BFS",
      2: "DFS",
      3: "Greedy",
      4: "Uniform Cost",
      5: "A*"
    }
    
    this.agent = new Agent(0, 0, 600/20, 600/20);
    this.food = new Food(0, 0);
    
    this.grass = new Tile(0, 0);
    this.grass.cost = 1;
    
    this.sand = new Tile(0,0);
    this.sand.cost = 5;
    
    this.water = new Tile(0,0);
    this.water.cost = 10;
    
    this.obstacle = new Tile(0,0);
    this.obstacle.cost = -1;
  }
  
  drawTable(){
    for(let i = 0; i < this.totalCells;i++){
      fill("black");
      strokeWeight(4);
      stroke("white");
      rect(i * this.cellWidth + this.cellWidth, 602, this.cellWidth, 95);
      if (i == 0) rect(0, 602, this.cellWidth, 95)
    }

    for(let i = 0; i < this.totalCells; i++){
      fill("white");
      strokeWeight(1);
      stroke("black")
      textSize(16);
      textAlign(CENTER, CENTER);
      text(this.text[i], i*this.cellWidth, 598, this.cellWidth, this.cellHeight);
    }
    
    stroke("white")
    strokeWeight(4);
    line(0, 650, 800, 650);
    
    this.agent.drawOnDescription(this.cellWidth / 2, 650 + this.cellHeight / 2);
    this.food.drawOnDescription(this.cellWidth + this.cellWidth / 2, 650 + this.cellHeight / 2, 600 / 40);

    this.grass.drawOnDescription(
      2 * this.cellWidth + this.cellWidth / 2 - 600 / 40, 
      650 + this.cellHeight / 2 - 600 / 40,
      600 / 20,
      600 / 20
    );

    this.sand.drawOnDescription(
      3 * this.cellWidth + this.cellWidth / 2 - 600 / 40, 
      650 + this.cellHeight / 2 - 600 / 40,
      600 / 20,
      600 / 20
    );

    this.water.drawOnDescription(
      4 * this.cellWidth + this.cellWidth / 2 - 600 / 40, 
      650 + this.cellHeight / 2 - 600 / 40,
      600 / 20,
      600 / 20
    );

    this.obstacle.drawOnDescription(
      5 * this.cellWidth + this.cellWidth / 2 - 600 / 40, 
      650 + this.cellHeight / 2 - 600 / 40,
      600 / 20,
      600 / 20
    );
    
    stroke("gold");
    strokeWeight(5);
    beginShape();
    vertex(6 * this.cellWidth + this.cellWidth / 2, 650 + this.cellHeight / 3);
    vertex(6 * this.cellWidth + this.cellWidth / 2, 650 + 2 * this.cellHeight / 3);
    endShape();

    fill("orange");
    noStroke();
    rect(7 * this.cellWidth + this.cellWidth / 2 - 600 / 40, 650 + this.cellHeight / 2 - 600 / 40, 600 / 20);

    fill("white");
    noStroke();
    rect(8 * this.cellWidth + this.cellWidth / 2 - 600 / 40, 650 + this.cellHeight / 2 - 600 / 40, 600 / 20);
  }
  
  draw(cost = 0, foodEaten = 0, searchType = 0){
    let backgroundColor = color(255, 255, 255);
    backgroundColor.setAlpha(130);
    
    fill(backgroundColor);
    noStroke();
    rect(10, 20, 440, 50, 50);
    
    fill("black");
    strokeWeight(1);
    stroke("white");
    textSize(22);
    textAlign(CENTER,CENTER);
    text(`Algoritmo selecionado: ${this.searches[searchType]}`, 25, 22, 400, this.cellHeight);
    
    this.drawTable();
    
    fill(backgroundColor);
    noStroke();
    rect(620, 20, 150, 50, 20);
    
    fill("black");
    strokeWeight(1);
    stroke("black")
    textSize(14);
    textAlign(CENTER, CENTER);
    text(`Custo: ${cost}`, 620, 10, 150, this.cellHeight);

    fill("black");
    strokeWeight(1);
    stroke("black")
    textSize(14);
    textAlign(CENTER, CENTER);
    text(`Comeu: ${foodEaten}`, 620, 34, 150, this.cellHeight);
  }
}