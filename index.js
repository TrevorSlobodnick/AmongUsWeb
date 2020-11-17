'use strict'

let btnCollection = document.getElementsByClassName("btn");
let btnArr = [].slice.call(btnCollection);
btnArr.forEach(element => {
    element.addEventListener("mouseenter", toggleOnHover);
    element.addEventListener("mouseleave", toggleOnHover);
});

function toggleOnHover(e){
    if (e.target.classList.contains("whiteBg")){
        e.target.classList.toggle("whiteBg");
        e.target.children[0].className = "a";
    }
    else{
        e.target.classList.toggle("whiteBg");
        e.target.children[0].className = "blackText";
    }
}