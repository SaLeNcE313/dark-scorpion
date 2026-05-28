const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🎯 هدف (موس / لمس)
let target = { x: canvas.width/2, y: canvas.height/2 };

// 🧲 موقعیت + سرعت واقعی
let pos = { x: canvas.width/2, y: canvas.height/2 };
let vel = { x: 0, y: 0 };

window.addEventListener("mousemove", e => {
  target.x = e.clientX;
  target.y = e.clientY;
});

window.addEventListener("touchmove", e => {
  target.x = e.touches[0].clientX;
  target.y = e.touches[0].clientY;
});

// 🧠 حرکت نرم واقعی (inertia)
function move(){

  let ax = (target.x - pos.x) * 0.08;
  let ay = (target.y - pos.y) * 0.08;

  vel.x = (vel.x + ax) * 0.85;
  vel.y = (vel.y + ay) * 0.85;

  pos.x += vel.x;
  pos.y += vel.y;
}

function drawScorpion(){

  let dx = target.x - pos.x;
  let dy = target.y - pos.y;
  let dist = Math.sqrt(dx*dx + dy*dy);

  let rage = Math.max(0, 1 - dist / 450);

  let color = rage > 0.5 ? "#ff2e2e" : "#00ff88";

  let time = Date.now() * 0.004;

  ctx.save();
  ctx.translate(pos.x, pos.y);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.shadowBlur = 20 + rage * 30;
  ctx.shadowColor = color;
  ctx.lineWidth = 2;

  // 🧬 ستون فقرات دایره‌ای
  for(let i = 0; i < 8; i++){
    ctx.beginPath();
    ctx.arc(0, i * 20, 7, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 🔗 اتصال بدن
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,140);
  ctx.stroke();

  // 🦂 دم
  ctx.beginPath();
  ctx.moveTo(0,140);
  ctx.quadraticCurveTo(50,80,80,10);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(80,10,4,0,Math.PI*2);
  ctx.fill();

  // 🦵 پاها (فقط وقتی حرکت می‌کند)
  let moving = Math.abs(vel.x) + Math.abs(vel.y) > 0.2;

  for(let i=0;i<5;i++){

    let y = 20 + i*22;
    let wave = moving ? Math.sin(time*6+i) * 8 : 0;

    ctx.beginPath();
    ctx.moveTo(-5,y);
    ctx.lineTo(-30 + wave,y+10);
    ctx.lineTo(-60 + wave,y+20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(5,y);
    ctx.lineTo(30 - wave,y+10);
    ctx.lineTo(60 - wave,y+20);
    ctx.stroke();
  }

  // 👁 چشم
  ctx.beginPath();
  ctx.arc(-6,-8,3+rage,0,Math.PI*2);
  ctx.arc(6,-8,3+rage,0,Math.PI*2);
  ctx.fill();

  ctx.restore();
}

// ✨ پس‌زمینه
function stars(){
  for(let i=0;i<2;i++){
    ctx.fillStyle = "rgba(0,255,100,0.12)";
    ctx.beginPath();
    ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, 2, 0, Math.PI*2);
    ctx.fill();
  }
}

// 🎬 loop اصلی
function animate(){

  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  move();
  stars();
  drawScorpion();

  requestAnimationFrame(animate);
}

animate();

// 📏 resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
