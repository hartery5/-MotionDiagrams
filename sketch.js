let particles = [];
let vels;
let accs;
let TIME = 0;
let Npos = 20;

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

let CLEAR;

let SP;

function setup() {
  createCanvas(1200, 520);
  textSize(18);

  XTselect = createCheckbox("Show x-t");
  XTselect.style("font-family", "monospace");
  XTselect.style("font-weight", "bold");
  
  YTselect = createCheckbox("Show y-t");
  YTselect.style("font-family", "monospace");
  YTselect.style("font-weight", "bold");
  
  VXTselect = createCheckbox("Show vx-t");
  VXTselect.style("font-family", "monospace");
  VXTselect.style("font-weight", "bold");
  
  VYTselect = createCheckbox("Show vy-t");
  VYTselect.style("font-family", "monospace");
  VYTselect.style("font-weight", "bold");
  
  AXTselect = createCheckbox("Show ax-t");
  AXTselect.style("font-family", "monospace");
  AXTselect.style("font-weight", "bold");
  
  AYTselect = createCheckbox("Show ay-t");
  AYTselect.style("font-family", "monospace");
  AYTselect.style("font-weight", "bold");
  
  CIRCselect = createCheckbox("Show Circular Motion");
  CIRCselect.style("font-family", "monospace");
  CIRCselect.style("font-weight", "bold");
  
  CLEAR = createButton('CLEAR POINTS');
  CLEAR.style("font-family", "monospace");
  CLEAR.style("font-weight", "bold");
  CLEAR.mousePressed(EMPTY);
}

function draw() {
  background(220);

  SHOWXT = XTselect.checked();
  SHOWYT = YTselect.checked();
  SHOWVXT = VXTselect.checked();
  SHOWVYT = VYTselect.checked();
  SHOWAXT = AXTselect.checked();
  SHOWAYT = AYTselect.checked();
  SHOWCIRC = CIRCselect.checked();

  push();
  stroke(150);
  setLineDash([5, 5]);
  for (let i = Npos; i < 600; i += Npos) {
    line(i, 0, i, height);
  }
  for (let i = Npos; i < height; i += Npos) {
    line(0, i, 600, i);
  }
  pop();

  line(300, 0, 300, 600);
  line(0, height/2, 600, height/2);
  
  if (SHOWCIRC){
    TIME = 0
    particles = [];
    for (let i=0; i<20; i++){
      let px = 200*cos(2*PI*i/20)+300;
      let py = -200*sin(2*PI*i/20)+height/2;
      let p = new particle(px,py,TIME);
      append(particles,p);
      TIME+=1;
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
  SP = 250 / s;

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
  let px = round(mouseX / 10) * 10;
  let py = round(mouseY / 10) * 10;
  if (px > 600) {
    return;
  }
  if (py > (height-20)) {
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
  strokeWeight(2);
  line(650, 5, 650, 145);
  line(625, 75, 900, 75)
  pop();

  push();
  translate(610, 75);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("x (m)", 0, 0);
  pop();

  push();
  fill(0);
  translate(650, 75);
  for (let i = 0; i < particles.length; i++) {
    let px = (particles[i].x - 300) / 5;
    let pt = particles[i].t * SP;
    circle(pt, -px, 10);
  }
  pop();
}

function showYT() {
  push();
  strokeWeight(2);
  line(950, 5, 950, 145);
  line(925, 75, 1200, 75);
  pop();

  push();
  translate(910, 75);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("y (m)", 0, 0);
  pop();

  push();
  fill(0);
  translate(950, 75);
  for (let i = 0; i < particles.length; i++) {
    let py = (particles[i].y - height/2) / 5;
    let pt = particles[i].t * SP;
    circle(pt, py, 10);
  }
  pop();
}

function showVXT() {
  push();
  strokeWeight(2);
  line(650, 155, 650, 295);
  line(625, 225, 900, 225);
  pop();

  push();
  translate(610, 225);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("vx (m/s)", 0, 0);
  pop();

  push();
  fill(0);
  translate(650, 225);
  for (let i = 0; i < vels.length; i++) {
    let px = vels[i].v.x / 2;
    let py = vels[i].v.y / 2;
    let pt = vels[i].t * SP;
    circle(pt, -px, 10);
  }
  pop();
}

function showVYT() {
  push();
  strokeWeight(2);
  line(950, 155, 950, 295);
  line(925, 225, 1200, 225);
  pop();

  push();
  translate(910, 225);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("vy (m/s)", 0, 0);
  pop();

  push();
  fill(0);
  translate(950, 225);
  for (let i = 0; i < vels.length; i++) {
    let px = vels[i].v.x / 2;
    let py = vels[i].v.y / 2;
    let pt = vels[i].t * SP;
    circle(pt, py, 10);
  }
  pop();
}

function showAXT() {
  push();
  strokeWeight(2);
  line(650, 305, 650, 445);
  line(625, 375, 900, 375);
  pop();

  push();
  translate(610, 375);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("ax (m/s²)", 0, 0);
  pop();

  push();
  fill(0);
  translate(650, 375);
  for (let i = 0; i < accs.length; i++) {
    let px = accs[i].v.x / 2;
    let py = accs[i].v.y / 2;
    let pt = accs[i].t * SP;
    circle(pt, -px, 10);
  }
  pop();
}

function showAYT() {
  push();
  strokeWeight(2);
  line(950, 305, 950, 445);
  line(925, 375, 1200, 375);
  pop();

  push();
  translate(910, 375);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("ay (m/s²)", 0, 0);
  pop();

  push();
  fill(0);
  translate(950, 375);
  for (let i = 0; i < accs.length; i++) {
    let px = accs[i].v.x;
    let py = accs[i].v.y;
    let pt = accs[i].t * SP;
    circle(pt, py, 10);
  }
  pop();
}
