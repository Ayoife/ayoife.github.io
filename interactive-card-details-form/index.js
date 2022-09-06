const FormSection = document.querySelector('.section-form')
const ThankYouSection = document.querySelector('.section-thank-you')

const CardBackNumber = document.querySelector('.card-back > p')
const CardNumber = document.querySelector('.card-front > p')
const CardOwnerName = document.getElementById('name')
const ExpDate = document.getElementById('date')

const CardOwnerInput = document.getElementById('c-name')
const CardNumberInput = document.getElementById('c-number')
const ExpMonthInput = document.getElementById('exp-month')
const ExpYearInput = document.getElementById('exp-year')
const CVCInput = document.getElementById('c-cvc')

const CardOwnerError = document.getElementById('name-error')
const CardNumberError = document.getElementById('number-error')
const ExpError = document.getElementById('exp-error')
const CVCError = document.getElementById('cvc-error')

const ConfirmButton = document.getElementById('confirm')
const ContinueButton = document.getElementById('continue')

const RED = "hsl(0, 100%, 66%)"
const GREY = "hsl(279, 6%, 55%)"


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}


function main() {
    inputs = [CardNumberInput, CardOwnerInput, ExpMonthInput, ExpYearInput, CVCInput]
    for (i=0; i < inputs.length; i++) {
        input = inputs[i]
        input.addEventListener('keyup', handleInput)
        input.addEventListener('change', handleInput)
    }
    ConfirmButton.addEventListener('click', processForm)
    ContinueButton.addEventListener('click', reloadPage)
}

function handleInput(event) {
    input = event.target
    if (input == CardOwnerInput) {
        content = input.value
        CardOwnerName.innerText = content.toUpperCase()
    }
    else if (input == CardNumberInput) {
        counter = -1
        content = input.value.split(' ').join('')
        text = ''
        if (content.length) {
            for (i=0; i < content.length; i++) {
                text += content[i]
                if (i - counter == 4) {
                    text += ' ' 
                    counter = i
                }
                CardNumber.innerText = text
                if (i == 15) {
                    break
                }
            }
        }
        else {
            CardNumber.innerText = ''
        }
        
    }
    else if (input == ExpMonthInput){
        mcont = input.value
        month = parseInt(mcont)
        ycont = ExpYearInput.value
        year = parseInt(ycont)
        value = ''
        if (month !== NaN && 0 < month && month <=12) {
            value += mcont.length == 1? `0${mcont}/` : `${mcont.slice(0,2)}/`
        }
        else {
            value += '00/'
        }
        if (year !== NaN && 1000 <= year && year <= 9999) {
            value += ycont.length == 1? `0${ycont}` : `${ycont.slice(-2,ycont.length)}`
        }
        else {
            value += '00'
        }
        ExpDate.innerText = value
    }
    else if (input == ExpYearInput){
        mcont = ExpMonthInput.value
        month = parseInt(mcont)
        ycont = input.value
        year = parseInt(ycont)
        value = ''
        if (month !== NaN && 0 < month && month <=12) {
            value += mcont.length == 1? `0${mcont}/` : `${mcont.slice(0,2)}/`
        }
        else {
            value += '00/'
        }
        if (year !== NaN && 1000 <= year && year <= 9999) {
            value += ycont.length == 1? `0${ycont}` : `${ycont.slice(-2,ycont.length)}`
        }
        else {
            value += '00'
        }
        ExpDate.innerText = value
    }
    else if (input == CVCInput) {
        content = CVCInput.value
        value = parseInt(content)
        if (value !== NaN && 100 <= value && value < (10**24)) {
            CardBackNumber.innerText = value.toString()
        }
        else {
            CardBackNumber.innerText = "000"
        }
    }
}

function processForm() {
    resetErrors()
    inputs = [CVCInput, CardNumberInput, ExpMonthInput, ExpYearInput, CardOwnerInput]
    foundError = false
    for (let input of inputs) {
        if (input == CardOwnerInput) {
            if (input.value == '') {
                foundError = true
                CardOwnerError.style.display = "block"
                CardOwnerInput.style.border = `2px solid ${RED}`
            }
        }
        else if (input == CardNumberInput) {
            if (input.value == '') {
                foundError = true
                CardNumberError.innerText = "Can't be empty"
                CardNumberInput.style.border = `2px solid ${RED}`
                CardNumberError.style.display = "block"
            }
            else {
                pattern = /^[0-9]+$/
                if (!pattern.test(input.value.split(' ').join(''))) {
                    foundError = true
                    CardNumberError.innerText = "Wrong format, numbers only"
                    CardNumberInput.style.border = `2px solid ${RED}`
                    CardNumberError.style.display = "block"
                }
            }
        }
        else if (input == ExpYearInput || input == ExpMonthInput) {
            if (input.value == '') {
                foundError = true
                ExpError.innerText = "Can't be empty"
                if (input == ExpYearInput) {
                    ExpYearInput.style.border = `2px solid ${RED}`
                }
                else {
                    ExpMonthInput.style.border = `2px solid ${RED}`
                }
                ExpError.style.display = "block"
            }
            else {
                if (input == ExpMonthInput) {
                    if (ExpDate.innerText.slice(0,2) == '00') {
                        foundError = true
                        ExpError.innerText = "Month and/or Year is invalid"
                        ExpMonthInput.style.border = `2px solid ${RED}`
                        ExpError.style.display = "block"
                    }
                }
                else {
                    if (parseInt(ExpYearInput.value)==0 || (ExpYearInput.value.length != 4 && ExpDate.innerText.slice(-2,ExpDate.innerText.length) == '00')) {
                        foundError = true
                        ExpError.innerText = "Month and/or Year is invalid"
                        ExpYearInput.style.border = `2px solid ${RED}`
                        ExpError.style.display = "block"
                    }
                }
            }
        }
        else if (input == CVCInput) {
            if (input.value == '') {
                foundError = true
                CVCError.innerText = "Can't be empty"
                CVCInput.style.border = `2px solid ${RED}`
                CVCError.style.display = "block"
            }
            else {
                if (CardBackNumber.innerText == "000") {
                    foundError = true
                    CVCError.innerText = "CVC must be 3-digits and 25-chrs long"
                    CVCInput.style.border = `2px solid ${RED}`
                    CVCError.style.display = "block"
                }
            }
        }
    }

    if (!foundError) {
        showThankYou()
    }
}

function resetErrors() {
    inputs = [CardNumberInput, CardOwnerInput, ExpMonthInput, ExpYearInput, CVCInput]
    for (let input of inputs) {
        input.style.border = `1px solid ${GREY}`
    }
    errors = [CardOwnerError, CardNumberError, ExpError, CVCError]
    for (let error of errors) {
        error.style.display = "none"
    }

}

function showThankYou() {
    FormSection.style.transform = "scale(0)"
    setTimeout(()=>{FormSection.style.display = "none"}, 400)
    ThankYouSection.style.transform = "scale(1)"
    setTimeout(()=>{ThankYouSection.style.display = "flex"}, 500)
}

function reloadPage() {
    window.location.reload()
}

