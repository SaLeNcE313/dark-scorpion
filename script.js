// 🧬 ستون فقرات مهره‌ای دایره‌ای (حرفه‌ای و تمیز)
  let spine = [];

  for(let i = 0; i < 9; i++){

    let x = 0;
    let y = i * 20;

    spine.push({x, y});

    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 🔗 اتصال نرم بین مهره‌ها (بدون لرزش حشره‌ای)
  ctx.beginPath();
  ctx.moveTo(spine[0].x, spine[0].y);

  for(let i = 1; i < spine.length; i++){
    ctx.lineTo(spine[i].x, spine[i].y);
  }

  ctx.stroke();
