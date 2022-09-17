const ProductImg = document.querySelector('.image > .product-img')
const Previous = document.querySelector('.image > .prev')
const Next = document.querySelector('.image > .next')
const Thumbnails = document.querySelector('.image > .thumbnails')
const CartBox = document.querySelector('.cart-box')
const decButton = document.querySelector('.minus')
const incButton = document.querySelector('.plus')
const NoItems = document.querySelector('.number-items > p')
const AddToCart = document.querySelector('.button')
const CartIcon = document.querySelector('.cart')
const CartItems = window.getComputedStyle(document.querySelector('.cart-div'), '::after')
const Menu = document.querySelector('.menu')
const Navigation = document.querySelector('.mobile-nav')

const LightBox = document.querySelector('.lightbox')
const Gallery = document.querySelector('.gallery')
const CloseIcon = Gallery.querySelector('.close')
const GallImg = Gallery.querySelector('.product-img')
const GallPrev = Gallery.querySelector('.prev')
const GallNext = Gallery.querySelector('.next')
const GallThumbs = Gallery.querySelector('.thumbnails')

const styleElem = document.head.appendChild(document.createElement('style'))
const MQL = window.matchMedia("(min-width: 600px)")

var ORANGE = "hsl(26, 100%, 55%)"

var Items = ["images/image-product-1.jpg", "images/image-product-2.jpg", 
"images/image-product-3.jpg", "images/image-product-4.jpg"]
var ThumbImgs = ["images/image-product-1-thumbnail.jpg", "images/image-product-2-thumbnail.jpg", 
"images/image-product-3-thumbnail.jpg", "images/image-product-4-thumbnail.jpg", ]
var NoOfItems = 0;
var CICount = 0;
var currentItem = Items[0]
var GallCurrent = Items[0]
var Cart = []
var CartIsOpen = false

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}

function main() {
    decButton.addEventListener('click', decrease_items)
    incButton.addEventListener('click', increase_items)
    for (i=0; i < Thumbnails.children.length; i++) {
        t1 = Thumbnails.children[i]
        t2 = GallThumbs.children[i]
        t1.addEventListener('click', changeMain)
        t2.addEventListener('click', change_gall)
    }
    select_item(currentItem)
    Previous.addEventListener('click', ()=>select_item(currentItem, 'pre'))
    Next.addEventListener('click', ()=>select_item(currentItem, 'nxt'))
    AddToCart.addEventListener('click', add_to_cart)
    CartIcon.addEventListener('click', show_cart)
    ProductImg.addEventListener('click', open_gallery)
    Menu.addEventListener('click', open_nav)
    MQL.addEventListener('change', updateCart)
}

function decrease_items() {
    if (CICount > 0) {
        CICount -= 1
    }
    NoItems.innerText = CICount
}

function increase_items() {
    CICount += 1
    NoItems.innerText = CICount
}

function select_item(item, func) {
    index = Items.indexOf(item)
    if (func == 'pre') {
        index -= index > 0? 1 : 0
    }
    else if (func == 'nxt') {
        index += index != Items.length-1? 1 : 0
    }

    thumbnail = Thumbnails.children[index]
    for (i=0; i < Thumbnails.children.length; i++) {
        Thumbnails.children[i].style.filter = "none"
        Thumbnails.children[i].style.border = '0'
    }
    thumbnail.style.filter = "opacity(30%)"
    thumbnail.style.border = `2px solid ${ORANGE}`
    ProductImg.style.opacity = "0"
    currentItem = Items[index]
    setTimeout(()=>{ProductImg.style.content = `url('${currentItem}')`},500)
    setTimeout(()=>{ProductImg.style.opacity = "1"},500)
}

function add_to_cart() {
    if (CICount != 0) {
        NoOfItems += CICount
        found = false
        for (i=0; i < Cart.length; i++) {
            console.log(Cart[i])
            if (Cart[i][0] == currentItem) {
                found = true
                Cart[i] = [currentItem, Cart[i][1] + CICount]
                break
            }
        }
        if (!found) {Cart.push([currentItem, CICount])}
    }
    CICount = 0
    NoItems.innerText = CICount
    updateCart()
}

function changeMain(event) {
    target = event.target
    select_item(Items[getIndex(Thumbnails.children, target)])
}

function change_gall(event) {
    target = event.target
    gallery_select(Items[getIndex(GallThumbs.children, target)])
}

