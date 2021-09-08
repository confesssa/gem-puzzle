'use strict';

let fragment = new DocumentFragment();

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

document.body.append(fragment);