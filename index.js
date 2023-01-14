'use strict'
//import { renderButton } from './buttons';


const limit = 7; 
let page = 1; 
let sort;
let order;
let id;

//car icon
let link='/race/car1_83961.svg';

let garageUrl = `http://127.0.0.1:3000/garage`
let winnersUrl = `http://127.0.0.1:3000/winners?_sort=${sort}&_order=${order}&_limit=${limit}`;


const body = document.querySelector('body');
const fragment1 = new DocumentFragment();
const fragment2 = new DocumentFragment();
const fragment3 = new DocumentFragment();

// the buttons creation
const toGarageBtn = document.createElement('button');
toGarageBtn.setAttribute('type', 'button');
toGarageBtn.classList.add('btn');
toGarageBtn.classList.add('toGarageBtn');
toGarageBtn.innerText = 'To garage';

const toWinnerBtn = document.createElement('button');
toWinnerBtn.setAttribute('type', 'button');
toWinnerBtn.classList.add('btn');
toWinnerBtn.classList.add('toWinnerBtn');
toWinnerBtn.innerText = 'To winners';

const nextBtn = document.createElement('button');
nextBtn.setAttribute('type', 'button');
nextBtn.classList.add('btn');
nextBtn.classList.add('nextBtn');
nextBtn.innerText = 'Next';

const prevBtn = document.createElement('button');
prevBtn.setAttribute('type', 'button');
prevBtn.classList.add('btn');
prevBtn.classList.add('prevBtn');
prevBtn.innerText = 'Prev';

let topBtn = document.createElement('div');
topBtn.classList.add('topBtn');
topBtn.append(toGarageBtn, toWinnerBtn);

let bottomBtn = document.createElement('div');
bottomBtn.classList.add('bottomBtn');
bottomBtn.append(prevBtn, nextBtn);

//form for creation inside the additional functuanality block
let createCarInput = document.createElement('input');
createCarInput.classList.add('input');
createCarInput.setAttribute('type','text');
createCarInput.setAttribute('name','name');
createCarInput.id='carName';

let chooseColorInput = document.createElement('input');
chooseColorInput.classList.add('input');
chooseColorInput.setAttribute('type','color');
chooseColorInput.setAttribute('name','color');
chooseColorInput.id='carColor';

let formCreate = document.createElement('form');
formCreate.getAttribute('action')
formCreate.setAttribute('id','form');
formCreate.setAttribute('name','form');
formCreate.classList.add('formCreate');
formCreate.classList.add('form');

let createCarBtn= document.createElement('input');
createCarBtn.setAttribute('type','submit');
createCarBtn.classList.add('btn');
createCarBtn.classList.add('createCarBtn');
createCarBtn.innerText = 'Create';
formCreate.append(createCarInput, chooseColorInput, createCarBtn);

//form for the edition
let editCarInput= document.createElement('input');
editCarInput.classList.add('input');
editCarInput.setAttribute('type','text');

let editColorInput = document.createElement('input');
editColorInput.classList.add('input');
editColorInput.setAttribute('type','color');
editColorInput.setAttribute('name','color');
editColorInput.id='carColor';

let editCarBtn= document.createElement('button');
editCarBtn.classList.add('btn');
editCarBtn.classList.add('editCarBtn');
editCarBtn.innerText = 'Update';

let formEdit = document.createElement('form');
formEdit.getAttribute('action')
formEdit.setAttribute('id','form');
formEdit.setAttribute('name','form');
formEdit.classList.add('formEdit');
formEdit.classList.add('form');
formEdit.append(editCarInput,editColorInput, editCarBtn);

let random10carsButton = document.createElement('button');
random10carsButton.setAttribute('type', 'button');
random10carsButton.classList.add('btn');
random10carsButton.classList.add('random10carsButton');
random10carsButton.innerText = 'Create 10';

//Amount in the additional functionality block 
let garageAmount= document.createElement('div');
garageAmount.innerHTML = 'Garage: '; 
garageAmount.classList.add('garageAmount');

let winnersAmount= document.createElement('div');
winnersAmount.innerHTML = 'Winners: ';

fragment3.appendChild(winnersAmount);

//Additional functionalities block
let additionalFunc = document.createElement('div');
additionalFunc.classList.add('additionalFunc');
additionalFunc.append(formCreate, formEdit, random10carsButton, garageAmount);

//block with cars in the garage, hidden initially
let carsWrapper = document.createElement('div');
carsWrapper.classList.add('carsWrapper');
carsWrapper.classList.toggle('close');

let deleteCarButton = document.createElement('button');
deleteCarButton.classList.add('btn');
carsWrapper.append(deleteCarButton);
deleteCarButton.innerHTML = 'Delete';

//block winners, hidden initially
let winnersWrapper = document.createElement('div');
winnersWrapper.classList.add('winnersWrapper'); 
winnersWrapper.classList.toggle('close');

