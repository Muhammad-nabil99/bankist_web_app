'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-09-29T21:31:17.178Z',
    '2022-09-28T07:42:02.383Z',
    '2022-09-26T09:15:04.904Z',
    '2023-09-22T10:17:24.185Z',
    '2023-09-28T14:11:59.604Z',
    '2023-09-09T17:01:17.194Z',
    '2023-09-10T23:36:17.929Z',
    '2023-09-16T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE', // de-DE
};





const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2013-11-01T13:15:33.035Z',
    '2013-11-30T09:48:16.867Z',
    '2013-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-09-17T16:33:06.386Z',
    '2020-09-10T14:43:26.374Z',
    '2023-09-21T18:49:59.371Z',
    '2023-09-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'id-ID',
  // locale: 'en-US', //america
};

const account3 = {
  owner: 'Tomo Yashimita',
  movements: [51000, 32400, -1450, -7390, -3210, -10100, 81500, -130],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    '2015-11-01T13:15:33.035Z',
    '2012-11-30T09:48:16.867Z',
    '2017-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2027-09-17T16:33:06.386Z',
    '2028-09-10T14:43:26.374Z',
    '2029-09-21T18:49:59.371Z',
    '2021-09-20T12:01:20.894Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP',
};
const account4 = {
  owner: 'Muhammad Nabil',
  movements: [100000, -1650, -7590, -3210, -10600, 53500, -350,200000],
  interestRate: 1.5,
  pin: 4444,

  movementsDates: [
    '2013-01-01T13:15:33.035Z',
    '2013-12-30T09:48:16.867Z',
    '2013-12-25T06:04:23.907Z',
    '2020-04-25T14:18:46.235Z',
    '2020-05-17T16:33:06.386Z',
    '2020-06-10T14:43:26.374Z',
    '2023-07-21T18:49:59.371Z',
    '2023-02-20T12:01:20.894Z',
  ],
  currency: 'IDR',
  locale: 'id-ID',
  // locale: 'en-US', //america
};


