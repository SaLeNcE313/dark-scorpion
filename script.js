const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// 🦂 رسم عقرب خشن
function drawScorpion(){

  let dx = mouse.x - canvas.width / 2;
  let dy = mouse.y - canvas.height / 2;
  let dist = Math.sqrt(dx*dx + dy*dy);

  let rage = Math.max(0, 1 - dist / 400);
  let speed = 0.05 + rage * 0.25;

  let centerX = canvas.width / 2 + dx * (0.15 + rage * 0.25);
  let centerY = canvas.height / 2 + dy * (0.15 + rage * 0.25);

  let shakeX = (Math.random() - 0.5) * rage * 10;
  let shakeY = (Math.random() - 0.5) * rage * 10;

  ctx.save();
  ctx.translate(centerX + shakeX, centerY + shakeY);

  let red = Math.floor(rage * 200);

  ctx.strokeStyle = `rgb(${red},255,100)`;
  ctx.fillStyle = `rgb(${red},255,100)`;

  ctx.shadowBlur = 20 + rage * 30;
  ctx.shadowColor = `rgb(${red},255,100)`;
  ctx.lineWidth = 1.5 + rage;

  let time = Date.now() * speed;

  // بدن
  let points = [];
  for(let i = 0; i < 10; i++){
    let x = 0;
    let y = i * 20;

    points.push({x,y});

    ctx.beginPath();
    ctx.arc(x,y,2.5 + rage,0,Math.PI*2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for(let i = 1; i < points.length; i++){
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  // دم
  ctx.beginPath();
  ctx.moveTo(0,180);
  ctx.quadraticCurveTo(
    70 + Math.sin(time) * (5 + rage*20),
    120,
    20,
    40
  );
  ctx.stroke();

  // نیش
  ctx.beginPath();
  ctx.arc(20,30,3 + rage*3,0,Math.PI*2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(20,30);
  ctx.lineTo(40 + rage*20, 10 - rage*10);
  ctx.stroke();

  // پاها
  for(let i = 0; i < 4; i++){
    let y = 40 + i * 25;
    let wave = Math.sin(time + i) * (10 + rage*15);

    ctx.beginPath();
    ctx.moveTo(-10, y);
    ctx.lineTo(-90 + wave, y - 25 + wave);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10, y);
    ctx.lineTo(90 - wave, y - 25 + wave);
    ctx.stroke();
  }

  // چشم‌ها
  ctx.beginPath();
  ctx.fillStyle = rage > 0.5 ? "red" : "#00ff88";

  ctx.arc(-8,-10,2 + rage,0,Math.PI*2);
  ctx.arc(8,-10,2 + rage,0,Math.PI*2);
  ctx.fill();

  ctx.restore();
}

// ✨ ستاره‌ها
function stars(){
  for(let i = 0; i < 2; i++){
    ctx.fillStyle = "rgba(0,255,100,0.2)";
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
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars();
  drawScorpion();

  requestAnimationFrame(animate);
}

animate();

// 📱 ریسایز
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
