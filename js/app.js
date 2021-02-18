'use strict';

// global vars
let totalClicks = 0;
let clicksAllowed = 25;
let allCatalogItems = [];
let catalogueItemIndexArray = [];
let uniqueIndexCount = 6;

let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');

// for eventhandler use
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

function CatalogItem(name, extension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${extension}`;
  this.views = 0;
  this.clicks = 0;
  allCatalogItems.push(this);
}

new CatalogItem('bag');
new CatalogItem('banana');
new CatalogItem('bathroom');
new CatalogItem('boots');
new CatalogItem('breakfast');
new CatalogItem('bubblegum');
new CatalogItem('chair');
new CatalogItem('cthulhu');
new CatalogItem('dog-duck');
new CatalogItem('dragon');
new CatalogItem('pen');
new CatalogItem('pet-sweep');
new CatalogItem('scissors');
new CatalogItem('shark');
new CatalogItem('sweep','png');
new CatalogItem('tauntaun');
new CatalogItem('unicorn');
new CatalogItem('usb','gif');
new CatalogItem('water-can');
new CatalogItem('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * (allCatalogItems.length));
}

function renderCatalogItems(){
  // to render instances
  // method 2: use while loop CREDIT: from TA RON
  while (catalogueItemIndexArray.length < uniqueIndexCount) {
    let randomNumber = getRandomIndex();
    while (!catalogueItemIndexArray.includes(randomNumber)){
      // use push to create a flow of in from the front and out on end of catalogueItemIndexArray
      catalogueItemIndexArray.push(randomNumber);
    }
  }

  let firstIndex = catalogueItemIndexArray.shift();
  let secondIndex = catalogueItemIndexArray.shift();
  let thirdIndex = catalogueItemIndexArray.shift();
  // allCatalogItems - array with all instances
  // allCatalogItems.src -  the relative path of random
  // allCatalogItems.title - is the 'name' of random
  // allCatalogItems[someIndex].views++ - times viewed of random

  imageOne.src = allCatalogItems[firstIndex].src;
  imageOne.title = allCatalogItems[firstIndex].name;
  allCatalogItems[firstIndex].views++;

  imageTwo.src = allCatalogItems[secondIndex].src;
  imageTwo.title = allCatalogItems[secondIndex].name;
  allCatalogItems[secondIndex].views++;

  imageThree.src = allCatalogItems[thirdIndex].src;
  imageThree.title = allCatalogItems[thirdIndex].name;
  allCatalogItems[thirdIndex].views++;
}
renderCatalogItems();

function clickManager(event){
  totalClicks++;
  // what click do you want to target? title?
  let catalogueItemClicked = event.target.title;

  // renderCatalogItems();
  for(let i=0; i < allCatalogItems.length; i++){
    // add click to some instance in the arr
    if(catalogueItemClicked === allCatalogItems[i].name)
      allCatalogItems[i].clicks++;
  }
  renderCatalogItems();

  if(totalClicks === clicksAllowed)
    myContainer.removeEventListener('click', clickManager);
}

function buttonManager(event){
  if(totalClicks === clicksAllowed){
    renderResults();
  }
}

function renderResults(){
  let catalogueList = document.querySelector('ul');
  for(let i = 0; i < allCatalogItems.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allCatalogItems[i].name} was viewed ${allCatalogItems[i].views} times and clicked ${allCatalogItems[i].clicks} times`;
    catalogueList.appendChild(li);
  }
}

myContainer.addEventListener('click', clickManager);
myButton.addEventListener('click', buttonManager);

// style div to look like a button and display results


// monday notes
// includes(); yields t/f when dot chained to arr
// pop() method removes the last element from an array and returns that element. This method CHANGES the length of the array
// The push() method adds one or more elements to the end of an array and returns the new length of the arr
// The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.

// the following adds 3 unique numbers
// function getRandomNumber(){
//   return Math.floor(Math.random() * 11);
// }
// getRandomNumber();
// let uniqueNumbers = [];
// let countOfUniqueNumbers = 3;
// while(uniqueNumbers.length < countOfUniqueNumbers){
//   let randomNumber = getRandomNumber();
//   while(!uniqueNumbers.includes(getRandomNumber())){
//   // with !, means = while false do the following code block  
//   uniqueNumbers.push(getRandomNumber());
//   }
// }
// console.log(uniqueNumbers);
// pop or shift will remove and return value in arr

// Queu Behavior is FIFO
// to create this behavior use the above logic and unshift instead of push. This adds 3 in the front and remove 3 in the back

// while(uniqueNumbers.length < countOfUniqueNumbers){
//   let randomNumber = getRandomNumber();
//   while(!uniqueNumbers.includes(getRandomNumber())){
//   uniqueNumbers.unshift(getRandomNumber());
//   }
//}
