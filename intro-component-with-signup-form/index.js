const RED = "hsl(0, 100%, 74%)"
const BLACK = "rgb(0,0,0)"

const form = document.forms[0]

const FirstNameInput = form[0]
const LastNameInput = form[1]
const EmailInput = form[2]
const PasswordInput = form[3]
const submitButton = form[4]

const FNError = document.getElementById('firstname').getElementsByClassName('error')[0]
const LNError = document.getElementById('lastname').getElementsByClassName('error')[0]
const EmError = document.getElementById('email').getElementsByClassName('error')[0]
const PError = document.getElementById('password').getElementsByClassName('error')[0]

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", main)
}
else {
    main()
}

function main() {
    submitButton.addEventListener('click', validateForm)
}

function validateForm() {
    resetFormErrors()

    firstname = FirstNameInput.value
    lastname = LastNameInput.value
    email = EmailInput.value
    password = PasswordInput.value

    let errorFound = false;

    //Validate
    if (firstname == '') {
        errorFound = true;
        FirstNameInput.style.border = `2px solid ${RED}`
        FirstNameInput.classList.add("input-error")
        FNError.style.display = "block"
    }
    if (lastname == '') {
        errorFound = true;
        LastNameInput.style.border = `2px solid ${RED}`
        LastNameInput.classList.add("input-error")
        LNError.style.display = "block"
    }
    if (email == '') {
        errorFound = true;
        EmailInput.style.border = `2px solid ${RED}`
        EmailInput.classList.add("input-error")
        EmError.style.display = "block"
    }
    if (!valid(email) && email != '') {
        errorFound = true;
        EmailInput.style.border = `2px solid ${RED}`
        EmError.innerText = "Looks like this is not an email"
        EmailInput.classList.add("input-error")
        EmError.style.display = "block"
    }
    if (password == '') {
        errorFound = true;
        PasswordInput.style.border = `2px solid ${RED}`
        PasswordInput.classList.add("input-error")
        PError.style.display = "block"
    }

    if (!errorFound) {
        alert("Your Free trial has been claimed successfully!")
        let inputs = [FirstNameInput, LastNameInput, EmailInput, PasswordInput]
        for (let input of inputs) {
            input.value = ''
        }
    }
}

function valid(email) {
    pattern = /[a-zA-Z0-9]+@[a-z]+\.tld/
    if (pattern.test(email)) {
        return true
    }
    return false
}

function resetFormErrors() {
    let inputs = [FirstNameInput, LastNameInput, EmailInput, PasswordInput]
    for (let input of inputs) {
        input.style.border = `1px solid grey`
        input.classList.remove("input-error")
    }
    FNError.style.display = "none"
    LNError.style.display = "none"
    EmError.style.display = "none"
    PError.style.display = "none"
}
