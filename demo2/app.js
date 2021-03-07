'use strict';
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let count = 10;
let preRight=-1;
let preMid=-2;
let preLeft=-3;
const midImg=document.getElementById('mid-img');
const rightImg=document.getElementById('right-img');
const leftImg=document.getElementById('left-img');

function Bus (name,path){
  this.name=name;
  this.path=path;
  this.views=0;
  this.vots=0;
  Bus.all.push(this);
}



Bus.all=[];

const itemName=[
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'sweep',
  'usb'
];
for (let i = 0; i < itemName.length; i++) {
  if(itemName[i]==='usb'){
    const newItem=new Bus(itemName[i],`./img/${itemName[i]}.gif`);
  }else if (itemName[i]==='sweep'){
    const newItem=new Bus(itemName[i],`./img/${itemName[i]}.png`);
  }else{
    const newItem=new Bus(itemName[i],`./img/${itemName[i]}.jpg`);
  }

}

function renderImg(){
  let rightIndex=null;
  let midIndex=null;
  let leftIndex=null;
  do{
    rightIndex=getRandomNumber(0,(Bus.all.length -1));
  }
  while(rightIndex===preRight || rightIndex===preMid || rightIndex===preLeft ||rightIndex===midIndex||leftIndex);
  rightImg.src=Bus.all[rightIndex].path;
  rightImg.alt=Bus.all[rightIndex].name;
  rightImg.title=Bus.all[rightIndex].name;
  Bus.all[rightIndex].views++;

  do{
    midIndex=getRandomNumber(0,(Bus.all.length -1));
  }
  while(midIndex===preRight || midIndex===preMid ||midIndex===preLeft ||midIndex===leftIndex ||midIndex===rightIndex);

  midImg.src=Bus.all[midIndex].path;
  midImg.alt=Bus.all[midIndex].name;
  midImg.title=Bus.all[midIndex].name;
  Bus.all[midIndex].views++;

  do{
    leftIndex=getRandomNumber(0,(Bus.all.length -1));
  }
  while(leftIndex===preRight || leftIndex===preMid || leftIndex===preLeft || leftIndex===rightIndex||leftIndex===midIndex);
  leftImg.src=Bus.all[leftIndex].path;
  leftImg.alt=Bus.all[leftIndex].name;
  leftImg.title=Bus.all[leftIndex].name;
  Bus.all[leftIndex].views++;
  preRight=rightIndex;
  preMid=midIndex;
  preLeft=leftIndex;
  console.log(Bus.all[leftIndex].views,`left${Bus.all[leftIndex].name}`,Bus.all[midIndex].views,`mid${Bus.all[midIndex].name}`,Bus.all[rightIndex].views,`right${Bus.all[rightIndex].name}`);
}
renderImg();

const imgSection =document.getElementById('img-section');
imgSection.addEventListener('click',handelclick);
function handelclick(event){
  if (event.target.id !=='img-section'){
    for (let i = 0; i < Bus.all.length; i++) {
      if(event.target.title===Bus.all[i].name){
        Bus.all[i].vots++;
        console.log(Bus.all[i].vots,Bus.all[i].name);
      }
    }
    count=count-1;
    if(count===0){
      imgSection.removeEventListener('click',handelclick);
      createChart();
    }
    renderImg();
  }
}


function createChart(){

  const ctx = document.getElementById('chart').getContext('2d');
  let itemVots=[];
  let itemViews=[];
  const names=[];

  for (let i = 0; i < Bus.all.length; i++) {
    names.push(Bus.all[i].name);
    itemVots.push(Bus.all[i].vots);
    itemViews.push(Bus.all[i].views);
  }
  function Stor(itemVt,itemVs){
    this.itemVt=itemVt;
    this.itemVs=itemVs;
    Stor.all.push(this);
    localStorage.setItem('stor',JSON.stringify(Stor.all));
    console.log(Stor.all);
  }
  function retreve(){
    if (localStorage.length>0){
      Stor.all=JSON.parse(localStorage.getItem('stor'));
      renderImg();
      console.log(storV.itemVt)
    }
  }
  Stor.all=[];
  const storV=new Stor(itemVots,itemViews);
  retreve();

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels:names,
      datasets: [{
        label: 'Vots',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: itemVots+storV.itemVt
      },{
        label: 'Viwes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: itemViews+storV.itemVs
      }]
    },

    // Configuration options go here
    options: {}
  });
}

