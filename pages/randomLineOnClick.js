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

// Line 생성하는 클래스
class Line {
  constructor(curX, curY, lineLength, thickness) {
    this.curX = curX;
    this.curY = curY;
    this.lineLength = lineLength;
    this.thickness = thickness;
  }
}

/** 선을 캔버스에 그리는 함수. line은 */
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

/** HSL을 Hex로 변환하는 함수. 무지개 표현을 위해서 H 값만 조절하면 된다. */
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

// 마우스를 누르는 순간 발동. 랜덤으로 선을 이어 그린다. 마우스를 뗀다면 콜백을 멈춘다.
canvas.addEventListener("click", (e) => {
  e.preventDefault();
  let rect = canvas.getBoundingClientRect();
  let startX = e.pageX - rect.left;
  let startY = e.pageY - rect.top;
  let myLine = new Line(startX, startY, parseInt(size.value), 1);
  let drawing = setInterval(() => RandomDraw(myLine), 10);
  canvas.addEventListener("mouseup", () => {
    clearInterval(drawing);
  });
});

/** 랜덤으로 선을 이어 나가도록 하는 함수. */
function RandomDraw(myLine) {
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

button.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myLine = new Line(360, 360, parseInt(size.value), 1);
});
