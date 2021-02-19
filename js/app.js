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