fragment1.append(topBtn, additionalFunc, carsWrapper, winnersWrapper, bottomBtn);
body.appendChild(fragment1);


async function getGarageAmount(){
  await fetch(`${garageUrl}?&_page=${page}&_limit=${limit}`)
    .then(response => { 
      let amount = response.headers.get('X-Total-Count')
      garageAmount.append(amount);    
      return response.json(); 
  })
}

async function getCarsInGarage(){
  await fetch(`${garageUrl}?&_page=${page}&_limit=${limit}`)
    .then(response => {
      return response.json();   
    })
    .then((data)=> carsHandling(data));  
};

function carsHandling(data){  
  for(let i =0; i<data.length; i++){
    let carName = document.createElement('div');
    carName.classList.add('carName');
    carName.append(data[i].name);
    let carImg = document.createElement('img');
    carImg.setAttribute('src',link );
    carImg.style.fill = data[i].color
    let car = document.createElement('div');
    car.classList.add('car');
    car.append(carName,carImg);
    car.setAttribute('data-id', data[i].id);
    let cars = document.createElement('div');   
    cars.append(car);
    fragment2.appendChild(cars);
    carsWrapper.appendChild(fragment2);
  }     
}

async function getWinnersAmount(){
  await fetch(winnersUrl)
    .then(response => { 
      let wAmount = response.headers.get('X-Total-Count')
      winnersAmount.append(wAmount);    
      return response.json(); 
  })
}

async function getWinners(){
  await fetch(winnersUrl)
    .then(response => {
      return response.json();   
    })
    .then((data)=> winnershandling(data))
};

function winnershandling(data){
  for(let i =0; i<data.length; i++){
    let winner = document.createElement('div');
    winner.classList.add('winner');
    winner.setAttribute('id', data[i].id);
    let winnerRating = document.createElement('div');
    winnerRating.classList.add('winnerRating');
    winnerRating.append(data[i].wins);
    let winnerTime = document.createElement('div');
    winnerTime.classList.add('winnerTime');
    winnerTime.append(data[i].time);
    winner.append(winnerRating, winnerTime);
    let winners = document.createElement('div');
    winners.append(winner);
    fragment3.appendChild(winners);
    winnersWrapper.appendChild(fragment3);
  }
}

//click actions
toGarageBtn.addEventListener('click', getCarsInGarage());
toGarageBtn.addEventListener("click", (e) => {
  carsWrapper.classList.toggle('close'); 
})
toGarageBtn.addEventListener('click', getGarageAmount());

toWinnerBtn.addEventListener('click', getWinners());
toWinnerBtn.addEventListener("click", (e) => {
  winnersWrapper.classList.toggle('close'); 
})
toWinnerBtn.addEventListener('click', getWinnersAmount());

class Car{
  constructor(name, color){
    this.id = id;
    this.name = name;
    this.color = color;
  }
}
// creation a new car
formCreate.addEventListener('submit', function(e){

  e.preventDefault();
  const payload = {name: carName.value, color:carColor.value };
  fetch(garageUrl, {
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    })
  .then(response=>response.json())
  .then((data) => console.log(data))
  getGarageAmount();
  e.target.reset();

})

// choos the car and give the 'data-id'
carsWrapper.addEventListener('click', event=> {
  let car = event.target.closest('.car');
  console.log(car);
  if (!car) return;
  let id = car.getAttribute('data-id');
  console.log(id);
  return id; 
})

editCarBtn.addEventListener('submit', updateCar);

async function updateCar(id){
    const payload = {name: carName.value, color:carColor.value };
    fetch(`${garageUrl}/:id=${id}`, {
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      })
    .then(response=>response.json())
    .then((data) => console.log(data))
    e.target.reset();
}

deleteCarButton.addEventListener('click', deleteCar());

//delete car
async function deleteCar(id){
    await fetch(`${garageUrl}/:id=${id}`,{method:'DELETE'})
      .then((response)=>response.json())
      .then((data) => console.log(data))
      .catch((error) => {console.log(error)})
}

// creat 10random cars
function getRandomElement(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}

function randomCars(){ 
  const colors= ['#e6e6fa', '#ef3c40', '#fede00'];
  const models = ['Ford','Mersedes', 'BMW', 'Tesla'];
  let random10Cars= [];
  for (let i=0; i < 10; i++){
    let randomCar ={
      name: getRandomElement(models),
      color: getRandomElement(colors),
    }
  random10Cars.push(randomCar);
 /* random10Cars.forEach(car =>{
    fetch(garageUrl, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
      })
    .then(response=>response.json())
  })*/
  }
}

random10carsButton.addEventListener('click', randomCars());


// pagination
nextBtn.addEventListener("click", () => { 
  page += 1; 
  getCarsInGarage(page);
}
)

prevBtn.addEventListener("click", () => {
page -= 1;
getCarsInGarage(page);
})