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

class Line {
  constructor(curX, curY, lineLength, thickness) {
    this.curX = curX;
    this.curY = curY;
    this.lineLength = lineLength;
    this.thickness = thickness;
  }
}

let myLine = new Line(360, 360, parseInt(size.value), 1);

function draw(line, toX, toY) {
  ctx.strokeStyle = HSLToHex(myHSL);
  colorinfo.innerText = HSLToHex(myHSL);
  colorinfo.style.color = HSLToHex(myHSL);
  if (myHSL.h > 360) myHSL.h = 0;
  else myHSL.h++;

  ctx.lineWidth = line.thickness;
  ctx.beginPath();
  ctx.moveTo(line.curX, line.curY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
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

function RandomDraw() {
  let dirX = Math.random() * myLine.lineLength * 2 - myLine.lineLength;
  let toX = myLine.curX + dirX;
  let toY =
    myLine.curY +
    (Math.floor(Math.random() * 2) * 2 - 1) *
      Math.sqrt(Math.pow(myLine.lineLength, 2) - Math.pow(dirX, 2));
  draw(myLine, toX, toY);

  myLine.curX = toX;
  myLine.curY = toY;

  if (myLine.curX > canvas.width) myLine.curX = 0;
  else if (myLine.curX < -1) myLine.curX = canvas.width - 1;
  else if (myLine.curY > canvas.height) myLine.curY = 0;
  else if (myLine.curY < -1) myLine.curY = canvas.height - 1;
}

setInterval(RandomDraw, 10);

button.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myLine = new Line(360, 360, parseInt(size.value), 1);
});
