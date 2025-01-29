class EndMenu{
  constructor(){
    this.text = [
      'Para criar uma nova comida pressione "SPACE"',
      'Para voltar ao menu pressione "ENTER"'
    ]
  }
  draw(){
    let backgroundColor = color(255, 255, 255);
    backgroundColor.setAlpha(130);
    
    fill(backgroundColor);
    noStroke();
    rect(180, 300, 440, 100);
    
    fill("black");
    strokeWeight(1);
    stroke(1)
    textSize(18);
    textAlign(CENTER, CENTER);
    text(this.text[0], 200, 280, 400, 100);
    
    fill("black");
    strokeWeight(1);
    noStroke();
    textSize(18);
    textAlign(CENTER, CENTER);
    text(this.text[1], 200, 320, 400, 100);
    
  }
}