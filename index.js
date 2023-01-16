'use strict'
//import { renderButton } from './buttons.js';

/*let sort;
let order;
*/

let id;

//car icon
let link='./car1_83961.svg';

let garageUrl = `http://127.0.0.1:3000/garage`
let winnersUrl = `http://127.0.0.1:3000/winners`;

let carsParams = new URLSearchParams({
  _page:1,
});
carsParams.toString();

const body = document.querySelector('body');
const fragment1 = new DocumentFragment();
const fragment2 = new DocumentFragment();
const fragment3 = new DocumentFragment();

// the buttons creation
const toGarageBtn = document.createElement('button');
toGarageBtn.setAttribute('type', 'button');
toGarageBtn.classList ='btn toGarageBtn';
toGarageBtn.innerText = 'To garage';

const toWinnerBtn = document.createElement('button');
toWinnerBtn.setAttribute('type', 'button');
toWinnerBtn.classList = 'btn toWinnerBtn';
toWinnerBtn.innerText = 'To winners';

const nextBtn = document.createElement('button');
nextBtn.setAttribute('type', 'button');
nextBtn.classList = 'btn nextBtn';
nextBtn.innerText = 'Next';

const prevBtn = document.createElement('button');
prevBtn.setAttribute('type', 'button');
prevBtn.classList = 'btn prevBtn';
prevBtn.innerText = 'Prev';

let topBtn = document.createElement('div');
topBtn.classList = 'topBtn';
topBtn.append(toGarageBtn, toWinnerBtn);

let bottomBtn = document.createElement('div');
bottomBtn.classList ='bottomBtn';
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
formCreate.classList = 'form formCreate';

let createCarBtn= document.createElement('input');
createCarBtn.setAttribute('type','submit');
createCarBtn.classList = 'btn createCarBtn';
createCarBtn.innerText = 'Create';
formCreate.append(createCarInput, chooseColorInput, createCarBtn);

//form for the edition
let editCarInput= document.createElement('input');
editCarInput.classList.add('input');
editCarInput.setAttribute('type','text');
editCarInput.id = 'changeCarName';

let editColorInput = document.createElement('input');
editColorInput.classList.add('input');
editColorInput.setAttribute('type','color');
editColorInput.setAttribute('name','color');
editColorInput.id='changeCarColor';

let editCarBtn= document.createElement('input');
editCarBtn.setAttribute('type','submit');
editCarBtn.classList = 'btn editCarBtn';
editCarBtn.innerText = 'Update';

let formEdit = document.createElement('form');
formEdit.getAttribute('action')
formEdit.setAttribute('id','form');
formEdit.setAttribute('name','form');
formEdit.classList = 'form formEdit';
formEdit.append(editCarInput,editColorInput, editCarBtn);

let random10carsButton = document.createElement('button');
random10carsButton.setAttribute('type', 'button');
random10carsButton.classList = 'btn random10carsButton';
random10carsButton.innerText = 'Create 10';

//Amount in the additional functionality block 
let garageAmount= document.createElement('div');
garageAmount.innerHTML = 'Garage: '; 
garageAmount.classList = 'garageAmount';

let winnersAmount= document.createElement('div');
winnersAmount.innerHTML = 'Winners: ';

fragment3.appendChild(winnersAmount);

//Additional functionalities block
let additionalFunc = document.createElement('div');
additionalFunc.classList = 'additionalFunc';
additionalFunc.append(formCreate, formEdit, random10carsButton, garageAmount);

//block with cars in the garage, hidden initially
let carsWrapper = document.createElement('div');
carsWrapper.classList = 'carsWrapper';
carsWrapper.classList.toggle('close');

let deleteCarButton = document.createElement('button');
deleteCarButton.classList = 'btn';
carsWrapper.append(deleteCarButton);
deleteCarButton.innerHTML = 'Delete';

