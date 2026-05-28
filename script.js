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

function drawScorpion(){

  // ⚡ حرکت نرم (نه پرشی)
  pos.x += (target.x - pos.x) * 0.08;
  pos.y += (target.y - pos.y) * 0.08;

  let dx = target.x - pos.x;
  let dy = target.y - pos.y;
  let dist = Math.sqrt(dx*dx + dy*dy);

  let rage = Math.max(0, 1 - dist / 400);

  let time = Date.now() * 0.005;

  ctx.save();
  ctx.translate(pos.x, pos.y);

  let color = rage > 0.5 ? "#ff2e2e" : "#00ff88";

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.shadowBlur = 15 + rage * 25;
  ctx.shadowColor = color;
  ctx.lineWidth = 2;

  // 🧬 بدن (ساده و واضح)
  for(let i = 0; i < 7; i++){
    let y = i * 22;

    ctx.beginPath();
    ctx.ellipse(0, y, 10, 14, 0, 0, Math.PI*2);
    ctx.stroke();
  }

  // 🦂 دم (طبیعی‌تر)
  ctx.beginPath();
  ctx.moveTo(0, 140);
  ctx.quadraticCurveTo(
    40,
    80,
    70,
    10
  );
  ctx.stroke();

  // نیش
  ctx.beginPath();
  ctx.arc(70, 10, 4, 0, Math.PI*2);
  ctx.fill();

  // 🦵 پاها (واقعی‌تر: کم‌نوسان + مفصلی)
  for(let i = 0; i < 5; i++){

    let y = 20 + i * 25;

    let baseAngle = Math.sin(time * 2) * 0.3; // خیلی کم حرکت

    // چپ پا (3 مفصل)
    drawLeg(-1, y, baseAngle);

    // راست پا
    drawLeg(1, y, -baseAngle);
  }

  // 👁 چشم
  ctx.beginPath();
  ctx.arc(-6, -10, 3 + rage, 0, Math.PI*2);
  ctx.arc(6, -10, 3 + rage, 0, Math.PI*2);
  ctx.fill();

  ctx.restore();
}

// 🦵 ساخت پا واقعی (مفصلی)
function drawLeg(side, y, angle){

  let x0 = side * 5;
  let y0 = y;

  let x1 = side * (25 + angle * 10);
  let y1 = y + 10;

  let x2 = side * (50 + angle * 15);
  let y2 = y + 25;

  let x3 = side * (70 + angle * 20);
  let y3 = y + 35;

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  // مفصل‌ها
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

function animate(){
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars();
  drawScorpion();

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
