class vector{
  constructor(dx, dy, t){
    this.v = createVector(dx, dy);
    this.vmag = this.v.mag();
    this.theta = this.v.heading();
    this.t = t;
  }
  
  show(particle,f,yoff){
    if (this.vmag<25){
      return
    }
    push();
    fill(0);
    translate(particle.x,particle.y);
    rotate(this.theta);
    line(0,yoff,this.vmag*f-25,yoff);
    translate(this.vmag*f-25,yoff);
    triangle(0,5,8,0,0,-5);
    pop();
  }
  
}
