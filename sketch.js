let particles = [];
let vels;
let accs;
let TIME = 0;
let Npos = 15;

let XTselect;
let YTselect;
let VXTselect;
let VYTselect;
let AXTselect;
let AYTselect;
let CIRCselect;

let SHOWXT;
let SHOWYT;
let SHOWVXT;
let SHOWVYT;
let SHOWAXT;
let SHOWAYT;
let SHOWCIRC;
let SLIDER;

let CLEAR;
let SELECT;
let MODE;

let SP;

function setup() {
  let w = floor(windowWidth/(3*Npos));
  if ((w % 2)==0){
    w+=2;
  }
  w *= 3*Npos;
  let h = floor(windowHeight/(2*Npos));
  if ((h % 2)==0){
    h+=1;
  }
  h *= 2*Npos;
  createCanvas(w, h);
  textSize(18);
  textFont('Consolas');
  textStyle('bold');
  

  XTselect = createCheckbox("Show x-t");
  XTselect.style("font-family", "monospace");
  XTselect.style("font-weight", "bold");
  XTselect.position(5,5);

  YTselect = createCheckbox("Show y-t");
  YTselect.style("font-family", "monospace");
  YTselect.style("font-weight", "bold");
  YTselect.position(5,20);
  
  VXTselect = createCheckbox("Show vx-t");
  VXTselect.style("font-family", "monospace");
  VXTselect.style("font-weight", "bold");
  VXTselect.position(100,5);
  
  VYTselect = createCheckbox("Show vy-t");
  VYTselect.style("font-family", "monospace");
  VYTselect.style("font-weight", "bold");
  VYTselect.position(100,20);
  
  AXTselect = createCheckbox("Show ax-t");
  AXTselect.style("font-family", "monospace");
  AXTselect.style("font-weight", "bold");
  AXTselect.position(195,5);
  
  AYTselect = createCheckbox("Show ay-t");
  AYTselect.style("font-family", "monospace");
  AYTselect.style("font-weight", "bold");
  AYTselect.position(195,20);

  SELECT = createSelect();
  SELECT.style("font-family", "monospace");
  SELECT.style("font-weight", "bold");
  SELECT.position(125,40);
  SELECT.option("Freeform");
  SELECT.option("Circular Motion");
  SELECT.option("Projectile Motion");
  SELECT.selected("Freeform")
  
  CLEAR = createButton('CLEAR POINTS');
  CLEAR.style("font-family", "monospace");
  CLEAR.style("font-weight", "bold");
  CLEAR.mousePressed(EMPTY);
  CLEAR.position(5,40);

  SLIDER = createSlider(0, 90, 45, 1);
  SLIDER.position(125, 60);
  SLIDER.style('width', '155px');
}

