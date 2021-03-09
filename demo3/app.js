ar form = document.getElementById('carForm');
var tableParent = document.getElementById("display-item");
var clear = document.getElementById('clearTable');

var carGarageArray =[];

function CarGarage(name, year, image){
    this.name = name;
    this.year = year;
    this.image = "img/"+image;

    carGarageArray.push(this);
}

CarGarage.prototype.renderCar = function(){
    var rowOne = document.createElement('tr');
    tableParent.appendChild(rowOne);

    var displayImage = document.createElement('img');
    displayImage.setAttribute('src', this.image);

    var storeImage = document.createElement('td');
    storeImage.setAttribute('rowspan','2');
    storeImage.appendChild (displayImage);

    var displayCarName = document.createElement('td');
    displayCarName.textContent = `Car Name : ${this.name} `;

    var rowTwo = document.createElement('tr');
    tableParent.appendChild(rowTwo);
    var displayCarModel = document.createElement('td');
    displayCarModel.textContent = ` Model Year : ${this.year}`;

    
    rowOne.appendChild(storeImage);
    rowOne.appendChild(displayCarName);
    rowTwo.appendChild(displayCarModel);

}


function storeData(){
    localStorage.setItem('Car', JSON.stringify(carGarageArray));
}

function renderCarItem(){
    for (let index = 0; index < carGarageArray.length; index++) {
        var rowOne = document.createElement('tr');
    tableParent.appendChild(rowOne);

    var displayImage = document.createElement('img');
    displayImage.setAttribute('src', carGarageArray[index].image);

    var storeImage = document.createElement('td');
    storeImage.setAttribute('rowspan','2');
    storeImage.appendChild (displayImage);

    var displayCarName = document.createElement('td');
    displayCarName.textContent = `Car Name : ${carGarageArray[index].name} `;

    var rowTwo = document.createElement('tr');
    tableParent.appendChild(rowTwo);
    var displayCarModel = document.createElement('td');
    displayCarModel.textContent = ` Model Year : ${carGarageArray[index].year}`;

    rowOne.appendChild(storeImage);
    rowOne.appendChild(displayCarName);
    rowTwo.appendChild(displayCarModel);
        
    }
}


function checkLS(){
    if(localStorage.getItem('Car')){
        carGarageArray = JSON.parse(localStorage.getItem('Car'));
        renderCarItem();
    }
}

function handelItem(event){
    event.preventDefault();

    var carName = event.target.carName.value;
    var categoryModel = event.target.categoryModel.value;
    var modelYear = event.target.modelYear.value;
    var modelImage ;

    console.log(`carName ${carName} categoryModel ${categoryModel}  modelYear ${modelYear}`);

    switch(categoryModel){
        case 'BMW':
            modelImage = 'bmw.png';
            break;
        case 'Lexus':
            modelImage = 'lexus.png';
            break;
        case 'Toyota':
            modelImage = 'toyota.png';
            break;
        case 'Tesla':
            modelImage = 'tesla.png';
            break;
        case 'Chevrolet':
            modelImage = 'chevrolet.png';
            break;
        case 'Hyundai':
            modelImage = 'hyundai.png';
            break;
        case 'KIA':
            modelImage = 'kia.png';
            break;
    }

    var car = new CarGarage(carName,modelYear,  modelImage);
    car.renderCar();
    storeData();
    console.log(carGarageArray);
}



form.addEventListener('submit', handelItem);
clear.addEventListener('click', function(event){

    localStorage.clear();
    location.reload();
});