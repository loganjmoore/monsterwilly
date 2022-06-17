const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 1024);
const CANVAS_HEIGHT = (canvas.height = 600);

let gameSpeed = 3;
const backgroundLayer = new Image();
backgroundLayer.src = './bg.jpg';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './bg2.jpg';
const truck = new Image();
truck.src = './truck.png';

let x = 0;
let x2 = 1224;
let truckX = 200;
let truckSpeed = 30;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer, x, 0);
  ctx.drawImage(backgroundLayer2, x2, 0);
  ctx.drawImage(truck, truckX, 350, 350, 225);

  if (x < backgroundLayer.width * -1) x = backgroundLayer.width - gameSpeed;
  if (x2 < backgroundLayer2.width * -1) x2 = backgroundLayer2.width - gameSpeed;

  //   if (x > backgroundLayer.width) x = backgroundLayer.width + gameSpeed;
  //   if (x2 > backgroundLayer2.width) x2 = backgroundLayer2.width + gameSpeed;

  x -= gameSpeed;
  x2 -= gameSpeed;
  requestAnimationFrame(animate);
}
animate();

// KEYBOARD EVENTS
document.addEventListener(
  'keydown',
  (e) => {
    if (e.code == 'ArrowRight') {
      if (truckX < 550) truckX += truckSpeed;
    } else if (e.code == 'ArrowLeft') {
      if (truckX > 100) truckX -= truckSpeed;
    }
  },
  false
);

document.addEventListener(
  'keyup',
  (e) => {
    if (e.code == 'ArrowRight') {
    } else if (e.code == 'ArrowLeft') {
    }
  },
  false
);
