const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🎯 هدف (موس / لمس)
let target = { x: canvas.width / 2, y: canvas.height / 2 };

// 🧲 موقعیت نرم عقرب
let pos = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener("mousemove", e => {
  target.x = e.clientX;
  target.y = e.clientY;
});

window.addEventListener("touchmove", e => {
  target.x = e.touches[0].clientX;
  target.y = e.touches[0].clientY;
});

// 🧠 فاصله قبلی برای تشخیص حرکت
let prev = { x: pos.x, y: pos.y };

function drawScorpion(){

  // ⚡ حرکت نرم و دقیق
  pos.x += (target.x - pos.x) * 0.07;
  pos.y += (target.y - pos.y) * 0.07;

  let dx = target.x - pos.x;
  let dy = target.y - pos.y;
  let dist = Math.sqrt(dx*dx + dy*dy);

  let rage = Math.max(0, 1 - dist / 400);

  // 🧠 تشخیص حرکت واقعی
  let moving = Math.abs(pos.x - prev.x) + Math.abs(pos.y - prev.y) > 0.2;
  prev.x = pos.x;
  prev.y = pos.y;

  let time = Date.now() * 0.004;

  ctx.save();
  ctx.translate(pos.x, pos.y);

  let color = rage > 0.5 ? "#ff2e2e" : "#00ff88";

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.shadowBlur = 18 + rage * 25;
  ctx.shadowColor = color;
  ctx.lineWidth = 2;

  // 🧬 ستون فقرات مهره‌ای (دایره‌ای تمیز)
  let spine = [];
  for(let i = 0; i < 8; i++){
    let y = i * 20;

    spine.push({ y });

    ctx.beginPath();
    ctx.arc(0, y, 7, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(0, spine[0].y);
  for(let i = 1; i < spine.length; i++){
    ctx.lineTo(0, spine[i].y);
  }
  ctx.stroke();

  // 🦂 دم
  ctx.beginPath();
  ctx.moveTo(0, 140);
  ctx.quadraticCurveTo(50, 80, 80, 10);
  ctx.stroke();

  // نیش
  ctx.beginPath();
  ctx.arc(80, 10, 4 + rage, 0, Math.PI * 2);
  ctx.fill();

  // 🦵 پاها (فقط هنگام حرکت)
  for(let i = 0; i < 5; i++){

    let y = 20 + i * 22;

    let moveAmp = moving ? (6 + rage * 10) : 0;

    let wave = Math.sin(time * 6 + i) * moveAmp;

    drawLeg(-1, y, wave, color, moving);
    drawLeg(1, y, -wave, color, moving);
  }

  // 👁 چشم‌ها
  ctx.beginPath();
  ctx.arc(-6, -8, 3 + rage, 0, Math.PI * 2);
  ctx.arc(6, -8, 3 + rage, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// 🦵 پای مفصلی حرفه‌ای
function drawLeg(side, y, wave, color, moving){

  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  let x0 = side * 5;
  let y0 = y;

  let x1 = side * (25 + wave);
  let y1 = y + 10;

  let x2 = side * (50 + wave);
  let y2 = y + 25;

  let x3 = side * (70 + wave);
  let y3 = y + 35;

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  if(moving){
    ctx.beginPath();
    ctx.arc(x1, y1, 2, 0, Math.PI * 2);
    ctx.arc(x2, y2, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ✨ ذرات پس‌زمینه
function stars(){
  for(let i = 0; i < 2; i++){
    ctx.fillStyle = "rgba(0,255,100,0.12)";
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

// 🎬 انیمیشن اصلی
function animate(){

  ctx.fillStyle = "rgba(0,0,0,0.15)";
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
