const Monday = document.getElementsByClassName('mon')[0]
const Tuesday = document.getElementsByClassName('tue')[0]
const Wednesday = document.getElementsByClassName('wed')[0]
const Thursday = document.getElementsByClassName('thu')[0]
const Friday = document.getElementsByClassName('fri')[0]
const Saturday = document.getElementsByClassName('sat')[0]
const Sunday = document.getElementsByClassName('sun')[0]

const MonVal = Monday.parentElement.getElementsByClassName('value')[0]
const TueVal = Tuesday.parentElement.getElementsByClassName('value')[0]
const WedVal = Wednesday.parentElement.getElementsByClassName('value')[0]
const ThuVal = Thursday.parentElement.getElementsByClassName('value')[0]
const FriVal = Friday.parentElement.getElementsByClassName('value')[0]
const SatVal = Saturday.parentElement.getElementsByClassName('value')[0]
const SunVal = Sunday.parentElement.getElementsByClassName('value')[0]

const days = [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]

const BLUE = "hsl(186, 34%, 60%)"
const LIGHTBLUE = "hsl(186, 34%, 80%)"
const LIGHTRED = "hsl(10, 79%, 80%)"
const RED = "hsl(10, 79%, 65%)"

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}


function main() {
    date = new Date()
    today = days[date.getDay()-1]
    today.style.backgroundColor = BLUE
    
    for (let day of days) {
        if (day === today) {
            day.addEventListener('mouseenter', ()=>{
                day.style.backgroundColor = LIGHTBLUE; showValue(day)})
            day.addEventListener('mouseleave', ()=>{
                day.style.backgroundColor = BLUE; hideValue(day)})
        }
        else {
            day.addEventListener('mouseenter', ()=>{
                day.style.backgroundColor = LIGHTRED; showValue(day)})
            day.addEventListener('mouseleave', ()=>{
                day.style.backgroundColor = RED; hideValue(day)})
        }
    }
}

function showValue(day) {
    fetch('./data.json')
        .then((response) => response.json())
        .then((data) => {
            day.classList.add('animate');
            switch (day) {
                case Monday:
                    MonVal.innerText = data[days.indexOf(day)]['amount']
                    setTimeout(()=>{Monday.style.height = `${data[days.indexOf(day)]['amount']}%`},500)
                    MonVal.style.display = "block"
                    break
                case Tuesday:
                    TueVal.innerText = data[days.indexOf(day)]['amount']
                    setTimeout(()=>{Tuesday.style.height = `${data[days.indexOf(day)]['amount']}%`},500)
                    TueVal.style.display = "block"
                    break
                case Wednesday:
                    WedVal.innerText = data[days.indexOf(day)]['amount']
                    setTimeout(()=>{Wednesday.style.height = `${data[days.indexOf(day)]['amount']}%`},500)
                    WedVal.style.display = "block"
                    break
                case Thursday:
                    ThuVal.innerText = data[days.indexOf(day)]['amount']
                    setTimeout(()=>{Thursday.style.height = `${data[days.indexOf(day)]['amount']}%`},500)
                    ThuVal.style.display = "block"
                    break
                case Friday:
                    FriVal.innerText = data[days.indexOf(day)]['amount']
                    setTimeout(()=>{Friday.style.height = `${data[days.indexOf(day)]['amount']}%`},500)
                    FriVal.style.display = "block"
                    break
                case Saturday:
                    SatVal.innerText = data[days.indexOf(day)]['amount']
                    setTimeout(()=>{Saturday.style.height = `${data[days.indexOf(day)]['amount']}%`},500)
                    SatVal.style.display = "block"
                    break
                case Sunday:
                    SunVal.innerText = data[days.indexOf(day)]['amount']
                    setTimeout(()=>{Sunday.style.height = `${data[days.indexOf(day)]['amount']}%`},500)
                    SunVal.style.display = "block"
                    break
                
            }
        })
}

function hideValue(day) {
    day.classList.add('animate');
    switch (day) {
        case Monday:
            setTimeout(()=>{Monday.style.height = `10%`},500)
            MonVal.style.display = "none"
            break
        case Tuesday:
            setTimeout(()=>{Tuesday.style.height = `20%`},500)
            TueVal.style.display = "none"
            break
        case Wednesday:
            setTimeout(()=>{Wednesday.style.height = `30%`},500)
            WedVal.style.display = "none"
            break
        case Thursday:
            setTimeout(()=>{Thursday.style.height = `40%`},500)
            ThuVal.style.display = "none"
            break
        case Friday:
            setTimeout(()=>{Friday.style.height = `50%`},500)
            FriVal.style.display = "none"
            break
        case Saturday:
            setTimeout(()=>{Saturday.style.height = `60%`},500)
            SatVal.style.display = "none"
            break
        case Sunday:
            setTimeout(()=>{Sunday.style.height = `70%`},500)
            SunVal.style.display = "none"
            break
    }
}