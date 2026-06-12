let nodes = [];
const maxNodes = 65;
const maxDistance = 110;

function setup() {
  let wrapper = document.getElementById('canvas-wrapper');
  let canvasSize = Math.min(wrapper.offsetWidth, 480);
  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('canvas-wrapper');
  
  for (let i = 0; i < maxNodes; i++) {
    nodes.push(new Node());
  }
}

function draw() {
  clear(); 
  
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].move();
    nodes[i].display();
    
    for (let j = i + 1; j < nodes.length; j++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      if (d < maxDistance) {
        let alpha = map(d, 0, maxDistance, 90, 0);
        stroke(74, 222, 128, alpha); 
        strokeWeight(1);
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      }
    }
  }
}

function windowResized() {
  let wrapper = document.getElementById('canvas-wrapper');
  let canvasSize = Math.min(wrapper.offsetWidth, 480);
  resizeCanvas(canvasSize, canvasSize);
}

class Node {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-0.6, 0.6);
    this.vy = random(-0.6, 0.6);
    this.radius = random(3, 6);
  }
  
  move() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
    
    let dMouse = dist(mouseX, mouseY, this.x, this.y);
    