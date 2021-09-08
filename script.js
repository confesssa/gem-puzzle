'use strict';

const fragment = new DocumentFragment();

// Add sounds
const moved = document.createElement('audio');
moved.setAttribute('src', './Assets/sounds/move.mp3');
fragment.appendChild(moved);

const mixed = document.createElement('audio');
mixed.setAttribute('src', './Assets/sounds/mixed.mp3');
fragment.appendChild(mixed);

const won = document.createElement('audio');
won.setAttribute('src', './Assets/sounds/win.mp3');
fragment.appendChild(won);

// Create generalWrapper
const generalWrapper = document.createElement('div');
generalWrapper.classList.add('general-wrapper');
fragment.appendChild(generalWrapper);

// Create templateContainer
const templateContainer = document.createElement('div');
templateContainer.classList.add('template-container');
generalWrapper.appendChild(templateContainer);

// Create gameContainer
const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
generalWrapper.appendChild(gameContainer);

// Fill templateContainer
const templateTitle = document.createElement('div');
templateTitle.classList.add('template-title');

const templateImage = document.createElement('div');
templateImage.classList.add('template-image');

const readyImage = document.createElement('img');
readyImage.setAttribute('src', './Assets/ready image.png');
readyImage.classList.add('ready-image');
templateImage.appendChild(readyImage);

templateContainer.append(templateTitle, templateImage);

const templateParagraph = document.createElement('div');
templateParagraph.classList.add('template-paragraph');
templateParagraph.innerHTML = 'How it should be';
templateTitle.appendChild(templateParagraph);

// Fill gameContainer
const total = document.createElement('div');
total.classList.add('total');
gameContainer.appendChild(total);

// Create button
let reset = document.createElement('button');
reset.classList.add('reset');
reset.textContent = 'Reset';
total.appendChild(reset);
reset.addEventListener('click', mix);

// Create function for remix elements
function mix() {
  location.reload();
}

// Create time
let time = document.createElement('form');
time.setAttribute('name', 'MyForm');
time.classList.add('time');
total.appendChild(time);
time.textContent = 'Time: ';

// Create timer
let input = document.createElement('input');
input.name = 'stopwatch';
input.size = '5';
input.value = "00:00:00";
input.disabled = true;
input.classList.add('input');
time.appendChild(input);

// Create score
let score = document.createElement('div');
score.classList.add('score');
total.appendChild(score);
score.textContent = 'Score: ';
let count = 0;

// Create box
let box = document.createElement('div');
box.classList.add('box');
gameContainer.appendChild(box);

let emptyElement = {
  value: 0,
  top: 0,
  left: 0,
}

let elements = [];
elements.push(emptyElement);

const elementsCount = 15;
let numbers = [...Array(elementsCount).keys()].sort(() => Math.random() - 0.5);

// Generate box
const elementWidth = 100;
  for (let i = 1; i <= elementsCount; i++) { // create 15 elements
    let el = document.createElement('div');
    let value = numbers[i - 1] + 1;
    el.classList.add('element');
    el.classList.add(`bgImage${value}`);

    let left = i % 4;
    let top = (i - left) / 4;
  
    elements.push({
      value: value,
      left: left,
      top: top,
      element: el
    });
  
    el.style.left = `${left * elementWidth}px`;
    el.style.top = `${top * elementWidth}px`;
  
    box.appendChild(el);
  
    el.addEventListener('click', () => {
      jump(i);
    });

    // Create function jump
  function jump(index) {
    let el = elements[index];
  
    let leftDiff = Math.abs(emptyElement.left - el.left);
    let topDiff = Math.abs(emptyElement.top - el.top);
  
    let hasMoveOnlyOneStem = leftDiff + topDiff;
    if (hasMoveOnlyOneStem > 1) {
      return; 
    }
  
    el.element.style.left = `${emptyElement.left * elementWidth}px`;
    el.element.style.top = `${emptyElement.top * elementWidth}px`;

    count += 1;
    score.textContent = `Score: ${count}`;
  
    let emptyElementLeft = emptyElement.left;
    let emptyElementTop = emptyElement.top;
    emptyElement.left = el.left;
    emptyElement.top = el.top;
    el.left = emptyElementLeft;
    el.top = emptyElementTop;
  
    let isFinished = elements.every(el => {
      return el.value === el.top * 4 + el.left;
    })

    StartStop();
    moved.play();

    if (isFinished) {
      won.play();
      alert(`Ура! Вы решили головоломку за ${readout} и ${count} ходов`);
      clearTimeout(clocktimer);
      init = 0;
      count = 0;
      score.textContent = `Score: ${count}`;
    }
  }
 }

   // Create function for Timer
const base = 60;
let clocktimer, dateObj, displayHours, displayMinutes, displaySeconds;
let readout = '';
let hours = 1,
  minutes = 1,
  temporaryMinutes = 1,
  seconds = 0,
  temporarySeconds = 0,
  milliseconds = 0,
  init = 0;

function ClearСlock() {
  clearTimeout(clocktimer);
  hours = 1;
  minutes = 1;
  temporaryMinutes = 1;
  seconds = 0;
  temporarySeconds = 0;
  milliseconds = 0;
  init = 0;
  readout = '00:00:00';
  document.MyForm.stopwatch.value = readout;
}

function StartTIME() {
  const cdateObj = new Date();
  const TimerTime = (cdateObj.getTime() - dateObj.getTime()) - (seconds * 1000);
  if (TimerTime > 999) {
    seconds++;
  }
  if (seconds >= (minutes * base)) {
    temporarySeconds = 0;
    minutes++;
  } else {
    temporarySeconds = parseInt((milliseconds / 100) + seconds);
    if (temporarySeconds >= base) {
      temporarySeconds = temporarySeconds - ((minutes - 1) * base);
    }
  }
  if (minutes > (hours * base)) {
    temporaryMinutes = 1;
    hours++;
  } else {
    temporaryMinutes = parseInt((milliseconds / 100) + minutes);
    if (temporaryMinutes >= base) {
      temporaryMinutes = temporaryMinutes - ((hours - 1) * base);
    }
  }
  milliseconds = Math.round(TimerTime / 10);
  if (milliseconds > 99) {
    milliseconds = 0;
  }
  if (milliseconds == 0) {
    milliseconds = '00';
  }
  if (milliseconds > 0 && milliseconds <= 9) {
    milliseconds = '0' + milliseconds;
  }
  if (temporarySeconds > 0) {
    displaySeconds = temporarySeconds;
    if (temporarySeconds < 10) {
      displaySeconds = '0' + temporarySeconds;
    }
  } else {
    displaySeconds = '00';
  }
  displayMinutes = temporaryMinutes - 1;
  if (displayMinutes > 0) {
    if (displayMinutes < 10) {
      displayMinutes = '0' + displayMinutes;
    }
  } else {
    displayMinutes = '00';
  }
  displayHours = hours - 1;
  if (displayHours > 0) {
    if (displayHours < 10) {
      displayHours = '0' + displayHours;
    }
  } else {
    displayHours = '00';
  }
  readout = displayHours + ':' + displayMinutes + ':' + displaySeconds;
  document.MyForm.stopwatch.value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}

function StartStop() {
  if (init == 0) {
    ClearСlock();
    dateObj = new Date();
    StartTIME();
    init = 1;
  } 
}

document.body.append(fragment);
