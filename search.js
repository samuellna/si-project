class Search{
  constructor(gridMap){
    this.gridMap = gridMap;
    
    // defines the start and the end position of the search
    let agent = this.gridMap.agent;
    let food = this.gridMap.food;
    this.startTile = this.gridMap.map[agent.i][agent.j];
    this.endTile = this.gridMap.map[food.i][food.j];  
    
    // used to determine the current tile that is visited
    this.currentTile = gridMap.currentTileOfSearch;
    
    // auxiliary queue for the visited tiles
    this.queue = [];
    
    // flag to check if the search found the food
    this.found = false;
    
    // marks the position of the start tile
    this.queue.push(this.startTile);
    this.startTile.marked = true;
    
  }

  distance(a , b){
    return dist(a.i, a.j, b.i, b.j);
  }
}

class BFS extends Search{
  constructor(gridMap){
    super(gridMap);    
  }
    
    // BFS
  find(){
    
    // Are there any option left to search?
    if(this.queue.length > 0){
      
      // Have I found the food?
      if(this.currentTile !== this.endTile){
        // visits the first tile of the queue 
        this.currentTile = this.queue.shift();
        this.currentTile.marked = false;
        this.currentTile.visited = true;

        // marks all the neighbors from the tile that can be marked
        let neighbors = this.currentTile.neighbors;
        for(let neighbor of neighbors){
            if(!neighbor.marked &&  !neighbor.visited && neighbor.cost != -1){
                neighbor.previous = this.currentTile;
                this.queue.push(neighbor);
                neighbor.marked = true;
            }
        }    
      }
      // Found the food
      // Change the found flag and change to traversal state
      else{
        console.log("Food found!!!")
        this.found = true;
        return
      }
    }
    // No possible solution
    // Stops the execution
    else{
      console.log("No solution found");
      noLoop();
      return;
    }
  }

}

class DFS extends Search{
   constructor(gridMap){
     super(gridMap);
   }
   find(){ //TODO: needs implementation
     if(this.queue.length > 0){
       if(this.currentTile !== this.endTile){
        this.currentTile = this.queue.shift();
        this.currentTile.marked = false;
        this.currentTile.visited = true;
        
        let neighbors = this.currentTile.neighbors;
        for(let neighbor of neighbors){
            if(!neighbor.marked &&  !neighbor.visited && neighbor.cost != -1){
              neighbor.previous = this.currentTile;
              neighbor.marked = true;
              this.queue.unshift(neighbor);
            }
       }
     }
     else{
        console.log("Food found!!!")
        this.found = true;
        return;
     }
   }
     else{
      console.log("No solution found");
      noLoop();
      return;
    }
 }
}

class Greedy extends Search{
  constructor(gridMap){
     super(gridMap);
     this.startTile.h = this.distance(this.startTile, this.endTile);
  }
  find(){ 
    if(this.queue.length > 0){
      this.queue.sort(this.compare);
      
      if(this.currentTile !== this.endTile){
        this.currentTile = this.queue.shift();
        this.currentTile.marked = false;
        this.currentTile.visited = true;

        let neighbors = this.currentTile.neighbors;
        for(let neighbor of neighbors){
          
          if(!neighbor.visited){
            let tempDistance = this.distance(this.currentTile, this.endTile);
            let newPath = false;

            if(neighbor.marked){
              if(tempDistance < neighbor.h){
                neighbor.h = tempDistance;
                newPath = true;
              }
            }
            else{
              neighbor.h = tempDistance;
              this.queue.push(neighbor);
              neighbor.marked = true;
              newPath = true;
            }
            if(newPath){
              neighbor.previous = this.currentTile;
            }
          }
        }
      }
      else{
        console.log("Food found!!!")
        this.found = true;
        return;
      }
    }
    else{
      console.log("No solution found");
      noLoop();
      return;
    }
  }
  
  distance(a , b){
    return super.distance(a,b);
  }
  
  compare(a, b){
    if(a.h < b.h){
      return -1;
    }
    if(a.h > b.h){
      return 1;
    }
    return 0;
  }
}

class UniformCost extends Search{
  constructor(gridMap){
    super(gridMap);
    this.startTile.g = this.startTile.cost;
  }
  find(){ 
    if(this.queue.length > 0){
      this.queue.sort(this.compare);
      
      if(this.currentTile !== this.endTile){
        this.currentTile = this.queue.shift();
        this.currentTile.marked = false;
        this.currentTile.visited = true;

        let neighbors = this.currentTile.neighbors;
        for(let neighbor of neighbors){
          
          if(!neighbor.visited){
            let tempDistance = this.currentTile.g + neighbor.cost;
            let newPath = false;

            if(neighbor.marked){
              if(tempDistance < neighbor.g){
                neighbor.g = tempDistance;
                newPath = true;
              }
            }
            else{
              neighbor.g = tempDistance;
              this.queue.push(neighbor);
              neighbor.marked = true;
              newPath = true;
            }
            if(newPath){
              neighbor.previous = this.currentTile;
            }
          }
        }
      }
      else{
        console.log("Food found!!!")
        this.found = true;
        return;
      }
    }
    else{
      console.log("No solution found");
      noLoop();
      return;
    }
  }

  distance(a, b){
    return super.distance(a,b);  
  }

  compare(a, b){
    if(a.g < b.g){
      return -1;
    }
    if(a.g > b.g){
      return 1;
    }
    return 0;
  }
} 

class AStar extends Search{
  constructor(gridMap){
    super(gridMap);
    this.startTile.h = this.distance(this.startTile, this.endTile);
    this.startTile.g = this.startTile.cost;
    this.startTile.f = this.startTile.h + this.startTile.g;
  }
  find(){ 
    if(this.queue.length > 0){
      this.queue.sort(this.compare);
      
      if(this.currentTile !== this.endTile){
        this.currentTile = this.queue.shift();
        this.currentTile.marked = false;
        this.currentTile.visited = true;

        let neighbors = this.currentTile.neighbors;
        for(let neighbor of neighbors){
          
          if(!neighbor.visited){
            let tempH = this.distance(this.currentTile, this.endTile);
            let tempG = this.currentTile.g + neighbor.cost;
            let tempF = tempH + tempG;
            let newPath = false;

            if(neighbor.marked){
              if(tempF < neighbor.f){
                neighbor.h = tempH;
                neighbor.g = tempG;
                neighbor.f = tempF;
                newPath = true;
              }
            }
            else{
              neighbor.h = tempH;
              neighbor.g = tempG;
              neighbor.f = tempF;
              this.queue.push(neighbor);
              neighbor.marked = true;
              newPath = true;
            }
            if(newPath){
              neighbor.previous = this.currentTile;
            }
          }
        }
      }
      else{
        console.log("Food found!!!")
        this.found = true;
        return;
      }
    }
    else{
      console.log("No solution found");
      noLoop();
      return;
    }
  }

  distance(a, b){
    return super.distance(a, b);
  }

  compare(a, b){
    if(a.f < b.f){
      return -1;
    }
    if(a.f > b.f){
      return 1;
    }
    return 0;
  }
} 