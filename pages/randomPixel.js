const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = document.getElementById("size"),
  button = document.querySelector("button");

const colorinfo = document.querySelector("span");

canvas.width = 720;
canvas.height = 720;
let myHSL = {
  h: 0,
  s: 100,
  l: 75,
};

class Dot {
  constructor(curX, curY, rad) {
    this.curX = curX;
    this.curY = curY;
    this.rad = rad;
  }

  draw() {
    ctx.fillStyle = HSLToHex(myHSL);
    colorinfo.innerText = HSLToHex(myHSL);
    colorinfo.style.color = HSLToHex(myHSL);
    if (myHSL.h > 360) myHSL.h = 0;
    else myHSL.h++;

    ctx.fillRect(this.curX, this.curY, this.rad, this.rad);
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

let myDot = new Dot(canvas.width / 2, canvas.height / 2, parseInt(size.value));

function RandomDraw() {
  myDot.draw();
  let ranVal = Math.floor(Math.random() * 4);
  let velo = myDot.rad;
  switch (ranVal) {
    case 0:
      myDot.curX -= velo;
      break;
    case 1:
      myDot.curY -= velo;
      break;
    case 2:
      myDot.curX += velo;
      break;
    case 3:
      myDot.curY += velo;
      break;
    default:
      break;
  }
  if (myDot.curX > canvas.width) myDot.curX = 0;
  else if (myDot.curX < -1) myDot.curX = canvas.width - myDot.rad;
  else if (myDot.curY > canvas.height) myDot.curY = 0;
  else if (myDot.curY < -1) myDot.curY = canvas.height - myDot.rad;
}

setInterval(RandomDraw, 1);
button.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myDot = new Dot(canvas.width / 2, canvas.height / 2, parseInt(size.value));
});
