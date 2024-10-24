const MAX_CHARS = 150;
const textareaEl = document.querySelector('.form__textarea');
const  counterEl  = document.querySelector('.counter');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn')
const formEl = document.querySelector('.form');
const spinnerEl = document.querySelector('.spinner');
const hashtagListEl = document.querySelector('.hashtags');
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';
const renderFeedbackItem = feedbackItem => {
    const feedbackItemHTML = `
    <li class="feedback">
    <button class="upvote">
        <i class="fa-solid fa-caret-up upvote__icon"></i>
        <span class="upvote__count">${feedbackItem.upvoteCount}</span>
    </button>
    <section class="feedback__badge">
        <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
    </section>
    <div class="feedback__content">
        <p class="feedback__company">${feedbackItem.company}</p>
        <p class="feedback__text">${feedbackItem.text}</p>
    </div>
    <p class="feedback__date">${feedbackItem.daysAgo  ===  0 ? 'NEW'  : `${feedbackItem.daysAgo}d`}</p>
    </li>
    `;
    feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
}

textareaEl.addEventListener('input', () => {
    const maxChar = MAX_CHARS;
    const charsTyped = textareaEl.value.length;
    const charsLeft = maxChar - charsTyped;
    counterEl.textContent = charsLeft;
});

// -- Form Component  -- //
const showVisualIndicator = textCheck => {
    const className = textCheck === 'valid' ? 'form__valid' : 'form__invalid';
    formEl.classList.add(className);
    setTimeout(()  => formEl.classList.remove(className), 2000);
}

formEl.addEventListener('submit', () => {
    const text = textareaEl.value;
    if (text.includes('#') && text.length >= 5){
        showVisualIndicator('valid');
    } else {
       showVisualIndicator('invalid');
    };
    textareaEl.focus();
    const hashtag = text.split(' ').find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const daysAgo = 0;
    const upvoteCount = 0;

    const feedbackItem = {
        upvoteCount: upvoteCount,
        company: company,
        badgeLetter: badgeLetter,
        daysAgo: daysAgo,
        text: text
    };
    renderFeedbackItem(feedbackItem);

    fetch(`${BASE_API_URL}/feedbacks`,  {
        method: 'POST',
        body: JSON.stringify(feedbackItem),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok){
            console.log('Failed to create feedback item.')
            return
        }
        console.log('Successfully submitted!')
    }).catch(err => console.log(err));

    textareaEl.value = '';
    submitBtnEl.blur();
    counterEl.textContent = MAX_CHARS;
    return;

});

//Feedback List Component
const clickHandler = event => {
    const clickedEl = event.target;
    const upvoteIntention  = clickedEl.className.includes('upvote');
    if (upvoteIntention){
       const upvoteBtnEl = clickedEl.closest('.upvote');
       upvoteBtnEl.disabled = true;
       const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
       let  upvoteCount = +upvoteCountEl.textContent;
       upvoteBtnEl.textContent = ++upvoteCount;
    } else {
        clickedEl.closest('.feedback').classList.toggle('feedback--expand')
    }
}
feedbackListEl.addEventListener('click', clickHandler)
fetch(`${BASE_API_URL}/feedbacks`)
    .then(res => res.json())
    .then(data => {
        spinnerEl.remove();
        data.feedbacks.forEach(feedbackItem => renderFeedbackItem(feedbackItem));
    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
    });

    let activeHashtag = null; 
    const clickHandler2 = event => {
        const clickedEl = event.target;
        if (!clickedEl.classList.contains('hashtag')) return; 
    
        const companyNameFromHashtag = clickedEl.textContent.substring(1).toLowerCase().trim();

        if (activeHashtag === companyNameFromHashtag) {
            activeHashtag = null; 
        } else {
            activeHashtag = companyNameFromHashtag;
        }
    
        feedbackListEl.childNodes.forEach(childNode => {
            if (childNode.nodeType === 3) return; 
    
            const companyNameFromFeedbackItem = childNode.querySelector('.feedback__company').textContent.toLowerCase().trim();
            
            if (!activeHashtag || companyNameFromHashtag === companyNameFromFeedbackItem) {
                childNode.classList.remove('hidden');
            } else {
                childNode.classList.add('hidden');
            }
        });
    };
    
    hashtagListEl.addEventListener('click', clickHandler2);
    