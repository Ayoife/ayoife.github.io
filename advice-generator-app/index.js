const Button = document.getElementsByClassName('adv-button')[0]
const AdvContainer = document.getElementsByClassName('container')[0]
const ContainerBack = document.querySelector('.container.back')

let animations = ["flip-vertical", "flip-horizontal", "zoom", "fade"]

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}

function main() {
    Button.addEventListener('click', change_advice)
}

async function change_advice() {
    try {
        const response = await fetch("https://api.adviceslip.com/advice")
        let data = await response.json()
        console.log(data)
        animation = animations[Math.floor(Math.random() * animations.length)]
        playAnimation(animation, data)
    }
    catch {
        alert("Connect to the Internet and Try Again!")
    }
    
}

function playAnimation(name, data) {
    id = data['slip']['id']; advice = data['slip']['advice']; 

    if (name == 'zoom'){
        AdvContainer.style.transform = "scale(0)"
        setTimeout(()=>{
            AdvContainer.querySelector('.advice-id').innerText = `ADVICE #${id}`
            AdvContainer.querySelector('.advice').innerText = advice
            AdvContainer.style.transform = "scale(1)"}, 800)
    }
    else if (name == 'fade'){
        AdvContainer.style.opacity = "0"
        setTimeout(()=>{
            AdvContainer.querySelector('.advice-id').innerText = `ADVICE #${id}`
            AdvContainer.querySelector('.advice').innerText = advice
            AdvContainer.style.opacity = "1"}, 800)
    }
    else if (name == 'flip-vertical'){
        AdvContainer.style.transform = "rotateX(180deg)"
        setTimeout(()=>{
            ContainerBack.querySelector('.adv-back').innerText = `~ADVICE #${id}~`
            ContainerBack.style.display = "flex"
            setTimeout(()=>{
                ContainerBack.style.transform = "rotateX(-180deg)"
                AdvContainer.querySelector('.advice-id').innerText = `ADVICE #${id}`
                AdvContainer.querySelector('.advice').innerText = advice
                AdvContainer.style.transform = "rotateX(0deg)"
            }, 400)
        }, 400)
        ContainerBack.style.transform = "rotateX(0deg)"
    }
    else if (name == 'flip-horizontal'){
        AdvContainer.style.transform = "rotateY(180deg)"
        setTimeout(()=>{
            ContainerBack.querySelector('.adv-back').innerText = `~ADVICE #${id}~`
            ContainerBack.style.display = "flex"
            setTimeout(()=>{
                ContainerBack.style.transform = "rotateY(-180deg)"
                AdvContainer.querySelector('.advice-id').innerText = `ADVICE #${id}`
                AdvContainer.querySelector('.advice').innerText = advice
                AdvContainer.style.transform = "rotateY(0deg)"
            }, 400)
        }, 400)
        ContainerBack.style.transform = "rotateY(0deg)"
    }
}

