const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let target = { x: innerWidth/2, y: innerHeight/2 };
let pos = { x: innerWidth/2, y: innerHeight/2 };
let vel = { x: 0, y: 0 };

window.addEventListener("mousemove", e => {
  target.x = e.clientX;
  target.y = e.clientY;
});

// 🧠 حرکت نرم + طبیعی (بدون لرزش)
function move(){

  let dx = target.x - pos.x;
  let dy = target.y - pos.y;

  let dist = Math.sqrt(dx*dx + dy*dy);

  // هرچی نزدیک‌تر → کنترل بیشتر
  let speed = dist < 200 ? 0.09 : 0.05;

  vel.x += dx * speed;
  vel.y += dy * speed;

  // اصطکاک (خیلی مهم برای طبیعی شدن)
  vel.x *= 0.78;
  vel.y *= 0.78;

  pos.x += vel.x;
  pos.y += vel.y;
}

// 🕷️ اسپایدر واقعی‌تر (بدن + حرکت هماهنگ)
function drawSpider(){

  let t = Date.now() * 0.004;

  let speed = Math.abs(vel.x) + Math.abs(vel.y);
  let moving = speed > 0.4;

  ctx.save();
  ctx.translate(pos.x, pos.y);

  let color = "#00ff88";

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.shadowBlur = 18;
  ctx.shadowColor = color;
  ctx.lineWidth = 2;

  // 🧠 بدن (حس واقعی‌تر با فاصله طبیعی)
  for(let i=0;i<4;i++){
    ctx.beginPath();
    ctx.ellipse(0, i*17, 10 - i*1.5, 6, 0, 0, Math.PI*2);
    ctx.stroke();
  }

  // 🕷️ پاها (حرکت فقط وقتی در حال حرکت هست)
  for(let i=0;i<4;i++){

    let y = 20 + i*18;

    let wave = moving ? Math.sin(t*6 + i) * 5 : 0;

    drawLeg(-1, y, wave);
    drawLeg(1, y, -wave);
  }

  // 👁 چشم
  ctx.beginPath();
  ctx.arc(-5,-9,3,0,Math.PI*2);
  ctx.arc(5,-9,3,0,Math.PI*2);
  ctx.fill();

  ctx.restore();
}

// 🦵 پای طبیعی‌تر (بدون اغراق)
function drawLeg(side, y, wave){

  let x0 = side * 5;
  let y0 = y;

  let x1 = side * (22 + wave);
  let y1 = y + 8;

  let x2 = side * (42 + wave);
  let y2 = y + 18;

  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

// 🎬 loop
function loop(){

  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  move();
  drawSpider();

  requestAnimationFrame(loop);
}

loop();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
