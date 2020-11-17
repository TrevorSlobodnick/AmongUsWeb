'use strict'

let query = new URLSearchParams(window.location.search);
let chatBox = document.getElementById("chat");
let sendBtn = document.getElementById("submitBtn");
let name = query.get("name");
let color = query.get("color");
let msg = document.getElementById("msg");
let firstTime = true;
let bottomOfPage = 0;
const availableColors = new Set([
    "red", "blue", "brown", "green", "orange", "pink", "purple", "black", "white", "cyan", "lime", "yellow"
]);

let recentId = 0;
let newMessages = 0;

if (!name || name === ' ') {
    name = "Guest";  
}
if (!availableColors.has(color)) {
    alert("Invalid Color, Select one of the available colors and try again");
    window.location.replace("https://tslobodnick.ca/AmongUsWeb/Chat/");
}

sendBtn.addEventListener("click", formCheck);

function formCheck(e){
    e.preventDefault();
    // ensure message has text
    if(msg.value.trim() != ""){
        $.ajax({
            type: 'POST',
            url: '../handle_message.php',
            data: {
                name: name,
                color: color,
                msg: $( "#msg" ).val(),
            },
            datatype: 'JSON',
            success: function(bool){
                //bool will be "success" or "failure"
                if (bool == "failure") {
                    alert("Failure Inside Success");
                }
                else{
                    msg.value = "";
                }
            },
            error: function(){
                alert("Failure was returned, could not send message");
            },
        });
    }
}

function refreshPage(){
    $.ajax({
        type: 'POST',
        url: '../get_messages.php',
        data: {
            limit: newMessages
        },
        datatype: 'JSON',
        success: function(messages){
            let parsedMessages = JSON.parse(messages);
            parsedMessages.forEach(element => {
                chatBox.insertAdjacentHTML("beforeend", `<div class="postWrapper"><div class="imgWrapper"><img src="../Images/${element.color}.png" alt="Character"></div><div class="contentWrapper"><p class="name">${element.name}</p><p class="textMessage">${element.msg}</p></div></div>`);
            });
            if(firstTime){
                bottomOfPage = chatBox.scrollHeight - chatBox.clientHeight;
                chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
                firstTime = false;
            }
            else if(bottomOfPage == chatBox.scrollTop){
                bottomOfPage = chatBox.scrollHeight - chatBox.clientHeight;
                chatBox.scrollTop = bottomOfPage;
            }
        },
        error: function(){
            alert("Failure -- Could Not Send Message");
        },
    });
}

function getMostRecentId(){
    $.ajax({
        type: 'POST',
        url: '../get_latest.php',
        datatype: 'JSON',
        success: function(id){
            let idAsNum = parseInt(id);
            if ((idAsNum - recentId) > 99){
                newMessages = 99;
            }
            else{
                newMessages = id - recentId;
            }
            recentId = id;
            if (newMessages > 0){
                refreshPage();
            }
        },
        error: function(){
            //
        },
    });
}

getMostRecentId();
setInterval(getMostRecentId, 1000);