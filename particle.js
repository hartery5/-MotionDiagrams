class particle {
  constructor (x, y, t){
    this.x = x;
    this.y = y;
    this.t = t;
  }
  
  show(){
    push();
    stroke(0);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.t, this.x,this.y-10)
    circle(this.x, this.y, 10);
    pop();
  }
  
}
