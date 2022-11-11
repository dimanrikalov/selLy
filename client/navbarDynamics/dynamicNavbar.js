const navbar = document.querySelector('header');

let prevScrollPos = window.scrollY;

window.onscroll = function () {
    let currentScrollPos = window.scrollY;
    if(prevScrollPos > currentScrollPos) {
        navbar.style.top = "0px";
    } else {
        navbar.style.top = "-100px";
    }
    prevScrollPos = currentScrollPos;
}