//block winners, hidden initially
let winnersWrapper = document.createElement('div');
winnersWrapper.classList = 'winnersWrapper'; 
winnersWrapper.classList.toggle('close');

fragment1.append(topBtn, additionalFunc, carsWrapper, winnersWrapper, bottomBtn);
body.appendChild(fragment1);


async function getGarageAmount(){
  await fetch(`${garageUrl}?&${carsParams}`)
    .then(response => { 
      let amount = response.headers.get('X-Total-Count')
      garageAmount.value = ""; //why it doesn't clean value?
      garageAmount.append(amount);    
      return response.json(); 
  })
}

async function getCarsInGarage(page){
  //await fetch(`${garageUrl}?&${carsParams}`)
  await fetch(`${garageUrl}?&_page=${page}&_limit=7`)
    .then(response => {
      return response.json();   
    })
    .then((data)=> carsHandling(data));  
};

function carsHandling(data){  
  for(let i =0; i<data.length; i++){
    let carName = document.createElement('div');
    carName.classList = 'carName';
    carName.append(data[i].name);
    let carImg = document.createElement('img');
    carImg.setAttribute('src',link );
    carImg.style.fill = data[i].color
    let car = document.createElement('div');
    car.classList = 'car';
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
    winner.classList = 'winner';
    winner.setAttribute('id', data[i].id);
    let winnerRating = document.createElement('div');
    winnerRating.classList = 'winnerRating';
    winnerRating.append(data[i].wins);
    let winnerTime = document.createElement('div');
    winnerTime.classList = 'winnerTime';
    winnerTime.append(data[i].time);
    winner.append(winnerRating, winnerTime);
    let winners = document.createElement('div');
    winners.append(winner);
    fragment3.appendChild(winners);
    winnersWrapper.appendChild(fragment3);
  }
}

//click actions
toGarageBtn.addEventListener('click', () => getCarsInGarage());
toGarageBtn.addEventListener("click", (e) => {
  carsWrapper.classList.toggle('close'); 
})
toGarageBtn.addEventListener('click', () => getGarageAmount());

toWinnerBtn.addEventListener('click',  () => getWinners());
toWinnerBtn.addEventListener("click", (e) => {
  winnersWrapper.classList.toggle('close'); 
})
toWinnerBtn.addEventListener('click',() => getWinnersAmount());

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
  .then((data) => console.log("Car was created", data))
  getGarageAmount();
  e.target.reset();

})

// choos the car and getting id'
carsWrapper.addEventListener('click', event=> {
  let car = event.target.closest('.car');
  if (!car) return;
  id = car.getAttribute('data-id');
  return id; 
})

formEdit.addEventListener('submit', function(e){
  e.preventDefault();
  const payload = {name: changeCarName.value, color:changeCarColor.value};
  console.log(payload);
  fetch(`${garageUrl}/${id}`, {
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    })
  .then(response=>response.json())
  .then((data) => console.log("Car was updated", data))
})



deleteCarButton.addEventListener('click', () =>deleteCar(id));
//delete car
async function deleteCar(id){
    await fetch(`${garageUrl}/${id}`,{method:'DELETE'})
      .then((response)=>response.json())
      .then((data) => console.log("Car was deleted", data))
      .catch((error) => {console.log(error)});

    getCarsInGarage(); //why it doesn't reload the cars list?
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
  }
  return random10Cars;  
}
randomCars();

/*async function storeRandomCars() {   // why creating  non stop here ?
  randomCars().forEach(car =>{
    fetch(garageUrl, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
      })
    .then(response=>response.json())
    .then((data) => console.log(data))
    getGarageAmount();
  })
}


random10carsButton.addEventListener('click', storeRandomCars());*/


// pagination
let page = carsParams.get("page");   

nextBtn.addEventListener("click", () => {
  page += 1; 
  console.log(page);
  getCarsInGarage(page);
})

prevBtn.addEventListener("click", () => {
  page -= 1;
  getCarsInGarage(page);
})
