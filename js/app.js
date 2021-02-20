'use strict';

let totalClicks = 0;
let clicksAllowed = 25;
let allCatalogItems = [];
let catalogueItemIndexArray = [];
let uniqueIndexCount = 6;

let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');

function CatalogItem(name, extension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${extension}`;
  this.views = 0;
  this.clicks = 0;
  allCatalogItems.push(this);
}

// Basically this data will be adding to itself from past useage
// 1. get data from local storage using its key
let retrievedAllCatalogItems = localStorage.getItem('catalog-items');
// 3. use local storage so it doesnt break existing code
if(retrievedAllCatalogItems){
// 2. make data useable again by parsing it
  let parsedRetrievedAllCatalogItems = JSON.parse(retrievedAllCatalogItems);
  allCatalogItems = parsedRetrievedAllCatalogItems;

} else {
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
}



function getRandomIndex() {
  return Math.floor(Math.random() * (allCatalogItems.length));
}

function renderCatalogItems(){
  while (catalogueItemIndexArray.length < uniqueIndexCount) {
    let randomNumber = getRandomIndex();
    while (!catalogueItemIndexArray.includes(randomNumber)){
      catalogueItemIndexArray.push(randomNumber);
    }
  }

  let firstIndex = catalogueItemIndexArray.shift();
  let secondIndex = catalogueItemIndexArray.shift();
  let thirdIndex = catalogueItemIndexArray.shift();

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
  let catalogueItemClicked = event.target.title;

  for(let i=0; i < allCatalogItems.length; i++){
    if(catalogueItemClicked === allCatalogItems[i].name)
      allCatalogItems[i].clicks++;
  }
  renderCatalogItems();
  renderMyChart();
  // store after results rendered
  // step 1. stringify data
  let stringifyAllCatalogItems = JSON.stringify(allCatalogItems);
  console.log(stringifyAllCatalogItems);
  // step 2. save to localStorage
  localStorage.setItem('catalog-items',stringifyAllCatalogItems);

  if(totalClicks === clicksAllowed)
    myContainer.removeEventListener('click', clickManager);

}

function renderMyChart(){
  let itemNames = [];
  let itemViews = [];
  let itemClicks = [];

  for(let i = 0; i < allCatalogItems.length; i++){
    itemNames.push(allCatalogItems[i].name);
    itemViews.push(allCatalogItems[i].views);
    itemClicks.push(allCatalogItems[i].clicks);
  }

  let chartObject = {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: 'Views',
        data: itemViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: .5
      },
      {
        label: 'Clicks',
        data: itemClicks,
        backgroundColor: 'rgba(105, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 0.2)',
        borderWidth: 10
      }]
    },
    responsive: true,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}

myContainer.addEventListener('click', clickManager);

// localStorage saves to computer C drive

// Store:
//  data object -> json.stringify -> to
//  localStorage
// Retrieve
//  localStorage -> json.parse -> usable data

//  setItem method
//    localStorage.setItem("itemName", data)
//      itemName --> key as a string
//      data --> whatToStore? json stringified

//  getItem method
//    localStorage.getItem("itemName")
//      itemName --> key as a string

// Where can I find all my usable data?
//     allCatalogueItems array has all object instances

// to stringify:
//  let allCatalogItems =  JSON.stringify(allCatalogItems);
//  sets keys to strings and nums to nums and arr to string
//  use jsonlint validator on google search
//  JSON -> javascript object notation

// set to local storage
//  localStorage.setItem("keyname", stringifySomething);

// get local storage
// let retrievedData = localStorage.getItem("keyname");

// let parsedData = JSON.parse(retrievedData);
// it strips away its connection to constructor funciton and is "seen" as set of individual object litirals. This causes prototype methods to break. To fix, redesign constructor to reassign modified data
