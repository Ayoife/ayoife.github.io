const Toggle = document.querySelector('.slider')
const ToggleSwitch = document.querySelector('.switch')
const ExpText = document.querySelector('.expression')
const EvalText = document.querySelector('.eval')
const Keys = document.getElementsByClassName('key')
const Scientific = document.querySelector('.scientific')
const ScienKeys = document.querySelectorAll('.scientific > *')
const Degree = document.querySelector('.degree')
const Trigs = document.getElementsByClassName('trig')
const ThemeObj = document.getElementsByClassName('theme')

var SpecialKeys = ["DEL", "RESET", "=", "INV", "RAD", "DEG", "ANS"]
var Operators = ['+', '-', 'x', '/', '^', '%', 'x'+"\u221A"]
var Functions = ["!", "SIN", "COS", "TAN", "ASIN", "ACOS", "ATAN", "LOG", "ln", "\u221A", "\u03C0"]

var Theme = 0;
var CalcType = "standard"
var Expression = ''
var Evaluation = ''
var Invert = false
var lastOperator = ''
var trigUnit = 'degrees'
var lastAnswer = 0

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}

function main() {
    ToggleSwitch.addEventListener('click', changeTheme)
    for (i=0; i < Keys.length; i++) {
        key = Keys[i]
        key.addEventListener('click', changeExp)
    }
    Scientific.addEventListener('click', handleScientific)
}

function changeTheme() {
    Theme = (Theme + 1) % 3
    Toggle.style.transform = `translateX(${Theme*21}px)`
    for (i=0; i < ThemeObj.length; i++) {
        element = ThemeObj[i]
        found = false
        if (element.classList.contains('t1')) {
            element.classList.remove('t1')
            found = true
        }
        else if (element.classList.contains('t2')) {
            element.classList.remove('t2')
            found = true
        }
        else if (element.classList.contains('t3')) {
            element.classList.remove('t3')
            found = true
        }
        if (found) {
            element.classList.add(`t${Theme+1}`)
            element.style.transition = "none !important"
        }
    }
}

function changeExp(event) {
    target = event.target
    Expression = remove(Expression, ['=',','])
    if (!SpecialKeys.includes(target.innerText)) {
        if (Operators.includes(target.innerText)) {
            addToEval(Expression, target.innerText)
            Expression = ''
        }
        else if (Functions.includes(target.innerText)) {
            Expression = getValue(Expression, target.innerText).toString()
        }
        else {
            Expression = (Expression != 0 && !isAlpha(Expression) || Expression == 'e')? Expression+target.innerText: target.innerText
        }
    }
    else {
        if (target.innerText == 'DEL') {
            if (!Expression) {
                Expression = Evaluation
                Evaluation = ''
            }
            Expression = (isAlpha(Expression))? '' : Expression.slice(0,-1)
            MainEval = (isAlpha(Expression))? '' : Expression.slice(0,-1)
        }
        else if (target.innerText == 'RESET') {
            Expression = ''
            Evaluation = ''
            MainEval = ''
        }
        else if (target.innerText == '=') {
            Expression = evaluate(Evaluation+Expression).toString()
            Evaluation = ''
            lastAnswer = Expression
        }
        else if (target.innerText == 'RAD') {
            trigUnit = 'radians'
            target.innerText = 'DEG'
            Degree.innerText = 'RAD'
        }
        else if (target.innerText == 'DEG') {
            trigUnit = 'degrees'
            target.innerText = 'RAD'
            Degree.innerText = 'DEG'
        }
        else if (target.innerText == 'INV'){
            Invert = !Invert
            if (Invert) {
                for (i=0; i < Trigs.length; i++) {
                    Trigs[i].innerText = 'A'+Trigs[i].innerText
                }
            }
            else {
                for (i=0; i < Trigs.length; i++) {
                    Trigs[i].innerText = Trigs[i].innerText.slice(1,4)
                }
            }
        }
        else if (target.innerText == "ANS") {
            Expression = lastAnswer.toString()
        }
    }

    exp = remove(Expression, [',','='])
    if (isNum(exp)) {
        Expression = format(exp)
    }

    if (Expression.length >= 17) {Expression = parseFloat(remove(Expression,[','])).toExponential(3)}
    if (target.innerText == '=') {Expression = '='+Expression}
    EvalText.innerText = Evaluation
    ExpText.innerText = Expression
    if (["DEL", "RESET"].includes(target.innerText)) {ExpText.innerText = Expression? Expression : '0'}
}

function format(exp) {
    signs = ['+', '-', 'x', '/']
    for (sign of signs) {
        exp = exp.split(sign).join(` ${sign} `)
    }
    exp = exp.split(' ')

    for (i=0; i < exp.length; i++) {
        num = exp[i]
        if (!signs.includes(num)) {
            n = []
            a = [...num].reverse()
            count = 0
            found = a.includes('.')
            for (j=0; j < a.length; j++) {
                n.push(a[j])
                if (found===false) {count++}
                if (a[j] == '.') {
                    found = false
                    count = 0
                }
                if (count==3 && j!=a.length-1) {
                    n.push(',')
                    count = 0
                }
            }
            exp[i] = n.reverse().join('')

        }
    }
    return exp.join('')
}

