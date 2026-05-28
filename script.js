const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let target = { x: canvas.width/2, y: canvas.height/2 };
let pos = { x: canvas.width/2, y: canvas.height/2 };

window.addEventListener("mousemove", e => {
  target.x = e.clientX;
  target.y = e.clientY;
});

window.addEventListener("touchmove", e => {
  target.x = e.touches[0].clientX;
  target.y = e.touches[0].clientY;
});

// 🎯 محاسبه زاویه حرکت
function angleToTarget(){
  return Math.atan2(target.y - pos.y, target.x - pos.x);
}

function drawScorpion(){

  // ⚡ حرکت نرم بدن
  pos.x += (target.x - pos.x) * 0.06;
  pos.y += (target.y - pos.y) * 0.06;

  let angle = angleToTarget();

  let dx = target.x - pos.x;
  let dy = target.y - pos.y;
  let dist = Math.sqrt(dx*dx + dy*dy);

  let rage = Math.max(0, 1 - dist / 450);

  let time = Date.now() * 0.005;

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(angle); // 🧠 بدن به سمت موس می‌چرخد

  let color = rage > 0.5 ? "#ff2e2e" : "#00ff88";

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.shadowBlur = 20 + rage * 30;
  ctx.shadowColor = color;
  ctx.lineWidth = 2;

  // 🧬 ستون فقرات (بدن واقعی‌تر)
  for(let i = 0; i < 8; i++){
    ctx.beginPath();
    ctx.arc(0, i * 20, 6, 0, Math.PI*2);
    ctx.stroke();
  }

  // 🦂 دم (با چرخش بدن هماهنگ)
  ctx.beginPath();
  ctx.moveTo(0, 150);
  ctx.quadraticCurveTo(60, 80, 90, 10);
  ctx.stroke();

  // نیش
  ctx.beginPath();
  ctx.arc(90, 10, 4 + rage, 0, Math.PI*2);
  ctx.fill();

  // 🦵 پاها (joint واقعی + چرخش بدن)
  for(let i = 0; i < 5; i++){

    let y = 20 + i * 25;

    let move = Math.sin(time * 3 + i) * (0.4 + rage * 0.8);

    drawLeg(y, move, color);
  }

  // 👁 چشم
  ctx.beginPath();
  ctx.arc(-6, -8, 3 + rage, 0, Math.PI*2);
  ctx.arc(6, -8, 3 + rage, 0, Math.PI*2);
  ctx.fill();

  ctx.restore();
}

// 🦵 پای مفصلی واقعی (چرخشی)
function drawLeg(y, move, color){

  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  let base = { x: 0, y };

  let a1 = move;
  let a2 = move * 1.5;
  let a3 = move * 2;

  // segment 1
  let x1 = base.x + Math.cos(a1) * 25;
  let y1 = base.y + Math.sin(a1) * 10;

  // segment 2
  let x2 = x1 + Math.cos(a2) * 30;
  let y2 = y1 + Math.sin(a2) * 15;

  // segment 3
  let x3 = x2 + Math.cos(a3) * 25;
  let y3 = y2 + Math.sin(a3) * 10;

  ctx.beginPath();
  ctx.moveTo(base.x, base.y);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  // joints
  ctx.beginPath();
  ctx.arc(x1, y1, 2, 0, Math.PI*2);
  ctx.arc(x2, y2, 2, 0, Math.PI*2);
  ctx.fill();
}

// ✨ ذرات
function stars(){
  for(let i=0;i<2;i++){
    ctx.fillStyle = "rgba(0,255,100,0.15)";
    ctx.beginPath();
    ctx.arc(
      Math.random()*canvas.width,
      Math.random()*canvas.height,
      Math.random()*2,
      0,
      Math.PI*2
    );
    ctx.fill();
  }
}

// 🎬 انیمیشن
function animate(){
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars();
  drawScorpion();

  requestAnimationFrame(animate);
}

animate();

// 📏 ریسایز
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
