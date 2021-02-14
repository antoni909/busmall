'use strict';

// global vars
let totalClicks = 0;
let clicksAllowed = 25;
let allCatalogItems = [];
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
  let catalogueItemIndexArray = [];
  while (catalogueItemIndexArray.length < 3) {
    let randomNumber = getRandomIndex();
    while (!catalogueItemIndexArray.includes(randomNumber)){
      catalogueItemIndexArray.push(randomNumber);
    }
  }

  let firstIndex = catalogueItemIndexArray.pop();
  let secondIndex = catalogueItemIndexArray.pop();
  let thirdIndex = catalogueItemIndexArray.pop();
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