function addToEval(expr, operator) {
    if (!Evaluation) {
        Evaluation = remove(expr, ['=']) + operator
        lastOperator = operator
    }
    else {
        Evaluation = evaluate(Evaluation+expr).toString()
        sign = Evaluation[Evaluation.length-1]
        if (Operators.includes(sign)) {
            lastOperator = getSign(sign, operator)
            if (['+', '-'].includes(sign) || sign == operator) {
                Evaluation = Evaluation.slice(0,-1)
                Evaluation += lastOperator
            }
            else {
                Evaluation += operator
            } 
        }
        else {
            Evaluation += operator   
            lastOperator = operator
        }
    }
}

function evaluate(expr) {
    if (lastOperator) {
        expr = expr.split(lastOperator).join(' '+lastOperator+' ').split(' ')
    }
    else {
        expr = [expr]
    }

    console.log(expr, lastOperator)

    operator = ''
    n2 = ''
    if (expr.length > 1) {
        n1 = expr[0]; operator = expr[1]; n2 = expr[2];
        n1 = remove(n1, [',','='])
        n2 = remove(n2, [',','='])
    }
    else {
        n1 = expr[0]
    }

    if (!n1) {n1 = '0'}

    answer = 0
    switch (operator) {
        case '+':
            answer =  !n2? n1+operator : parseFloat(n1) + parseFloat(n2) 
            break
        case '-':
            answer =  !n2? n1+operator : parseFloat(n1) - parseFloat(n2) 
            break
        case 'x':
            answer =  !n2? n1+operator : parseFloat(n1) * parseFloat(n2)
            break
        case '/':
            answer =  !n2? n1+operator : parseFloat(n1) / parseFloat(n2)
            break
        case '%':
            answer = parseFloat(n1) % parseFloat(n2)
            break
        case '^':
            answer = parseFloat(n1) ** parseFloat(n2)
            break
        case 'x'+"\u221A":
            answer = parseFloat(n2) ** (1/parseFloat(n1))
            break
        default:
            if (n1 == 'e') {
                answer = Math.E
            }
            else {
                answer = parseFloat(n1)
            }
    }
    return n2? parseFloat(answer.toFixed(3)) : answer
}

function remove(parent, chars) {
    return [...parent].filter(char=>!chars.includes(char)).join('')
}

function isAlpha(str) {
    pattern = /^[a-zA-Z]+$/
    return str.match(pattern)
}

function isNum(str) {
    pattern = /^[0-9]+$/
    return str.match(pattern)
}

function handleScientific(event) {
    if (CalcType == 'standard') {
        openScientific()
    }
    else {
        closeScientific()
    }
}

function openScientific() {
    CalcType = "scientific"
    Scientific.style.width = "70%"
    for (i=0; i < ScienKeys.length; i++) {
        key = ScienKeys[i]
        key.style.display = "block"
    }
    Scientific.classList.remove('scientific-closed')
}

function closeScientific() {
    CalcType = "standard"
    Scientific.style.width = "0"
    for (i=0; i < ScienKeys.length; i++) {
        key = ScienKeys[i]
        key.style.display = "none"
    }
    Scientific.classList.add('scientific-closed')
}

function getSign(s1, s2) {
    if (s1 == '-' && s2 == '-') {
        return '+'
    }
    if (s1 == '+' && s2 == '+') {
        return '+'
    }
    if (s1 == '-' && s2 == '+') {
        return '-'
    }
    if (s1 == '+' && s2 == '-') {
        return '-'
    }
    else {
        return s1
    }
}

function getValue(arg, func) {
    arg = parseFloat(arg)
    switch (func) {
        case '!':
            if (isNum(arg.toString())) {
                fact = 1
                for (i=1; i < arg+1; i++) {
                    fact *= i
                }
                answer =  fact
            }
            else {
                answer = NaN
            }
            break
        case 'SIN':
            if (trigUnit == 'degrees') {
                answer =  Math.sin(arg * (Math.PI / 180))
            }
            else {
                answer = Math.sin(arg)
            }
            break
        case 'COS':
            if (trigUnit == 'degrees') {
                answer = Math.cos(arg * (Math.PI / 180))
            }
            else {
                answer = Math.cos(arg).toFixed(3)
            }
            break
        case 'TAN':
            if (trigUnit == 'degrees') {
                answer = Math.tan(arg * (Math.PI / 180))
            }
            else {
                answer = Math.tan(arg)
            }
            break
        case 'ASIN':
            if (trigUnit == 'degrees') {
                answer =  Math.asin(arg) * (180 / Math.PI)
            }
            else {
                answer = Math.asin(arg)
            }
            break
        case 'ACOS':
            if (trigUnit == 'degrees') {
                answer = Math.acos(arg) * (180 / Math.PI)
            }
            else {
                answer = Math.acos(arg)
            }
            break
        case 'ATAN':
            if (trigUnit == 'degrees') {
                answer = Math.atan(arg) * (180 / Math.PI)
            }
            else {
                answer = Math.atan(arg)
            }
            break
        case 'LOG':
            answer = Math.log10(arg)
            break
        case 'ln':
            answer =  Math.log(arg)
            break
        case "\u221A":
            answer = arg ** 0.5
            break
        case "\u03C0":
            answer = Math.PI
            break
        default:
            answer = NaN
    }
    return parseFloat(answer.toFixed(3))
}