function getIndex(searchlist, element) {
    for (i=0; i<searchlist.length; i++) {
        if (element instanceof Array) {
            if (JSON.stringify(searchlist[i]) == JSON.stringify(element)) {
                return i
            }
        }
        else if (searchlist[i] == element) {
            return i
        }
    }
}

function show_cart() {
    CartIsOpen = !CartIsOpen
    if (CartIsOpen) {
        CartIcon.style.filter = "brightness(0%)"
        CartBox.style.display = "flex"
    }
    else {
        CartBox.style.display = "none"
        CartIcon.style.filter = "brightness(100%)"
    }
}

function updateCart() {
    if (Cart.length == 0) {
        CartBox.querySelector('.items').innerHTML = `<p class="empty-cart">Your cart is empty.</p>`
    }
    else {
        CartBox.querySelector('.items').innerHTML = ``
        for (i=0; i < Cart.length; i++) {
            item = Cart[i][0]; count = Cart[i][1];
            thumbimg = ThumbImgs[Items.indexOf(item)]
            CartBox.querySelector('.items').innerHTML +=  `
            <div class="item">
            <img class="thumbnail" src=${thumbimg} />
            <p>${MQL.matches? 'Fall' : "Autumn"} Limited Edition Sneakers<br/>$125.00 x ${count} <strong>$${(125*count)}.00</strong></p>
            <img class="delete" src="images/icon-delete.svg">
            </div>`
        }
        CartBox.querySelector('.items').innerHTML += `<button id="checkout">Checkout</button>`
        for (del of document.getElementsByClassName('delete')) {
            del.addEventListener('click', remove_item)
        }
        document.getElementById('checkout').addEventListener('click', check_out)
    }

    if (NoOfItems > 0) {
        styleElem.innerHTML = `.cart-div::after {content: '${NoOfItems}'; display: block}`
    }
    else {
        styleElem.innerHTML = `.cart-div::after {display: none}`
    }
}

function remove_item(event) {
    target = event.target
    thumbnail = Items[ThumbImgs.indexOf(target.parentElement.firstElementChild.getAttribute('src'))]
    count = target.parentElement.getElementsByTagName('p')[0].getElementsByTagName('strong')[0].innerText.slice(1)
    count = parseInt(count) / 125
    Cart.splice(getIndex(Cart, [thumbnail, count]), 1)
    NoOfItems -= count
    updateCart()
}

function check_out() {
    alert("Thanks for your patronage!..Make sure to check back later!!")
    window.location.reload()
}

function open_gallery() {
    gallery_select(Items[0])

    GallPrev.addEventListener('click', ()=>gallery_select(GallCurrent, 'pre'))
    GallNext.addEventListener('click', ()=>gallery_select(GallCurrent, 'nxt'))

    if (MQL.matches) {
        LightBox.style.transform = "scale(0)"
        LightBox.style.display = "block"
        Gallery.style.display = "block"
        setTimeout(()=>{
            LightBox.style.transform = "scale(1)"
            Gallery.style.transform = "scale(1)"}, 500)
        CloseIcon.addEventListener("click", ()=>{
            LightBox.style.transform = "scale(0)"
            Gallery.style.transform = "scale(0)"
            LightBox.style.display = "none"
            Gallery.style.display = "none"
        })
    }
}

function gallery_select(item, func) {
    index = Items.indexOf(item)
    if (func == 'pre') {
        index -= index > 0? 1 : 0
    }
    else if (func == 'nxt') {
        index += index != Items.length-1? 1 : 0
    }

    // Reset all thumbnails
    for (i=0; i < GallThumbs.children.length; i++) {
        GallThumbs.children[i].style.filter = "none"
        GallThumbs.children[i].style.border = '0'
    }

    // Select current thumbnail
    thumbnail = GallThumbs.children[index]
    thumbnail.style.filter = "opacity(0.4) drop-shadow(0 0 0 white) brightness(120%)"
    thumbnail.style.border = `2px solid ${ORANGE}`
    GallCurrent = Items[index]
    GallImg.style.opacity = "0"
    setTimeout(()=>{GallImg.style.content = `url('${GallCurrent}')`},500)
    setTimeout(()=>{GallImg.style.opacity = "1"},500)
}

function open_nav() {
    LightBox.style.display = "block"
    Navigation.style.width = "50%"
    document.querySelector('.nav-close').addEventListener('click', close_nav)
}

function close_nav() {
    LightBox.style.display = "none"
    Navigation.style.width = "0%"
}