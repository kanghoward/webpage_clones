const MODAL = document.querySelector(".modal")
const LOGIN = document.querySelector(".btn-login")
const CLOSE = document.querySelector(".close")

LOGIN.addEventListener('click', () => {
    MODAL.classList.toggle("hidden")
})

CLOSE.addEventListener('click', () => {
    MODAL.classList.toggle("hidden")
})