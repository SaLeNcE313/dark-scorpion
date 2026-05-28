const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width/2, y: canvas.height/2 };

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawScorpion() {
  let centerX = canvas.width/2 + (mouse.x - canvas.width/2) * 0.03;
  let centerY = canvas.height/2 + (mouse.y - canvas.height/2) * 0.03;

  ctx.save();
  ctx.translate(centerX, centerY);

  ctx.strokeStyle = "#00ff88";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#00ff88";
  ctx.lineWidth = 2;

  for(let i=0;i<10;i++){
    ctx.beginPath();
    ctx.arc(0, i*18, 12 - i*0.7, 0, Math.PI*2);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(0,170);
  ctx.quadraticCurveTo(60,120,20,40);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(20,30,8,0,Math.PI*2);
  ctx.stroke();

  for(let i=0;i<4;i++){
    let y = 40 + i*25;
    ctx.beginPath();
    ctx.moveTo(-10,y);
    ctx.lineTo(-80,y-20);
    ctx.moveTo(10,y);
    ctx.lineTo(80,y-20);
    ctx.stroke();
  }

  ctx.fillStyle = "#00ff88";
  ctx.beginPath();
  ctx.arc(-10,-10,3,0,Math.PI*2);
  ctx.arc(10,-10,3,0,Math.PI*2);
  ctx.fill();

  ctx.restore();
}

function stars(){
  for(let i=0;i<2;i++){
    ctx.fillStyle = "rgba(0,255,100,0.2)";
    ctx.beginPath();
    ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2, 0, Math.PI*2);
    ctx.fill();
  }
}

function animate(){
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  stars();
  drawScorpion();

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