const accounts = [account1, account2,account3,account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');





const username = function(acc){
  acc.forEach((acc) =>{
    acc.username = acc.owner.toLowerCase().split(' ').map(acc => acc[0]).join('');
  })
}
username(accounts);


//SECTION formated numb
const formatedNumb = function(value,locale,currency){
  
   return new Intl.NumberFormat(locale,{
    style : 'currency',
    currency : currency,
  }).format(value);
}
//SECTION formated date



const formatedDate = (local,date) => {
  const day = (date1,date2) => Math.trunc(Math.abs(date1-date2)/(1000*60*60*24));
  const countDay = day(new Date(),date)

  if(countDay === 0) return 'Today';
  if(countDay === 1) return 'Yesterday';
  if(countDay <= 7) return `${countDay} days ago`;
  return new Intl.DateTimeFormat(local).format(date);
  
}



//SECTION DISPLAY MOVEMENT
const movementAcc = function(acc,sort = false){
  
  containerMovements.innerHTML = '';
  const mov = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;
  
  mov.forEach(function(mov,i){
    
    
    const type = mov < 0 ? 'withdrawal' : 'deposit';
    const dateMovement = new Date(acc.movementsDates[i]);
    // console.log(dateMovement);
    const reformatedDate = formatedDate(acc.locale,dateMovement);
    // console.log(reformatedDate);
    
    const html = `
            <div class="movements__row">
              <div class="movements__type movements__type--${type}">${i + 1+' '+type}</div>
              <div class="movements__date">${reformatedDate}</div>
              <div class="movements__value">${formatedNumb(mov,acc.locale,acc.currency)}</div>
              </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin',html);
    })
    
    
    
  };
  

  //SECTION DISPLAY BALANCE
  
  const balanceAcc = function(acc){
    acc.balance =  acc.movements.map(acc => acc).reduce((counter,acc) => counter + acc);;
    labelBalance.textContent = `${formatedNumb(acc.balance,acc.locale,acc.currency)}`; 
  };


//SECTION DISPLAY CALCULATION SUMMERY
const calcSummery = function(acc){
  
  const income = acc.movements.map(acc => acc).reduce((counter,acc) => counter + acc);
  labelSumIn.textContent = `${formatedNumb(income,acc.locale,acc.currency)}`; 
  const out =Math.abs( acc.movements.filter(acc => acc < 0).reduce((counter,acc) => counter + acc));
  labelSumOut.textContent = `${formatedNumb(out,acc.locale,acc.currency)}`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) =>  int >= 1)
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${formatedNumb(interest,acc.locale,acc.currency)}`;

  }
  
  
  //SECTION UPDATE UI
  const updateUI = function(acc){
    movementAcc(acc);
    calcSummery(acc);
    balanceAcc(acc);
    
  }
  
 

  let currentAccount,timer;
// fake login
  // let currentAccount = account1;
  // containerApp.style.opacity = '100';
  // updateUI(currentAccount)
  //countdowns
const formatedCountdownTimer = function(){
  const tick = function(){
    let min = String(Math.trunc(time/60)).padStart(2,0);
    let sec = String(time%60).padStart(2,0);
    labelTimer.textContent = `${min}:${sec}`;
    
    if(time === 0){
      clearInterval(tick);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  }
  let time = 600;
  tick();
  const timer = setInterval(tick,1000);
  return timer;



}
  

  

  
  let chanceLoan;
  btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    if(currentAccount?.pin === +inputLoginPin.value){
      //label welcome
      chanceLoan = true;
      labelWelcome.textContent = `Welcome back,${currentAccount.owner.split(' ')[0]}`;
      
      
      containerApp.style.opacity = '100';
      if(timer) clearInterval(timer)
      timer = formatedCountdownTimer();
      //update UI
      updateUI(currentAccount)

      }
    inputLoginPin.value = inputLoginUsername.value= '';
    // date balance
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount?.locale).format(new Date());
  });
  
  
  btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    
    //receiver
    const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
    if(inputTransferTo.value && receiver?.username !== currentAccount.username && +inputTransferAmount?.value > 0 && currentAccount.balance > +inputTransferAmount?.value ){
      //the username shouldn't the same inputtransfer field
      //the amount should > 0
      
      // decrease currentAccount income
      currentAccount.movements.push(-(+inputTransferAmount.value));
      //increase receiver income
      console.log(currentAccount.movements);
      receiver.movements.push(+inputTransferAmount.value)

      
      currentAccount.movementsDates.push(new Date().toISOString())
      receiver.movementsDates.push(new Date().toISOString())
      //updateUI
      updateUI(currentAccount);
      //clear field input
      clearInterval(timer)
      timer = formatedCountdownTimer(timer)
    }
    inputTransferTo.value = inputTransferAmount.value= '';
  });
  

  btnLoan.addEventListener('click',function(e){
    e.preventDefault();
    const amount = +inputLoanAmount.value
    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1 && chanceLoan)){
      // set delay
      setTimeout(()=>{

        currentAccount.movementsDates.push(new Date().toISOString());
        currentAccount.movements.push(+amount);
        updateUI(currentAccount);
      },1000)
      chanceLoan = !chanceLoan;
     
    }
    inputLoanAmount.value = '';
  });
  
  btnClose.addEventListener('click',function(e){
    e.preventDefault();
  if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === +inputClosePin.value){
    const index = accounts.findIndex(acc => acc.username === inputCloseUsername.value);
    accounts.splice(index,1)
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = '0';
    labelWelcome.textContent = `Log in to get started`;
    
  }
  
})


// sorting
  let sort = false;
  btnSort.addEventListener('click',function(e){
    e.preventDefault();
    movementAcc(currentAccount,!sort);
    sort = !sort;
  });


// date movement
//formated international date
//formated international number
//countingTown





//exercise date format



// console.log(new Intl.DateTimeFormat('en-US',
// {
//   weekday : 'long',
//   month : 'numeric',
//   year : 'numeric',
//   day : 'numeric',
// }
// ).format(new Date()));





// //exercise number format

// const option ={
//   style : 'currency',
//   currency : 'USD',

// }


// const a = new Intl.NumberFormat('en-US').format(111111)
// const b = new Intl.NumberFormat('ar-SY').format(111111)
// const c = new Intl.NumberFormat('ja-JP',
// {
//   style : 'currency',
//   currency : 'JPY',

// }
// ).format(111111)
// const d = new Intl.NumberFormat('en-US',option).format(111111)
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);











const future = new Date(2023,9,4).toISOString();
// console.log(new Date(2023,8 + 1,3).getMonth());
// console.log(new Date(2023,8 + 1,3).getDate());
// console.log(future);
const now = new Date().toISOString();
console.log(now);



const convertDay = (now,future) => Math.trunc(Math.abs(future - now)/(1000*60*60*24)) ;
console.log(convertDay(new Date(now),new Date(future)));