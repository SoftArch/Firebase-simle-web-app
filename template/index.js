
function addRoom(){
    // Only add room to HTML
    addRoomFromTemplate("test oda 1","Ahmet Kabaoğlu");
}

function addMessage(){
    // Only add message to HTML
    addMessageFromTemplate("test@gmail.com","Selam millet!!","00:00");
}

function logout(){

}



function addRoomFromTemplate(title,admin){
    
    var container = document.getElementById("room_list_container");

    var template = document.querySelector('#room_template');
    var clone = template.content.cloneNode(true);

    var title_element = clone.querySelectorAll("a");
    title_element[0].innerText = title;

    var title_element = clone.querySelectorAll("span");
    title_element[1].innerText = admin;

    container.appendChild(clone);
}

function addMessageFromTemplate(user,message,time){
    
    var container = document.getElementById("chat_container");

    var template = document.querySelector('#message_template');
    var clone = template.content.cloneNode(true);

    var title_element = clone.querySelectorAll("div");
    title_element[1].innerText = user;
    title_element[2].innerText = message;
    title_element[3].innerText = time;

    container.appendChild(clone);
}

$(document).ready(function() {
    // App code
});