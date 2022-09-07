const Daily = document.getElementsByClassName('timeframes')[0].childNodes[1]
const Weekly = document.getElementsByClassName('timeframes')[0].childNodes[3]
const Monthly = document.getElementsByClassName('timeframes')[0].childNodes[5]

const Work = document.getElementsByClassName('work')[0]
const Play = document.getElementsByClassName('play')[0]
const Study = document.getElementsByClassName('study')[0]
const Social = document.getElementsByClassName('social')[0]
const Exercise = document.getElementsByClassName('exercise')[0]
const SelfCare = document.getElementsByClassName('selfcare')[0]

const BLUE = "hsl(235, 45%, 61%)" 

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}

function main() {
    Daily.addEventListener('click', show)
    Weekly.addEventListener('click', show)
    Monthly.addEventListener('click', show)
}

function show(event) {
    target = event.target
    timeframe = target.innerText.toLowerCase();
    fetch('./data.json')
        .then((response) => response.json())
        .then((data) => {changeColor(target); changeDash(timeframe, data)})
}

function changeColor(button) {
    buttons = [Daily, Weekly, Monthly]
    for (let b of buttons) {
        b.style.color = BLUE
    }
    button.style.color = "white"
}

function changeDash(timeframe, data) {
    titles = ['Work', 'Play', 'Study', 'Exercise', 'Social', 'Self Care']
    htmls = [Work, Play, Study, Exercise, Social, SelfCare]
    for (i=0; i<titles.length; i++) {
        current = data[i]['timeframes'][timeframe]['current'];
        previous = data[i]['timeframes'][timeframe]['previous'];

        currentTime = parseInt(current) != 1? `${current}hrs` : `${current}hr`
        previousTime = parseInt(previous) != 1? `${previous}hrs` : `${previous}hr`

        html = htmls[i]
        html.getElementsByClassName('time')[0].getElementsByTagName('h2')[0].innerText = currentTime

        if (timeframe == 'daily') {
            html.getElementsByClassName('time')[0].getElementsByTagName('p')[0].innerText = `Yesterday - ${previousTime}`
        }
        else if (timeframe == 'weekly') {
            html.getElementsByClassName('time')[0].getElementsByTagName('p')[0].innerText = `Last Week - ${previousTime}`
        }
        else if (timeframe == 'monthly') {
            html.getElementsByClassName('time')[0].getElementsByTagName('p')[0].innerText = `Last Month - ${previousTime}`
        }
    }
}


