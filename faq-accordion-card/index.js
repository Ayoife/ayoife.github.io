const dropDowns = document.getElementsByTagName('details')

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main)
}
else {
    main()
}

function main() {
    for (i=0; i < dropDowns.length; i++) {
        dropDown = dropDowns[i]
        dropDown.addEventListener('toggle', togFunc)
    }
}

function togFunc(event) {
    detailsEle = event.target
    if (detailsEle.hasAttribute('open')) {
        for (i=0; i < dropDowns.length; i++) {
            dropDown = dropDowns[i]
            if (dropDown != detailsEle) {
                dropDown.removeAttribute('open')
            }
        }
    }
}