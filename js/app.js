'use strict'

let totalClicks = 0;
let ClicksAllowed = 15;
let allGoats = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-chiild(2)');
// for eventhandler use
let myContainer = document.querySelector('section');

function Goat(name, fileExtension = 'jpg'){
  this.name = name,
  this.src = `img/${name}.${fileExtension}`,
  this.views = 0;
  this.clicks = 0;
  allGoats.push(this);
}

new Goat('exampleOne', 'png');
new Goat('exampleTwo');
new Goat('exampleThree');
new Goat('exampleFour');
new Goat('exampleFive');
new Goat('exampleSix');
new Goat('exampleSeven');
new Goat('exampleEight');

function getRandomIndex(){
  //only used for allGoats arr
  return Math.floor(Math.random)*(allGoats.length);
}

function renderGoats(){
  //to render instances
  let firstGoatIndex = getRandomIndex();
  let secondGoatIndex = getRandomIndex();

  while(firstGoatIndex === secondGoatIndex){
    //while assures that they arent the same
    // For BusMall lab, recommend check to see if index is included in array. Use an array to store indexes
    // pop those results from the array or shift
    secondGoatIndex = getRandomIndex();
  }
  imageOne.src = allGoats[firstGoatIndex].src;
  imageOne.title = allGoats[firstGoatIndex].name;
  //to inc views
  allGoats[firstGoatIndex].views++;

  imageTwo.src = allGoats[secondGoatIndex].src;
  //title is the property of Object imageTwo
  imageTwo.title = allGoats[secondGoatIndex].name;
  allGoats[secondGoatIndex].views++;
}

function handleClick(event){
  totalClicks++;
  // what click do you want to target? title?
  let goatClicked = event.target.title;
  
  renderGoats();
  for(let i=0; i<allGoats.length;i++){
    if(goatClicked===allGoats[i].name)
      allGoats[i].clicks++;
  }

  renderGoats();
  if(totalClicks === clicksAllowed)
    //remove event listener
    myContainer.removeEventListener('click', handleClick);
    renderResults();
}

renderResults(){
  let myList = document.querySelector('ul');
  for(let i=0; i<allGoats.length;i++){
    let li = document.createElement('li');
    li.textContent = `${allGoats[i].name} was viewed ${allGoats[i].views} times and clicked ${allGoats[i].clicks} times`;
    myList.appendChild(li);
  }
}

renderGoats();

myContainer.addEventListener('click', handleClick);


// style div to look like a button and display results