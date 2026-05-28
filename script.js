const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let target = { x: innerWidth/2, y: innerHeight/2 };
let pos = { x: innerWidth/2, y: innerHeight/2 };
let vel = { x: 0, y: 0 };
let angle = 0;

window.addEventListener("mousemove", e => {
  target.x = e.clientX;
  target.y = e.clientY;
});

function move(){

  let dx = target.x - pos.x;
  let dy = target.y - pos.y;

  vel.x = (vel.x + dx * 0.08) * 0.78;
  vel.y = (vel.y + dy * 0.08) * 0.78;

  pos.x += vel.x;
  pos.y += vel.y;

  angle = Math.atan2(dy, dx);
}

function draw(){

  let speed = Math.abs(vel.x) + Math.abs(vel.y);
  let rage = Math.min(speed / 10, 1);

  let color = rage > 0.6 ? "#ff2e2e" : "#00ff88";

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(angle);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.shadowBlur = 20;
  ctx.shadowColor = color;
  ctx.lineWidth = 2;

  let t = Date.now() * 0.005;

  // بدن
  for(let i=0;i<4;i++){
    ctx.beginPath();
    ctx.ellipse(0, i*16, 10 - i*1.2, 7, 0, 0, Math.PI*2);
    ctx.stroke();
  }

  // پاها
  for(let i=0;i<4;i++){

    let y = 18 + i*16;
    let wave = Math.sin(t*5 + i) * 4;

    drawLeg(-1, y, wave);
    drawLeg(1, y, -wave);
  }

  // چشم
  ctx.beginPath();
  ctx.arc(6,-8,3,0,Math.PI*2);
  ctx.arc(-6,-8,3,0,Math.PI*2);
  ctx.fill();

  ctx.restore();
}

function drawLeg(side, y, wave){

  let x0 = side * 5;
  let y0 = y;

  let x1 = side * (25 + wave);
  let y1 = y + 8;

  let x2 = side * (45 + wave);
  let y2 = y + 18;

  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function loop(){

  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  move();
  draw();

  requestAnimationFrame(loop);
}

loop();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
