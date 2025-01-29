// Generates the tiles of the map using the proportion
// Obstacle: 20%
// Sand: 30%
// Mud: 25%
// Water: 25%

function random_type(){
  let rand = random(1);
  if(rand < 0.2){
    return -1;
  }
  else if(rand >= 0.2 && rand < 0.5){
    return 1;
  }
  else if(rand >= 0.5 && rand < 0.75){
    return 5;
  }
  else{
    return 10;
  }
}

class Tile{
  constructor(i, j){
    this.i = i;
    this.j = j;
    this.cost = random_type(); // defines the type of the tile
    
    // These are used for the Greedy, Uniform Cost and A*
    
    // A*
    // f(n)  represents the estimated total cost of the cheapest path from the start node to the goal node that goes through node n. 
    // It is defined as f(n) = g(n) + h(n)
    this.f = 0; 
    
    // Uniform Cost
    // g(n) represents the cost of the cheapest path from the start node to node n that has been found so far
    this.g = 0;
    
    // Greedy 
    // h(n) represents the heuristic estimate of the cost from node n to the goal node
    this.h = 0;
    
    this.neighbors = []; // all the tiles that it can traverse to
    
    // marked and visited are used for searching
    this.marked = false;
    this.visited = false;
    
    // previous is used to the pathing 
    this.previous = null;
  }
  
  draw(cellWidth, cellHeight){
    strokeWeight(1);
    if(this.cost == -1){ // wall
      fill("#5A5D63");  
    }
    else if(this.cost == 1){ // Sand
      fill("#C2B280");
    }
    else if(this.cost == 5){ // Mud
      fill("#6E260E")
    }
    else if(this.cost == 10){ // water
      fill("#3A76C2") 
    }
    stroke("black");
    if(this.checkStatus() == 1){ //marked
      fill("orange");
    }
    else if(this.checkStatus() == 2){ //visited
      fill("white")
    }
    rect(cellWidth * this. i, cellHeight * this. j, cellWidth);
  }
  
  drawOnDescription(x, y, cellWidth, cellHeight){
    strokeWeight(1);
    if(this.cost == -1){ // wall
      fill("#5A5D63");  
    }
    else if(this.cost == 1){ // Sand
      fill("#C2B280");
    }
    else if(this.cost == 5){ // Mud
      fill("#6E260E")
    }
    else if(this.cost == 10){ // water
      fill("#3A76C2") 
    }
    if(this.checkStatus() == 1){ //marked
      fill("orange")
    }
    else if(this.checkStatus() == 2){ //visited
      fill("white")
    }
    rect(x, y, cellWidth);
  }
  
  //checks the status of the tile to see if it was marked or visited to colour its borders
  checkStatus(){
    if(this.marked){
      return 1;
    }
    else if(this.visited){
      return 2;
    }
    else{
      return 0;
    }
  }
  // adds all the possible tiles that a tile can traverse to.
  // an agent can only move horizontaly and verticaly
  addNeighbors(gridMap, rows, cols){
    // if its a wall it has no neighbors
    
    if(this.cost == -1){
      return;
    }
    // adding the EAST neighbor if its not outside the grid and its not a wall
    if(this.i > 0 && gridMap[this.i - 1][this.j].cost != -1){
      this.neighbors.push(gridMap[this.i - 1][this.j]);
    }
    // adding the WEST neighbor if its not outside the grid and its not a wall
    if(this.i < rows - 1 && gridMap[this.i + 1][this.j].cost != -1){
      this.neighbors.push(gridMap[this.i + 1][this.j]);
    }
    // adding the SOUTH neighbor if its not outside the grid and its not a wall
    if(this.j < cols - 1 && gridMap[this.i][this.j + 1].cost != -1){
      this.neighbors.push(gridMap[this.i][this.j + 1]);
    }
    // adding the NORTH neighbor if its not outside the grid and its not a wall
    if(this.j > 0 && gridMap[this.i][this.j - 1].cost != -1){
      this.neighbors.push(gridMap[this.i][this.j - 1]);
    }
  }
}
  
