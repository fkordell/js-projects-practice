const textareaEl = document.querySelector('.textarea');
const charactersNumberEl = document.querySelector('.stat__number--characters');
const wordsNumberEl = document.querySelector('.stat__number--words');
const twitterNumberEl = document.querySelector('.stat__number--twitter');
const facebookNumberEl = document.querySelector('.stat__number--facebook');

const inputHandler = () => {
    if (textareaEl.value.includes('<script>')){
        alert('You cannot write that.')
        textareaEl.value = textareaEl.value.replace('<script>', '')
    }
    
    let numberOfWords = textareaEl.value.split(' ').length;
    if (textareaEl.value.length === 0) {
        numberOfWords = 0;
    }
    const numberOfCharacters = textareaEl.value.length;
    const twiiterCharacters = 280 - numberOfCharacters;
    const facebookCharacters = 2200 - numberOfCharacters;
    
    if (twiiterCharacters < 0 ){
        twitterNumberEl.classList.add('stat__number--limit');
    } else{
        twitterNumberEl.classList.remove('stat__number--limit');
    }
    if (facebookCharacters < 0){
        facebookNumberEl.classList.add('stat__number--limit');
    } else {
        facebookNumberEl.classList.remove('stat__number--limit');
    }
    
    wordsNumberEl.textContent =  numberOfWords;
    charactersNumberEl.textContent = numberOfCharacters;
    twitterNumberEl.textContent = twiiterCharacters;
    facebookNumberEl.textContent = facebookCharacters;

}

textareaEl.addEventListener('input', inputHandler);