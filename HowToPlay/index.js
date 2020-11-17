'use strict'

let navBtn = document.getElementById("mapNav");
navBtn.addEventListener("click", displayDropDown);

function displayDropDown(e){
    e.target.classList.toggle("lowbrightness");
    let navOptions = document.getElementById("navUl");
    if (navOptions.style.height == 0){
        navOptions.style.height = "45vh";
    }
    else if (navOptions.style.height == "0px"){
        navOptions.style.height = "45vh";
    }
    else{
        navOptions.style.height = "0px";
    }
}