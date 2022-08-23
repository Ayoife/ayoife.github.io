const WHITE = "hsl(0, 0%, 100%)"
const LIGHTGREY = "hsl(217, 12%, 63%)"
const DARKBLUE = "hsl(213, 19%, 22%)"
const MEDGREY = "hsl(216, 12%, 54%)"

const UIContainer = document.getElementById('user-input')
const TUContainer = document.getElementById('thank-you')
const ratingButtons = document.querySelectorAll('.circle.hov')
const submitButton = document.getElementsByTagName('button')[0]

var rating;


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}

function main() {
    for (let i=0; i<ratingButtons.length; i++) {
        ratingButton = ratingButtons[i]
        ratingButton.addEventListener('click', save_rating)
    }
    submitButton.addEventListener('click', showThankYou)
}


function save_rating(event) {
    // Reset all rating buttons
    for (let i=0; i<ratingButtons.length; i++) {
        ratingButton = ratingButtons[i]
        ratingButton.style.backgroundColor = DARKBLUE
        ratingButton.style.color = MEDGREY
    }
    button = event.target
    button.style.backgroundColor = LIGHTGREY
    button.style.color = WHITE
    rating = button.innerText
}


function showThankYou() {
    if (rating == undefined) {
        alert("Please choose a rating")
        submitButton.classList.add("shake")
        setTimeout(()=>{submitButton.classList.remove("shake")}, 500)
    }
    else {
        UIContainer.style.display = "none"
        TUContainer.getElementsByClassName("selected")[0].innerText = `You selected ${rating} out of 5`
        TUContainer.style.display = "block"
        TUContainer.classList.add("zoom")
    }
}


