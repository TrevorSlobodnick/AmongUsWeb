'use strict'

let characterCollection = document.getElementsByClassName("colorWrapper");
let characterArr = [].slice.call(characterCollection);
let oldTarget = "";
characterArr.forEach(element => {
    element.addEventListener("click", selectCharacter);
});

function selectCharacter(e){
    if (oldTarget != ""){
        oldTarget.classList.remove("selected")
    }
    e.currentTarget.classList.add("selected");
    oldTarget = e.currentTarget;
}