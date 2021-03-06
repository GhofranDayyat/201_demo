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
const item=[
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
for (let i = 0; i < item.length; i++) {
  if(item[i]==='usb'){
    const newItem=new Bus(item[i],`./img/${item[i]}.gif`);
  }else if (item[i]==='sweep'){
    const newItem=new Bus(item[i],`./img/${item[i]}.png`);
  }else{
    const newItem=new Bus(item[i],`./img/${item[i]}.jpg`);
  }
}

function renderImg(){
  let rightIndex=getRandomNumber(0,(Bus.all.length -1));
  while(rightIndex===preRight || rightIndex===preMid || rightIndex===preLeft ){
    let rightIndex=getRandomNumber(0,(Bus.all.length -1));
    if(rightIndex!==preRight && rightIndex!==preMid &&rightIndex!==preLeft ){
      break;
    }
  }
  rightImg.src=Bus.all[rightIndex].path;
  rightImg.alt=Bus.all[rightIndex].name;
  rightImg.title=Bus.all[rightIndex].name;
  Bus.all[rightIndex].views++;

  let midIndex=getRandomNumber(0,(Bus.all.length -1));
  while(midIndex===preRight || midIndex===preMid || midIndex===rightIndex){
    let midIndex=getRandomNumber(0,(Bus.all.length -1));
    if(midIndex!==preRight && midIndex!==preMid ){
      break;
    }
  }
  midImg.src=Bus.all[midIndex].path;
  midImg.alt=Bus.all[midIndex].name;
  midImg.title=Bus.all[midIndex].name;
  Bus.all[midIndex].views++;

  let leftIndex=getRandomNumber(0,(Bus.all.length -1));
  while(leftIndex===preRight || leftIndex===preMid || leftIndex===preLeft || leftIndex===rightIndex||leftIndex===midIndex){
    let leftIndex=getRandomNumber(0,(Bus.all.length -1));
    if(leftIndex!==preRight && leftIndex!==preMid &&leftIndex!==preLeft ){
      break;
    }
  }
  leftImg.src=Bus.all[leftIndex].path;
  leftImg.alt=Bus.all[leftIndex].name;
  leftImg.title=Bus.all[leftIndex].name;
  Bus.all[leftIndex].views++;
  preRight=rightIndex;
  preMid=midIndex;
  preLeft=leftIndex;
  console.log(Bus.all[leftIndex].views++,'left',Bus.all[midIndex].views++,'mid',Bus.all[rightIndex].views++,'right');
}
renderImg();

const imgSection =document.getElementById('img-section');

imgSection.addEventListener('click',handelclick);
function handelclick(event){
  if (event.target.id !=='img-section')
    for (let i = 0; i < Bus.all.length; i++) {
      if(event.target.title===event.target.name){
        Bus.all[i].vots++;
        console.log(Bus.all[i].vots++);
      }
    }
  count=count-1;
  if(count===0){
    imgSection.removeEventListener('click',handelclick);
  }
  renderImg();
}
