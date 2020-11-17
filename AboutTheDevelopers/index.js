'use strict'

let correctVoteText = "Nice guessing skills! The 3 members of inner sloth are forest, marcus, and amy.";
let wrongVoteText = "Phew, i make a good impostor. The 3 members of inner sloth are forest, marcus, and amy.";
let voteCollection = document.getElementsByClassName("vote");
let btnCollection = document.getElementsByClassName("btn");
let btnArr = [].slice.call(btnCollection);
btnArr.forEach(element => {
    element.addEventListener("click", displayImpostor);
});

function displayImpostor(e){
    // remove the vote buttons
    btnArr.forEach(element => {
        element.remove();
    });
    displayVote();
    if (e.target === btnArr[2]){
        document.getElementById("transform").innerText = correctVoteText;
    }
    else{
        document.getElementById("transform").innerText = wrongVoteText;
    }
}

// add paragraphs where the buttons were removed
function displayVote(){
    let impostor = document.createElement("p");
    let actualDev1 = document.createElement("p");
    let actualDev2 = document.createElement("p");
    let actualDev3 = document.createElement("p");
    // fill impostor with text 'Impostor' and check marks for actualDevs
    let impText = document.createTextNode("Impostor");
    let actText1 = document.createTextNode("\u2714");
    let actText2 = document.createTextNode("\u2714");
    let actText3 = document.createTextNode("\u2714");

    impostor.appendChild(impText);
    actualDev1.appendChild(actText1);
    actualDev2.appendChild(actText2);
    actualDev3.appendChild(actText3);

    //setting text color
    actualDev1.style.color = "green";
    actualDev2.style.color = "green";
    actualDev3.style.color = "green";
    impostor.style.color = "red";

    //adding elements to dom
    voteCollection[0].appendChild(actualDev1);
    voteCollection[1].appendChild(actualDev2);
    voteCollection[2].appendChild(impostor);
    voteCollection[3].appendChild(actualDev3);
}