// states
let preloadState = false;
let searchState = false;
let traverseState = false;
let endState = false;

// searchTypes
// 0. None
// 1. BFS
// 2. DFS
// 3. Greedy Search
// 4. Uniform Cost Search
// 5. A* Search
let searchType = 0;


let foodEaten = 0;
// sleep fuction to stop execution and make it easier to see the search
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function setup() {
  let canvas = createCanvas(800, 700);
  canvas.position(10,30)
  gridMap = new GridMap(20,15);
  search = null;
  path = null;
  menuPage = new MenuPage();
  endMenu = new EndMenu();
  preloadState = true;
  board = new Board();
}

function draw() {
  
  background(220);
  if(preloadState){
    background(0);
    menuPage.draw();
    
    if (keyIsDown(97) || keyIsDown(49)) { // 1
      searchType = 1;
      search = new BFS(gridMap);
      path = new Path(search);
      preloadState = false;
      searchState = true;
    }
    if (keyIsDown(98) || keyIsDown(50)) { // 2
      searchType = 2;
      search = new DFS(gridMap);
      path = new Path(search);
      preloadState = false;
      searchState = true;
    }
    if (keyIsDown(99) || keyIsDown(51)) { // 3
      searchType = 3;
      search = new Greedy(gridMap);
      path = new Path(search);
      preloadState = false;
      searchState = true;
    }
    if (keyIsDown(100) || keyIsDown(52)) { // 4
      searchType = 4;
      search = new UniformCost(gridMap);
      path = new Path(search);
      preloadState = false;
      searchState = true;
    }
    if (keyIsDown(101) || keyIsDown(53)) { // 5
      searchType = 5;
      search = new AStar(gridMap);
      path = new Path(search);
      preloadState = false;
      searchState = true;
    }
  }
  
  if(searchState){
    background(0);
    gridMap.draw();
    search.find();
    path.draw(gridMap.cellWidth, gridMap.cellHeight);
    sleep(50);
    
    if(search.found){
      gridMap.clearMarkedAndVisited();
      searchState = false;
      traverseState = true;
    }
    board.draw(gridMap.agent.count, foodEaten, searchType);
  }
  
  if(traverseState){
    background(0);
    board.draw(gridMap.agent.count, foodEaten, searchType);
    gridMap.draw();
    path.draw(gridMap.cellWidth, gridMap.cellHeight, true);
    gridMap.agent.draw();
    gridMap.agent.definePath(path);
    gridMap.agent.defineTarget();
    gridMap.agent.defineSpeed();
    gridMap.agent.defineDirection();
    gridMap.agent.hasReachedTarget();
    
    // Reached the food and transition to ending menu
    if(gridMap.agent.hasReachedFood()){
      traverseState = false;
      endState = true;
      foodEaten++;
    }
    board.draw(gridMap.agent.count, foodEaten, searchType);
  }
  
  if(endState){ 
    gridMap.draw();
    path.draw(gridMap.cellWidth, gridMap.cellHeight, true);
    board.draw(gridMap.agent.count, foodEaten, searchType);
    
    endMenu.draw();
    
    if (keyIsDown(32)) { 
      gridMap.resetAgent();
      gridMap.agent = new Agent(
        gridMap.agent.i, 
        gridMap.agent.j, 
        gridMap.cellWidth, 
        gridMap.cellHeight
      );
      gridMap.generateNewFood();
      if(searchType == 1){
        search = new BFS(gridMap);
      }
      else if(searchType == 2){
        search = new DFS(gridMap);
      }
      else if(searchType == 3){
        gridMap.resetHeuristics();
        search = new Greedy(gridMap);
      }
      else if(searchType == 4){
        gridMap.resetHeuristics();
        search = new UniformCost(gridMap);
      }
      else if(searchType == 5){
        gridMap.resetHeuristics();
        search = new AStar(gridMap);
      }      
      
      path = new Path(search);
      gridMap.clearPrevious();
      endState = false;
      searchState = true;
    }
    if (keyIsDown(ENTER)) {
      gridMap = new GridMap(20,20);
      searchType = 0;
      foodEaten = 0;
      endState = false;
      preloadState = true;
    }  
  }
}