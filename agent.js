class Agent{
  constructor(i, j, cellWidth, cellHeight){
    // i and j are the matrix position of the agent
    this.i = i;
    this.j = j;
     
    // cellWidth and cellHeight are the sizes of the width and height of the tiles in pixels 
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight
    
    this.count = 0;
    // pos is the center point of the tile
    this.pos =  createVector(
      this.i * this.cellWidth + this.cellWidth / 2, 
      this.j * this.cellHeight + this.cellHeight / 2
      );
    
    // the current is the tile that the agent is currently in while travessing
    this.current = null;
    
    // target is the next tile that it needs to traverse and targetPos is the center of          it 
    this.target = null;
    this.targetPos = null;
    
    // speed is a scalar distance and velocity is the vector that points to the next            target 
    // speed varies depending o the terrain (grass, sand, or water)
    this.speed = null;
    this.velocity = null;
    
    // route is the path found during the search from the initial position to the                position of the food
    this.route = null;
    
    // food is the tile that the food is located and foodPos is its center
    this.food = null;
    this.foodPos = null;
    
    // found is a flag that states if the food has been reached or not
    this.found = false;
  }
  
  
  // draws the agent in the center of its tile as a circle
  draw(){
    fill("red");
    strokeWeight(1);
    stroke("black");
    ellipse(
      this.pos.x,
      this.pos.y, 
      this.cellWidth / 2, 
      this.cellHeight / 2
    );
  }
  
  drawOnDescription(x, y){
    fill("red");
    strokeWeight(1);
    stroke("black");
    ellipse(
      x,
      y, 
      this.cellWidth / 2, 
      this.cellHeight / 2
    );
  }
  
  // takes the path found by the search and defines the food position and the current position
  definePath(path){
    if(this.route == null){
      this.route = path.route;
      this.food = this.route[path.route.length - 1];
      this.foodPos = createVector(
        this.food.i * this.cellWidth + this.cellWidth / 2, 
        this.food.j * this.cellHeight + this.cellHeight / 2
      )
      this.current = this.route.shift();
    }
  }

  // defines the next tile that the agent needs to traverse
  defineTarget(){
    if(this.target == null){
      this.target = this.route.shift();
      this.targetPos = createVector(
        this.target.i * this.cellWidth + this.cellWidth / 2, 
        this.target.j * this.cellHeight + this.cellHeight / 2
      )
    } 
  }
  
  // defines the speed of the agent depending on the terrain
  defineSpeed(){
    if(this.current.cost == 1){
      this.speed = 10;
    }
    else if(this.current.cost == 5){
      this.speed = 3;
    }
    else if(this.current.cost == 10){
      this.speed = 1;
    }
  }
  
  // defines to where the direction vector needs to point when travessing
  defineDirection(){
    this.velocity = p5.Vector.sub(this.targetPos, this.pos);
    this.velocity.normalize();
    this.velocity.mult(this.speed);
  }
  
  // checks if the agent has reached the current target and if it has updates the current tile and the next target
  hasReachedTarget(){
    let distance = p5.Vector.dist(this.targetPos, this.pos);
    if(distance > 1){
      this.pos.add(this.velocity);
    }
    else{
      this.count += this.current.cost; 
      this.pos = this.targetPos;
      this.current = this.target;
      this.target = this.route.shift();
      this.targetPos = createVector(
        this.target.i * this.cellWidth + this.cellWidth / 2, 
        this.target.j * this.cellHeight + this.cellHeight / 2
      )
    }
  }
  
  // checks if the food has been reached and when it is, ends the traverse
  hasReachedFood(){
    let distance = p5.Vector.dist(this.foodPos, this.pos);
    if(distance > 1){
      return false; 
    }
    else{
      this.count += this.current.cost;
      console.log("Food reached!!!")
      this.pos = this.foodPos;
      return true;
    }
  }
}