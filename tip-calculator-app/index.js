const BillInput = document.querySelector('.bill .input-field input')
const PersonInput = document.querySelector('.people .input-field input')
const BillInputField = document.querySelector('.bill .input-field')
const PersonInputField = document.querySelector('.people .input-field')
const ZeroError = document.querySelector('.labels > *:last-child')
const Tip5 = document.querySelector('.tip div button:nth-child(1)')
const Tip10 = document.querySelector('.tip div button:nth-child(2)')
const Tip15 = document.querySelector('.tip div button:nth-child(3)')
const Tip25 = document.querySelector('.tip div button:nth-child(4)')
const Tip50 = document.querySelector('.tip div button:nth-child(5)')
const CustomInput = document.querySelector('.tip div input')
const TipAmount = document.getElementById('tip')
const TotalAmount = document.getElementById('total')
const ResetButton = document.querySelector('article button')

const LIGHTGREEN = "hsl(172, 67%, 45%)"
const DARKGREEN = "hsl(183, 100%, 15%)"
const WHITE = "hsl(0, 0%, 100%)"
const RED = "rgb(252, 82, 82)"

const tips = [Tip5, Tip10, Tip15, Tip25, Tip50]

var Tip;


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}

function main() {
    BillInput.addEventListener('focus', showOutline)
    PersonInput.addEventListener('focus', showOutline)
    BillInput.addEventListener('blur', hideOutline)
    PersonInput.addEventListener('blur', hideOutline)
    for (let tip of tips) {
        tip.addEventListener('click', saveTip)
    }
    CustomInput.addEventListener('change', saveTip)
}

function showOutline(event) {
    target = event.target
    if (target == BillInput) {
        BillInputField.style.border = `2px solid ${LIGHTGREEN}`
    }
    else if (target == PersonInput) {
        PersonInputField.style.border = `2px solid ${LIGHTGREEN}`
    }
}

function hideOutline(event) {
    target = event.target
    if (target == BillInput) {
        BillInputField.style.border = '0'
    }
    else if (target == PersonInput) {
        PersonInputField.style.border = '0'
    }

    if (PersonInput.value == '0') {
        PersonInputField.style.border = `2px solid ${RED}`
        ZeroError.style.display = "block"
    }
    else {
        ZeroError.style.display = "none"
        setTipAndTotal()
    }
}

function saveTip(event) {
    TipButton = event.target
    // Reset all tips
    for (t of tips) {
        t.style.backgroundColor = DARKGREEN
        t.style.color = WHITE
    }

    // Set tip to either the button or input value
    if (tips.includes(TipButton)) {
        Tip = parseInt(TipButton.innerText.slice(0,-1))
        TipButton.style.backgroundColor = LIGHTGREEN
        TipButton.style.color = DARKGREEN
        CustomInput.value = ""
    }
    else {
        Tip = parseInt(CustomInput.value)
    }
    setTipAndTotal()
}

function setTipAndTotal() {
    if (BillInput.value != '' && Tip != undefined && PersonInput.value != '') {
        bill = parseInt(BillInput.value)
        people = parseInt(PersonInput.value)
        tip = parseFloat(((bill * (Tip/100))/people).toFixed(3))
        total = parseFloat(((bill + (bill * (Tip/100)))/people).toFixed(3))
        if (tip.toString().length > 11 || total.toString().length > 11) {
            tip = parseInt(tip).toExponential(2)
            total = parseInt(total).toExponential(2)
        }
        TipAmount.innerText = `$${tip}`
        TotalAmount.innerText = `$${total}`

        ResetButton.style.opacity = '1'
        ResetButton.addEventListener('click', reset)
    }
}

function reset() {
    window.location.reload()
}