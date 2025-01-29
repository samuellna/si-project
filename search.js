class Search {
  constructor(gridMap) {
    this.gridMap = gridMap;
    this.startTile = this.gridMap.map[gridMap.agent.i][gridMap.agent.j];
    this.endTile = this.gridMap.map[gridMap.food.i][gridMap.food.j];
    this.currentTile = gridMap.currentTileOfSearch;
    this.queue = [this.startTile];
    this.found = false;
    this.noSolution = false;

    this.startTile.marked = true;
  }

  distance(a, b) {
    return dist(a.i, a.j, b.i, b.j);
  }

  processCurrentTile() {
    this.currentTile = this.queue.shift();
    this.currentTile.marked = false;
    this.currentTile.visited = true;
  }

  processNeighbors(callback) {
    for (let neighbor of this.currentTile.neighbors) {
      if (!neighbor.marked && !neighbor.visited && neighbor.cost !== -1) {
        callback(neighbor);
        neighbor.marked = true;
      }
    }
  }

  checkSolution() {
    if (this.currentTile === this.endTile) {
      console.log("Comida encontrada");
      this.found = true;
      return true;
    }
    return false;
  }

  noSolutionHandler() {
    console.log("Comida não encontrada :(");
    this.noSolution = true;
    noLoop();
  }
}

class BFS extends Search {
  find() {
    if (this.queue.length > 0) {
      if (!this.checkSolution()) {
        this.processCurrentTile();
        this.processNeighbors((neighbor) => {
          neighbor.previous = this.currentTile;
          this.queue.push(neighbor);
        });
      }
    } else {
      this.noSolutionHandler();
    }
  }
}

class DFS extends Search {
  find() {
    if (this.queue.length > 0) {
      if (!this.checkSolution()) {
        this.processCurrentTile();
        this.processNeighbors((neighbor) => {
          neighbor.previous = this.currentTile;
          this.queue.unshift(neighbor);
        });
      }
    } else {
      this.noSolutionHandler();
    }
  }
}

class Greedy extends Search {
  constructor(gridMap) {
    super(gridMap);
    this.startTile.h = this.distance(this.startTile, this.endTile);
  }

  find() {
    if (this.queue.length > 0) {
      this.queue.sort((a, b) => a.h - b.h);
      if (!this.checkSolution()) {
        this.processCurrentTile();
        this.processNeighbors((neighbor) => {
          let tempDistance = this.distance(this.currentTile, this.endTile);
          if (!neighbor.marked || tempDistance < neighbor.h) {
            neighbor.h = tempDistance;
            neighbor.previous = this.currentTile;
            this.queue.push(neighbor);
          }
        });
      }
    } else {
      this.noSolutionHandler();
    }
  }
}

class UniformCost extends Search {
  constructor(gridMap) {
    super(gridMap);
    this.startTile.g = this.startTile.cost;
  }

  find() {
    if (this.queue.length > 0) {
      this.queue.sort((a, b) => a.g - b.g);
      if (!this.checkSolution()) {
        this.processCurrentTile();
        this.processNeighbors((neighbor) => {
          let tempDistance = this.currentTile.g + neighbor.cost;
          if (!neighbor.marked || tempDistance < neighbor.g) {
            neighbor.g = tempDistance;
            neighbor.previous = this.currentTile;
            this.queue.push(neighbor);
          }
        });
      }
    } else {
      this.noSolutionHandler();
    }
  }
}

class AStar extends Search {
  constructor(gridMap) {
    super(gridMap);
    this.startTile.h = this.distance(this.startTile, this.endTile);
    this.startTile.g = this.startTile.cost;
    this.startTile.f = this.startTile.h + this.startTile.g;
  }

  find() {
    if (this.queue.length > 0) {
      this.queue.sort((a, b) => a.f - b.f);
      if (!this.checkSolution()) {
        this.processCurrentTile();
        this.processNeighbors((neighbor) => {
          let tempH = this.distance(this.currentTile, this.endTile);
          let tempG = this.currentTile.g + neighbor.cost;
          let tempF = tempH + tempG;
          if (!neighbor.marked || tempF < neighbor.f) {
            neighbor.h = tempH;
            neighbor.g = tempG;
            neighbor.f = tempF;
            neighbor.previous = this.currentTile;
            this.queue.push(neighbor);
          }
        });
      }
    } else {
      this.noSolutionHandler();
    }
  }
}