const firstNum = document.getElementById('firstNum');
const secondNum = document.getElementById('secondNum');
const thirdNum = document.getElementById('thirdNum');
const play = document.getElementById('play');
const boxes = Array.from(document.getElementsByClassName('box'));
const bet = document.getElementById('bet');
const balance = document.getElementById('balance');
const newGame = document.getElementById('newGame');
const error = document.getElementById('error');
let randomNum;
let count = 0;
let myBalance = 1
let notReded = 0;
let isClicked =  false;
const coef1 = 1;
const coef2 = 20;
const coef3 = 45;

play.addEventListener('click', keno)


function keno() {
    if (firstNum.value && secondNum.value && thirdNum.value && bet.value <= Number(balance.innerText) && bet.value > 49) {
        if (firstNum.value !== secondNum.value && firstNum.value !== thirdNum.value &&
            secondNum.value !== thirdNum.value && !isClicked) {
            balance.innerText = balance.innerText - bet.value
            for (let i = 0; i < 35; i++) {
                setTimeout(() => {
                    randomNum = Math.floor(Math.random(40) * boxes.length);
                    if (boxes[randomNum].style.backgroundColor !== 'grey') {
                        boxes[randomNum].style.backgroundColor = 'grey';
                        count++
                    } else {
                        let isNotFin = true;
                        while (isNotFin) {
                            let randomNum = Math.floor(Math.random(40) * boxes.length);
                            if (boxes[randomNum].style.backgroundColor !== 'grey') {
                                boxes[randomNum].style.backgroundColor = 'grey';
                                count++
                                isNotFin = false;
                            }
                        }
                    }
                    if(count === 35) {
                        boxes.map(el => {
                            if(el.style.backgroundColor !== 'grey') {
                                if(el.innerText === firstNum.value || el.innerText === secondNum.value
                                    || el.innerText === thirdNum.value) {
                                    notReded++;
                                    el.style.backgroundColor = 'green'
                                } else {
                                    el.style.backgroundColor = 'red'
                                } 
                            }
                        })
                        if(notReded === 1) {
                            myBalance = bet.value * coef1;
                            balance.innerText = +balance.innerText + myBalance;
                        } else if(notReded === 2) {
                            myBalance = bet.value * coef2;
                            balance.innerText = +balance.innerText + myBalance;
                        } else if(notReded === 3) {
                            myBalance = bet.value * coef3;
                            balance.innerText = +balance.innerText + myBalance;
                        } 
                    }
                    isClicked = !isClicked
                     
                }, 50 * i );      
            }  
        }  
    } else if (bet.value > Number(balance.innerText)) {
        error.innerText = 'Your entered money is too big!';
        error.style.display = 'block'
        isClicked = !isClicked
    } else if(bet.value < 50) {
        error.innerText = 'Your entered money is not enough for playing this game.'
        error.style.display = 'block'
        isClicked = !isClicked
    }
}


newGame.addEventListener('click', () => {
    firstNum.value = ''
    secondNum.value = ''
    thirdNum.value = ''
    bet.value = ''
    notReded = 0
    count = 0
    error.innerText = ''
    error.style.display = 'none'
    boxes.map(el => el.style.backgroundColor = '#80D24E')
    isClicked = !isClicked
    keno()
})


