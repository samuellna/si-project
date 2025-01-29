class GridMap{
  constructor(rows, cols){
    this.gridWidth = 800;
    this.gridHeight = 600;
    this.map = [];
    this.rows = rows;
    this.cols = cols;
    this.cellWidth = this.gridWidth/this.rows;
    this.cellHeight = this.gridHeight/this.cols;
    
    this.map = new Array(this.rows);
    
    for(let i = 0; i < this.rows; i++){
      this.map[i] = new Array(this.cols);
    }
    
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.map[i][j] = new Tile(i, j);
      }
    }
        
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j <  this.cols; j++){
        this.map[i][j].addNeighbors(this.map, this.rows, this.cols);
      }
    }
    
    // Generates a random position for the food and checks if it is a valid position
    
    let food_i = 0
    let food_j = 0
    
    do{
      food_i = Math.floor(random(this.rows));
      food_j = Math.floor(random(this.cols));
    } while(this.map[food_i][food_j].cost == -1 );
    
    this.food = new Food(food_i, food_j);
    
    // Generates a random position for the agent and checks if it is a valid position
    
    let agent_i = 0
    let agent_j = 0
    
    do{
      agent_i = Math.floor(random(this.rows));
      agent_j = Math.floor(random(this.cols));
    } while(this.map[agent_i][agent_j].cost == -1 || 
            (food_i == agent_i && food_j == agent_j));
    
    this.agent = new Agent(agent_i, agent_j, this.cellWidth, this.cellHeight);
    
    // defines the current tile that is visited by the search algorithm
    this.currentTileOfSearch = this.map[agent_i][agent_j];
  }
  
  // draws the map, the food, and the agent
  draw(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++)
        this.map[i][j].draw(this.cellWidth, this.cellHeight);
    }
    
    this.food.draw(this.cellWidth, this.cellHeight);
    this.agent.draw();
  }
  
  // clears all visited and marked used in the search
  clearMarkedAndVisited(){
    for(let i = 0; i <  this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.map[i][j].marked = false;
        this.map[i][j].visited = false;
      }
    }
  }
  
  // clears all the tiles links used in making the path
  clearPrevious(){
    for(let i = 0; i <  this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.map[i][j].previous = null;
      }
    }
  }
  
  resetAgent(){
    this.agent.i = this.food.i;
    this.agent.j = this.food.j;
  }
  
  resetCurrentSearchTile(){
    this.currentTileOfSearch = this.map[this.agent.i][this.agent.j];
  }
  
  generateNewFood(){
    let food_i = 0
    let food_j = 0
    
    do{
      food_i = Math.floor(random(this.rows));
      food_j = Math.floor(random(this.cols));
    } while(this.map[food_i][food_j].cost == -1 || 
            (this.agent.i == food_i && this.agent.j == food_j));
    
    this.food = new Food(food_i, food_j);
  }
  
  resetHeuristics(){
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        this.map[i][j].f = 0;
        this.map[i][j].g = 0;
        this.map[i][j].h = 0;
      }
    }
  }
}