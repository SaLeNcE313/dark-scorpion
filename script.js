window.addEventListener("load", () => {

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let target = { x: canvas.width/2, y: canvas.height/2 };
let pos = { x: canvas.width/2, y: canvas.height/2 };
let vel = { x: 0, y: 0 };
let angle = 0;

window.addEventListener("mousemove", e => {
  target.x = e.clientX;
  target.y = e.clientY;
});

function move(){
  let dx = target.x - pos.x;
  let dy = target.y - pos.y;

  vel.x = (vel.x + dx * 0.08) * 0.75;
  vel.y = (vel.y + dy * 0.08) * 0.75;

  pos.x += vel.x;
  pos.y += vel.y;

  angle = Math.atan2(dy, dx);
}

function draw(){

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  let speed = Math.abs(vel.x) + Math.abs(vel.y);
  let rage = Math.min(speed / 10, 1);

  let color = rage > 0.6 ? "#ff2e2e" : "#00ff88";

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(angle);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.shadowBlur = 15;
  ctx.shadowColor = color;
  ctx.lineWidth = 2;

  let t = Date.now() * 0.005;

  // body
  for(let i=0;i<4;i++){
    ctx.beginPath();
    ctx.ellipse(0, i*16, 10 - i*1.2, 7, 0, 0, Math.PI*2);
    ctx.stroke();
  }

  // legs
  for(let i=0;i<4;i++){

    let y = 18 + i*16;
    let wave = Math.sin(t*5 + i) * 4;

    ctx.beginPath();
    ctx.moveTo(-5,y);
    ctx.lineTo(-25 + wave,y+10);
    ctx.lineTo(-45 + wave,y+20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(5,y);
    ctx.lineTo(25 - wave,y+10);
    ctx.lineTo(45 - wave,y+20);
    ctx.stroke();
  }

  // eyes
  ctx.beginPath();
  ctx.arc(5,-8,3,0,Math.PI*2);
  ctx.arc(-5,-8,3,0,Math.PI*2);
  ctx.fill();

  ctx.restore();
}

function loop(){
  move();
  draw();
  requestAnimationFrame(loop);
}

loop();

});