function draw() {
  background(220);

  SHOWXT = XTselect.checked();
  SHOWYT = YTselect.checked();
  SHOWVXT = VXTselect.checked();
  SHOWVYT = VYTselect.checked();
  SHOWAXT = AXTselect.checked();
  SHOWAYT = AYTselect.checked();
  MODE = SELECT.selected();
  push();
  stroke(150);
  setLineDash([5, 5]);
  for (let i = Npos; i < width/2; i += Npos) {
    line(i, 5*Npos, i, height);
  }
  for (let i = 5*Npos; i < height; i += Npos) {
    line(0, i, width/2, i);
  }
  pop();

  push();
  strokeWeight(2);
  line(width/4, 5*Npos, width/4, height);
  line(0, height/2, width/2, height/2);
  pop();

  if (MODE =='Freeform'){
    SLIDER.hide();
  } else {
    SLIDER.show();
  }

  if (MODE=='Circular Motion'){
    TIME = 0
    particles = [];
    let rad = SLIDER.value()
    for (let i=0; i<20; i++){
      let px = 3*rad*cos(2*PI*i/20)+width/4;
      let py = -3*rad*sin(2*PI*i/20)+height/2;
      let p = new particle(px,py,TIME);
      append(particles,p);
      TIME+=1;
    }
  }

  if (MODE=='Projectile Motion'){
    TIME = 0
    particles = [];
    let v = width/40;
    let th = SLIDER.value()*PI/180;
    let vx = v*cos(th);
    let vy = -v*sin(th);
    let a = Npos/8;
    let Imax = round(2*abs(vy)/a);
    let px = 0;
    let py = 0;
    let i = 0;
    while (px<width/2){
      px = vx*i;
      py = height/2 + vy*i + a*pow(i,2);
      if (px>width/2){
        break
      }
      if (py>height){
        break
      }
      let p = new particle(px,py,TIME);
      append(particles,p);
      TIME+=1;
      i+=1;
    }
  }

  vels = [];
  for (let i = 0; i < particles.length - 1; i++) {
    vx =
      (particles[i + 1].x - particles[i].x) /
      (particles[i + 1].t - particles[i].t);
    vy =
      (particles[i + 1].y - particles[i].y) /
      (particles[i + 1].t - particles[i].t);
    let v = new vector(vx, vy, particles[i].t);
    v.show(particles[i], 1, 0);
    append(vels, v);
  }

  accs = [];
  for (let i = 0; i < vels.length - 1; i++) {
    ax = (vels[i + 1].v.x - vels[i].v.x) / (vels[i + 1].t - vels[i].t);
    ay = (vels[i + 1].v.y - vels[i].v.y) / (vels[i + 1].t - vels[i].t);
    let a = new vector(ax, ay, particles[i].t);
    if (SHOWCIRC){
      a.show(particles[i+1],3,0);
    }
    append(accs, a);
  }
  


  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
  }

  s = max([particles.length, 15]);
  SP = (width/6-50) / s;

  if (SHOWXT) {
    showXT();
  }
  if (SHOWYT) {
    showYT();
  }
  if (SHOWVXT) {
    showVXT();
  }
  if (SHOWVYT) {
    showVYT();
  }
  if (SHOWAXT) {
    showAXT();
  }
  if (SHOWAYT) {
    showAYT();
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function EMPTY(){
  particles = [];
  TIME = 0;
}

function mouseClicked() {
  let px = round(mouseX / Npos) * Npos;
  let py = round(mouseY / Npos) * Npos;
  if (px > width/2) {
    return;
  }
  if (py < 5*Npos) {
    return;
  }
  if (SHOWCIRC){
    return;
  }
  let np = new particle(px, py, TIME);
  append(particles, np);
  TIME += 1;
}

function showXT() {
  push();
  translate(width/2,height/6);
  strokeWeight(2);
  line(50, -height/6+5, 50, height/6-5);
  line(25, 0, width/6, 0)

  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("x (m)", 35, 30);
  
  rotate(PI / 2);
  text("t (s)", width/12+25, height/6-5);

  fill(0);
  for (let i = 0; i < particles.length; i++) {
    let px = (height/3-10)*(particles[i].x - width/4) / height;
    let pt = particles[i].t * SP + 50;
    circle(pt, -px, 10);
  }
  pop();
}

function showYT() {
  push();
  translate(3*width/4,height/6);
  strokeWeight(2);
  line(50, -height/6+5, 50, height/6-5);
  line(25, 0, width/6, 0)

  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("y (m)", 35, 30);
  
  rotate(PI / 2);
  text("t (s)", width/12+25, height/6-5);

  fill(0);
  for (let i = 0; i < particles.length; i++) {
    let py = (height/3-10)*(particles[i].y - height/2) / height;
    let pt = particles[i].t * SP + 50;
    circle(pt, py, 10);
  }
  pop();
}

function showVXT() {
  push();
  translate(width/2,height/3+height/6);
  strokeWeight(2);
  line(50, -height/6+5, 50, height/6-5);
  line(25, 0, width/6, 0)

  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("vₓ (m/s)", 45, 30);
  
  rotate(PI / 2);
  text("t (s)", width/12+25, height/6-5);

  fill(0);
  for (let i = 0; i < vels.length; i++) {
    let px = vels[i].v.x / 2;
    let py = vels[i].v.y / 2;
    let pt = vels[i].t * SP+50;
    circle(pt, -px, 10);
  }
  pop();
}

function showVYT() {
  push();
  translate(3*width/4,height/3+height/6);
  strokeWeight(2);
  line(50, -height/6+5, 50, height/6-5);
  line(25, 0, width/6, 0)

  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("vᵧ (m/s)", 45, 30);
  
  rotate(PI / 2);
  text("t (s)", width/12+25, height/6-5);

  fill(0);
  for (let i = 0; i < vels.length; i++) {
    let px = vels[i].v.x / 2;
    let py = vels[i].v.y / 2;
    let pt = vels[i].t * SP + 50;
    circle(pt, py, 10);
  }
  pop();
}

function showAXT() {
  push();
  translate(width/2,5*height/6);
  strokeWeight(2);
  line(50, -height/6+5, 50, height/6-5);
  line(25, 0, width/6, 0)

  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("aₓ (m/s²)", 50, 30);
  
  rotate(PI / 2);
  text("t (s)", width/12+25, height/6-5);

  fill(0);
  for (let i = 0; i < accs.length; i++) {
    let px = accs[i].v.x*3;
    let pt = accs[i].t * SP+50;
    circle(pt, -px, 10);
  }
  pop();
}

function showAYT() {
  push();
  translate(3*width/4,5*height/6);
  strokeWeight(2);
  line(50, -height/6+5, 50, height/6-5);
  line(25, 0, width/6, 0)

  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("aᵧ (m/s²)", 50, 30);
  
  rotate(PI / 2);
  text("t (s)", width/12+25, height/6-5);

  fill(0);
  for (let i = 0; i < accs.length; i++) {
    let py = accs[i].v.y*3;
    let pt = accs[i].t * SP+50;
    circle(pt, py, 10);
  }
  pop();
}
