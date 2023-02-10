const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 300;

let rad = 40;
let myHSL = {
  h: 0,
  s: 100,
  l: 75,
};

class Ball {
  constructor(x, y, rad, acc, weight, color, isCollide = false) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.acc = acc;
    this.weight = weight;
    this.color = color;
    this.isCollide = isCollide;
  }
}

function ClearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function DrawBall(myBall) {
  ClearCanvas();
  ctx.fillStyle = myBall.color;
  ctx.strokeStyle = "black";

  ctx.beginPath();
  ctx.arc(myBall.x, myBall.y, myBall.rad, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  if (myBall.acc < 40) myBall.acc++;
  else myBall.acc = 40;

  if (!myBall.isCollide || myBall.y <= canvas.height - 50) {
    myBall.isCollide = true;
    myBall.y += myBall.weight * myBall.acc - 1;
  } else {
    myBall.color = HSLToHex(myHSL);
    if (myHSL.h > 360) myHSL.h = 0;
    else myHSL.h += 24;
    myBall.acc *= -0.9;
    myBall.isCollide = false;
  }
}

function HSLToHex(hsl) {
  const { h, s, l } = hsl;

  const hDecimal = l / 100;
  const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    // Convert to Hex and prefix with "0" if required
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

canvas.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    let startX = e.pageX;
    let startY = e.pageY;
    let myBall = new Ball(
      (x = startX),
      (y = startY),
      (rad = 50),
      (acc = 0),
      (weight = 1),
      (color = "white")
    );
    setInterval(() => DrawBall(myBall), 20);
  },
  { once: true }
);
