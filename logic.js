const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 1024);
const CANVAS_HEIGHT = (canvas.height = 600);

let gameSpeed = 3;
const backgroundLayer = new Image();
backgroundLayer.src = './bg.jpg';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './bg2.jpg';
let truck = new Image();
truck.src = './truck.png';
const treeStump = new Image();
treeStump.src = './stump.png';

let x = -1224; // 0
let x2 = 0; //1224
let guessDelay = 5000;

if (gameSpeed > 0) {
  x = 0;
  x2 = 1224;
}

let wordList = [
  'crash',
  'up',
  'down',
  'dog',
  'next',
  'stop',
  'fast',
  'go',
  'slow',
  'cat',
  'and',
  'chicken',
  'puppy',
  'fox',
  'bird',
  'sky',
  'shark',
  'park',
  'car',
  'truck',
  'sun',
  'good',
  'four',
  'eat',
  'green',
  'brown',
  'black',
  'yellow',
  'three',
  'two',
  'see',
  'said',
  'run',
  'red',
  'one',
  'play',
  'make',
  'look',
  'little',
  'jump',
  'help',
  'funny',
  'find',
  'can',
  'blue',
  'big',
  'away',
];

let truckX = 200;
let truckSpeed = 40;
let treeStumpX = CANVAS_WIDTH;

let showTreeStump = false;

let fxsound = false;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer, x, 0);
  ctx.drawImage(backgroundLayer2, x2, 0);
  ctx.drawImage(truck, truckX, 350, 350, 225);

  if (showTreeStump) {
    ctx.drawImage(treeStump, treeStumpX, 350, 350, 225);

    if (treeStumpX >= 465) {
      treeStumpX -= 5;
    } else {
      let fxcrash = new Audio('./fxcrash.mp3');
      fxcrash.volume = 1;
      if (!fxsound) {
        fxcrash.play();
        fxsound = true;
      }
      gameSpeed = 0;
      console.log(truck.src);
      truck.src = truck.src.includes('red')
        ? './crashedredtruck.png'
        : 'crashedgreentruck.png';
      setTimeout(function () {
        truck.src = './truck.png';
        gameSpeed = 3;
        showTreeStump = false;
        fxsound = false;
        treeStumpX = CANVAS_WIDTH;
      }, 3000);
    }
  }

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
// document.addEventListener(
//   'keydown',
//   (e) => {
//     if (e.code == 'ArrowRight') {
//       gameSpeed = 3;
//       if (truckX < 550) truckX += truckSpeed;
//     } else if (e.code == 'ArrowLeft') {
//       gameSpeed = -3;
//       if (truckX > 100) truckX -= truckSpeed;
//     }
//   },
//   false
// );

// document.addEventListener(
//   'keyup',
//   (e) => {
//     if (e.code == 'ArrowRight') {
//       gameSpeed = 0;
//     } else if (e.code == 'ArrowLeft') {
//       gameSpeed = 0;
//     }
//   },
//   false
// );

function play() {
  let fiddler = new Audio('./fiddler.mp3');
  fiddler.volume = 0.1;
  fiddler.loop = true;
  fiddler.play();
}

var timer = setTimeout(timeToGuess, guessDelay);
let activeWord = null;
let wordNum = 0;

function timeToGuess() {
  guessNumber = 0;
  document.getElementById('letter_panel').innerHTML = '';
  document.getElementById('hbox').innerHTML = '';
  //   var wordNum = Math.floor(Math.random() * wordList.length);
  var word = wordList[wordNum];
  wordNum++;
  if (wordNum >= wordList.length) wordNum = 0;
  activeWord = word;
  gameSpeed = 0;

  // ensure the word is scrambled
  var shuffledWord = word.shuffle();
  while (shuffledWord == activeWord) {
    shuffledWord = word.shuffle();
  }

  populateLetterBank(shuffledWord);

  let wordAudio = new Audio('./' + word + '.mp3').play();
  wordAudio.volume = 1;
  wordAudio.play;
  console.log('here and the word is ', word);
}

let guessNumber = 0;
function guess(guess) {
  console.log('new entry:', guessNumber);
  document.getElementById(
    'entry_' + guessNumber.toString()
  ).innerHTML = guess.getAttribute('data');

  var totalEntryLetters = document.querySelectorAll('.entry').length;
  console.log('totalentryletters:', totalEntryLetters);
  console.log('activeword:', activeWord);

  var currentGuess = '';
  for (var i = 0; i < totalEntryLetters; i++) {
    currentGuess += document.getElementById('entry_' + i).innerHTML;
  }

  if (currentGuess.length == activeWord.length) {
    if (isCorrect(activeWord, currentGuess)) {
      setTimeout(timeToGuess, guessDelay);
    }
    return;
  }

  guess.style.display = 'none';
  guessNumber++;
}

String.prototype.shuffle = function () {
  var a = this.split(''),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
};

function populateLetterBank(word) {
  for (var w = 0; w < word.length; w++) {
    var nodeString =
      "<a href='#'><div class='letter' id='letter_" +
      w.toString() +
      "' data='" +
      word[w] +
      "' onclick='guess(this);'>" +
      word[w] +
      '</div></a>';
    document.getElementById('letter_panel').innerHTML += nodeString;

    var entryString =
      "<div id='entry_" + w.toString() + "' class='entry'></div>";

    console.log('made it back to adding entryboxes..');

    document.getElementById('hbox').innerHTML += entryString;
  }
}

function isCorrect(correct, guess) {
  var responseNum = Math.floor(Math.random() * 3);
  const successWords = ['./amazing.mp3', './greatjob.mp3', './proud.mp3'];
  const failWords = ['./tryagaincrash.mp3', './uhoh.mp3', './goodtry.mp3'];

  if (correct == guess) {
    let wordAudio = new Audio(successWords[responseNum]).play();
    wordAudio.volume = 1;
    wordAudio.play;

    document.getElementById('hbox').innerHTML = '';
    document.getElementById('letter_panel').innerHTML = '';
    gameSpeed = 3;

    action(activeWord);

    return true;
  } else {
    let wordAudio = new Audio(failWords[responseNum]).play();
    wordAudio.volume = 1;
    wordAudio.play;
    document.getElementById('hbox').innerHTML = '';
    document.getElementById('letter_panel').innerHTML = '';

    guessNumber = 0;
    populateLetterBank(activeWord.shuffle());
    gameSpeed = 0;

    return false;
  }
}

function action(word) {
  switch (word) {
    case 'red':
      truck.src = './redtruck.png';
      break;
    case 'crash':
      showTreeStump = true;
      break;
  }
}
