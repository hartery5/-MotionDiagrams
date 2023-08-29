let particles = [];
let TIME = 0;
let Npos = 20;

let XTselect;
let YTselect;
let VXTselect;
let VYTselect;
let AXTselect;
let AYTselect;

let SHOWXT;
let SHOWYT;
let SHOWVXT;
let SHOWVYT;
let SHOWAXT;
let SHOWAYT;

let CLEAR;

let SP;

function setup() {
  createCanvas(1200, 600);
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

  push();
  stroke(150);
  setLineDash([5, 5]);
  for (let i = Npos; i < 600; i += Npos) {
    line(i, 0, i, 600);
  }
  for (let i = Npos; i < 600; i += Npos) {
    line(0, i, 600, i);
  }
  pop();

  line(300, 0, 300, 600);
  line(0, 300, 600, 300);

  let vels = [];
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

  let accs = [];
  for (let i = 0; i < vels.length - 1; i++) {
    ax = (vels[i + 1].v.x - vels[i].v.x) / (vels[i + 1].t - vels[i].t);
    ay = (vels[i + 1].v.y - vels[i].v.y) / (vels[i + 1].t - vels[i].t);
    let a = new vector(ax, ay, particles[i].t);
    //a.show(particles[i],2,10);
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
  if (py > 580) {
    return;
  }
  let np = new particle(px, py, TIME);
  append(particles, np);
  TIME += 1;
}

function showXT() {
  push();
  strokeWeight(2);
  line(650, 5, 650, 195);
  line(625, 100, 900, 100);
  pop();

  push();
  translate(610, 100);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("Position, x (m)", 0, 0);
  pop();

  push();
  fill(0);
  translate(650, 100);
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
  line(950, 5, 950, 195);
  line(925, 100, 1200, 100);
  pop();

  push();
  translate(910, 100);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("Position, y (m)", 0, 0);
  pop();

  push();
  fill(0);
  translate(950, 100);
  for (let i = 0; i < particles.length; i++) {
    let py = (particles[i].y - 300) / 5;
    let pt = particles[i].t * SP;
    circle(pt, py, 10);
  }
  pop();
}

function showVXT() {
  push();
  strokeWeight(2);
  line(650, 205, 650, 395);
  line(625, 300, 900, 300);
  pop();

  push();
  translate(610, 300);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("Velocity, vx (m/s)", 0, 0);
  pop();

  push();
  fill(0);
  translate(650, 300);
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
  line(950, 205, 950, 395);
  line(925, 300, 1200, 300);
  pop();

  push();
  translate(910, 300);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("Velocity, vy (m/s)", 0, 0);
  pop();

  push();
  fill(0);
  translate(950, 300);
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
  line(650, 405, 650, 595);
  line(625, 500, 900, 500);
  pop();

  push();
  translate(610, 500);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("Acceleration, ax (m/s²)", 0, 0);
  pop();

  push();
  fill(0);
  translate(650, 500);
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
  line(950, 405, 950, 595);
  line(925, 500, 1200, 500);
  pop();

  push();
  translate(910, 500);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text("Acceleration, ay (m/s²)", 0, 0);
  pop();

  push();
  fill(0);
  translate(950, 500);
  for (let i = 0; i < accs.length; i++) {
    let px = accs[i].v.x;
    let py = accs[i].v.y;
    let pt = accs[i].t * SP;
    circle(pt, py, 10);
  }
  pop();
}
