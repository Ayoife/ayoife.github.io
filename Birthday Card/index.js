const Card = document.getElementsByClassName('card')[0]
const FirstPage = document.querySelector('.first-page')
const SecondPage = document.querySelector('.second-page')
const ThirdPage = document.querySelector('.third-page')
const FourthPage = document.querySelector('.fourth-page')
const MQL = window.matchMedia("(max-width: 999px)")


var currentCard = "First"
var Cards = ["First", "Second", "Third", "Fourth"]
var Pages = [FirstPage, SecondPage, ThirdPage, FourthPage]

Card.addEventListener('click', change_card)


function change_card() {
    if (MQL.matches) {
        Card.style.transformOrigin = "none"
        currentCard = Cards[(Cards.indexOf(currentCard)+1) % Cards.length]
    }
    // else {
    //     Card.style.transformOrigin = "left"
    // }
    display_card()
}


function display_card() {
    Card.style.transition = "transform 2s"
    if (currentCard != "Third") {
        if (currentCard == "Second") {
            Card.style.transform = "rotateY(-180deg)"
        }
        else {
            Card.style.transform = "rotateY(180deg)"
        }
    }
    setTimeout(()=>{
        for (i=0; i<Pages.length; i++) {
            Pages[i].style.display = "none"
            Card.style.borderBottomLeftRadius = "0"
            Card.style.borderTopRightRadius = "0"
            Card.style.borderBottomRightRadius = "0"
            Card.style.borderTopLeftRadius = "0"
        }
        Card.style.transition = "none"
        Card.style.transform = "rotateY(0deg)"
        if (currentCard == "First") {
            Card.style.borderTopRightRadius = "3.5rem"
        }
        if (currentCard == "Fourth") {
            Card.style.borderTopLeftRadius = "3.5rem"
        }
        if (currentCard == "First" | currentCard == "Third") {
            Card.style.borderBottomRightRadius = "3.5rem"
        }
        else if (currentCard == "Second" | currentCard == "Fourth") {
            Card.style.borderBottomLeftRadius = "3.5rem"
        }
        Pages[Cards.indexOf(currentCard)].style.display = "block"}, 
    600)
}