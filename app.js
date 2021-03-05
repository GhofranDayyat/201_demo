'use strict';
function getRandomNum(min, max) {
  return Math.floor ((Math.random() * (max - min+1)) + min);
}

const timeArr=['6AM','7AM','8AM','9AM','10AM','11AM','12AM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','Total'];
const totaOfTotal=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
function Stor(location,min,max,avg,avgPerHour,total){
  this.location=location;
  this.min=min;
  this.max=max;
  this.avg=avg;
  this.avgPerHour=avgPerHour;
  this.sum=0;
  this.total=total;
  Stor.all.push(this);
  localStorage.setItem('newstor',JSON.stringify(Stor.all));
}
function retreve(){
  if(localStorage.length>0){
    Stor.all=JSON.parse(localStorage.getItem('newstor'));
  }
}
Stor.all=[];

const mainSec = document.getElementById('main-section');
const tabelEl = document.createElement('table');
mainSec.appendChild(tabelEl);
const headerRowEl = document.createElement('tr');
tabelEl.appendChild(headerRowEl);
const thEl = document.createElement('th');
headerRowEl.appendChild(thEl);
thEl.textContent='           ';
headerRowEl.appendChild(thEl);
for (let i = 0; i < timeArr.length; i++) {
  let thEl = document.createElement('th');
  headerRowEl.appendChild(thEl);
  thEl.textContent=`${timeArr[i]}`;

}
Stor.prototype.getCookiePerCust=function(){
  for (let i = 0; i < (timeArr.length-1); i++) {
    this.avgPerHour[i]=Math.floor(getRandomNum(this.min,this.max)*this.avg);
    this.sum+=this.avgPerHour[i];
  }
  this.avgPerHour[14]=this.sum;

};
Stor.prototype.render=function(){
  this.getCookiePerCust();
  const dataRowEl = document.createElement('tr');
  tabelEl.appendChild(dataRowEl);
  const td = document.createElement('td');
  dataRowEl.appendChild(td);
  td.textContent=this.location;
  for (let i = 0; i < timeArr.length; i++) {
    const td = document.createElement('td');
    dataRowEl.appendChild(td);
    td.textContent=this.avgPerHour[i];
    totaOfTotal[i]+=this.avgPerHour[i];
  }
};

const seattle = new Stor(
  'Seattle',
  23,
  65,
  6.3,
  []
);
seattle.render();
const tokyo = new Stor(
  'Tokyo',
  3,
  24,
  1.2,
  []
);
tokyo.render();
const dubai = new Stor(
  'Dubai',
  11,
  38,
  3.7,
  []
);
dubai.render();
const paris = new Stor(
  'Paris',
  20,
  38,
  2.3,
  []
);
paris.render();
const lima =new Stor(
  'Lima',
  2,
  16,
  4.6,
  []
);
lima.render();


function creatFooter(){
  const footerRowEl = document.createElement('tr');
  tabelEl.appendChild(footerRowEl);
  const tdEl=document.createElement('td');
  footerRowEl.appendChild(tdEl);
  tdEl.textContent='Total';
  for (let i = 0; i < timeArr.length; i++) {
    const tdEl=document.createElement('td');
    footerRowEl.appendChild(tdEl);
    tdEl.textContent=totaOfTotal[i];
  }
  const userForm =document.getElementById('main-form');
  userForm.addEventListener('submit',handelSubmet);
  function handelSubmet(event){
    event.preventDefault();
    const location= event.target.location.value;
    const min =parseFloat(event.target.min.value);
    const max =parseFloat(event.target.max.value);
    const avg =parseFloat(event.target.avg.value);
    const newStor= new Stor(location,min,max,avg,[],[]);
    retreve();
    tabelEl.deleteRow(-1);
    newStor.render();
    creatFooter();
    userForm.reset();
  }
}

creatFooter();



