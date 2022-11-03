const Sections = document.getElementsByTagName("section")
const Numbers = document.getElementsByClassName("number")


var NumberValues = []

    
for (let sect of Sections) {
    sect.addEventListener("focus", ()=>{console.log(sect)})
}

for (let i of Numbers) {
    NumberValues.push(parseInt(i.innerText))
    i.innerText = '0'
}

let a = 0
let b = 0
let c = 0
let d = 0
func = setInterval(()=>{
    if (a != NumberValues[0]) {
        a += 1
    }
    if (b != NumberValues[1]) {
        b += 1
    }
    if (c != NumberValues[2]) {
        c += 1
    }
    if (d != NumberValues[3]) {
        d += 1
    }
    Numbers[0].innerText = a.toString()
    Numbers[1].innerText = b.toString()
    Numbers[2].innerText = c.toString()
    Numbers[3].innerText = d.toString()
    if ([a, b, c, d] == NumberValues) {
        clearInterval(func)
    }
}, 3)