const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 1024);
const CANVAS_HEIGHT = (canvas.height = 600);

let gameSpeed = -3;
const backgroundLayer = new Image();
backgroundLayer.src = './bg.jpg';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './bg2.jpg';
const truck = new Image();
truck.src = './truck.png';

let x = -1224; // 0
let x2 = 0; //1224

if (gameSpeed > 0) {
  x = 0;
  x2 = 1224;
}

let wordList = ['crash', 'up', 'down', 'dog'];

let truckX = 200;
let truckSpeed = 40;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer, x, 0);
  ctx.drawImage(backgroundLayer2, x2, 0);
  ctx.drawImage(truck, truckX, 350, 350, 225);

  if (gameSpeed > 0) {
    if (x < backgroundLayer.width * -1) {
      x = backgroundLayer.width - gameSpeed;
    }
    if (x2 < backgroundLayer2.width * -1) {
      x2 = backgroundLayer2.width - gameSpeed;
    }
  } else if (gameSpeed < 0) {
    if (x > backgroundLayer.width) {
      x = -backgroundLayer.width - gameSpeed;
    }
    if (x2 > backgroundLayer2.width) {
      x2 = -backgroundLayer2.width - gameSpeed;
    }
  }

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
      gameSpeed = 3;
      if (truckX < 550) truckX += truckSpeed;
    } else if (e.code == 'ArrowLeft') {
      gameSpeed = -3;
      if (truckX > 100) truckX -= truckSpeed;
    }
  },
  false
);

document.addEventListener(
  'keyup',
  (e) => {
    if (e.code == 'ArrowRight') {
      gameSpeed = 0;
    } else if (e.code == 'ArrowLeft') {
      gameSpeed = 0;
    }
  },
  false
);

function play() {
  let fiddler = new Audio('./fiddler.mp3');
  fiddler.volume = 0.2;
  fiddler.play();
}

var timer = setTimeout(timeToGuess, 10000);

function timeToGuess() {
  var wordNum = Math.floor(Math.random() * wordList.length);
  var word = wordList[wordNum];
  gameSpeed = 0;

  console.log(word);

  for (var w = 0; w < word.length; w++) {
    console.log(word.charAt(w));
    var nodeString =
      "<a href='#'><div class='letter' id='letter_" +
      w.toString() +
      "' data='" +
      word[w] +
      "' onclick='guess(this);'>" +
      word[w] +
      '</div></a>';
    document.getElementById('letter_panel').innerHTML += nodeString;
    // var node = new DOMParser().parseFromString(nodeString, 'text/xml');
    // document.getElementById('letter_panel').appendChild(node.documentElement);
  }

  //   let wordAudio = new Audio('./' + word + '.mp3').play();
  //   wordAudio.volume = 1;
  //   wordAudio.play;

  setTimeout(timeToGuess, 10000);
}

let guessNumber = 1;
function guess(guess) {
  console.log(guess);
  document.getElementById(
    'entry_' + guessNumber.toString()
  ).innerHTML = guess.getAttribute('data');
  guess.style.display = 'none';
  guessNumber++;
}
