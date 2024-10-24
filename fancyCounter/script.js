const increaseButtonEl = document.querySelector('.counter__button--increase');
const  decreaseButtonEl = document.querySelector('.counter__button--decrease');
const counterValueEl = document.querySelector('.counter__value')
const resetButtonEl = document.querySelector('.counter__reset--button')
const counterEl = document.querySelector('.counter');
const counterTitleEl = document.querySelector('.counter__title');

const incrementCounter = () => {
    const currentValue = counterValueEl.textContent;
    const currentValueAsNumber = +currentValue;
    let newValue = currentValueAsNumber + 1;
    if (newValue > 5){
        newValue = 5;
        counterEl.classList.add('counter--limit');
        counterTitleEl.innerHTML = 'Limit! Buy <b>Pro</b> for >5';
        increaseButtonEl.disabled = true;
        decreaseButtonEl.disabled = true;
    }
    counterValueEl.textContent = newValue;
    increaseButtonEl.blur();
}
const decrementCounter = () => {
    const currentValue = counterValueEl.textContent;
    const currentValueAsNumber = +currentValue;
    let newValue = currentValueAsNumber - 1;
    if (newValue < 0){
        newValue = 0;
    }
    counterValueEl.textContent = newValue;
    decreaseButtonEl.blur();
}

increaseButtonEl.addEventListener('click', incrementCounter);
document.addEventListener('keydown', incrementCounter);

decreaseButtonEl.addEventListener('click', decrementCounter);

resetButtonEl.addEventListener('click', () => {
    counterValueEl.textContent = 0;
    counterEl.classList.remove('counter--limit');
    counterTitleEl.textContent = 'Fancy Counter';
    increaseButtonEl.disabled = false;
    decreaseButtonEl.disabled = false;
    resetButtonEl.blur();
})
