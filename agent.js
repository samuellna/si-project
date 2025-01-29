class Agent {
  constructor(i, j, cellWidth, cellHeight) {
    Object.assign(this, { i, j, cellWidth, cellHeight, count: 0, current: null, target: null, targetPos: null, speed: null, velocity: null, route: null, food: null, foodPos: null, found: false });
    this.pos = createVector(i * cellWidth + cellWidth / 2, j * cellHeight + cellHeight / 2);
  }

  draw() {
    this.drawOnDescription(this.pos.x, this.pos.y);
  }

  drawOnDescription(x, y) {
    fill("red");
    strokeWeight(1);
    stroke("black");
    ellipse(x, y, this.cellWidth / 2, this.cellHeight / 2);
  }

  definePath(path) {
    if (!this.route) {
      this.route = path.route;
      
      // Usa at(-1) para pegar o último elemento da rota de forma mais elegante
      this.food = this.route.at(-1);
      this.foodPos = createVector(this.food.i * this.cellWidth + this.cellWidth / 2, this.food.j * this.cellHeight + this.cellHeight / 2);
      this.current = this.route.shift();
    }
  }

  defineTarget() {
    if (!this.target && this.route.length) {
      this.target = this.route.shift();
      this.targetPos = createVector(this.target.i * this.cellWidth + this.cellWidth / 2, this.target.j * this.cellHeight + this.cellHeight / 2);
    }
  }

  defineSpeed() {
    const speedMap = { 1: 10, 5: 3, 10: 1 };
    this.speed = speedMap[this.current?.cost] || 1;
  }

  defineDirection() {
    this.velocity = p5.Vector.sub(this.targetPos, this.pos).normalize().mult(this.speed);
  }

  hasReachedTarget() {
    if (p5.Vector.dist(this.targetPos, this.pos) > 1) {
      this.pos.add(this.velocity);
    } else {
      this.updatePosition();
    }
  }

  updatePosition() {
    this.count += this.current.cost;
    this.pos = this.targetPos;
    this.current = this.target;
    if (this.route.length) {
      this.target = this.route.shift();
      this.targetPos = createVector(this.target.i * this.cellWidth + this.cellWidth / 2, this.target.j * this.cellHeight + this.cellHeight / 2);
    }
  }

  hasReachedFood() {
    if (p5.Vector.dist(this.foodPos, this.pos) > 1) return false;
    
    this.count += this.current.cost;
    console.log("Food reached!!!");
    this.pos = this.foodPos;
    return true;
  }
}
