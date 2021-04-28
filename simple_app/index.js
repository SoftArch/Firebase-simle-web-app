function logout(){
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        alert(error);
    })
}

function addRoomFromTemplate(roomId,title,message_count,admin){
    
    var container = document.getElementById("room_list_container");

    var template = document.querySelector('#room_template');
    var clone = template.content.cloneNode(true);

    var title_element = clone.querySelectorAll("h3");
    title_element[0].innerText = title;

    var title_element = clone.querySelectorAll("p");
    title_element[0].innerText = admin;
    title_element[1].innerText = message_count;

    var title_element = clone.querySelectorAll("div");
    title_element[0].setAttribute("room-id", roomId);

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

    container.scrollTop = container.scrollHeight;
}

var room_data = [];

$(document).ready(function() {

    // Odaların alınması
    firestore.collection("rooms").orderBy("create_date", "desc").onSnapshot((querySnapshot) => {

        var container = document.getElementById("room_list_container");
        container.innerHTML = "";
        room_data = [];

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);

            var childKey = doc.id;
            var childData = doc.data();
            room_data.push({Id:childKey, data:childData});

            addRoomFromTemplate(childKey,childData.name,childData.chats.length,childData.creator_mail);

        });
        refreshRoomMessage();
    });

});

function getRoomMessage(room_element) {

    var roomId = room_element.getAttribute("room-id");
    var title = document.getElementById("chat_title");

    getRoomMessageWithRoomId(roomId,title);
}

function getRoomMessageWithRoomId(roomId,title)
{
    if(roomId)
    {
        var container = document.getElementById("chat_container");
        container.innerHTML = "";
    
        var room_detail = room_data.filter(function (room) { return room.Id == roomId })[0];
    
        if(title){
            title.innerText=room_detail.data.name;
            title.setAttribute("room-id",room_detail.Id);
        }
    
        Object.values(room_detail.data.chats).forEach(function(childData) {                
            addMessageFromTemplate(childData.usermail,childData.messagetext,"");      
        });


    }
}

function refreshRoomMessage()
{
    var title = document.getElementById("chat_title");
    var roomId = title.getAttribute("room-id");

    if(roomId)
    {
        getRoomMessageWithRoomId(roomId,null);
    }
}

function addRoom(){
    var newRoomName = document.getElementById('roomName');

    firestore.collection("rooms").add({
        creator: auth.currentUser.uid,
        creator_mail: auth.currentUser.email,
        name: newRoomName.value,
        create_date: firebase.firestore.Timestamp.now(),
        chats:[]
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    newRoomName.value = "";
}

function addMessage(){
    var message = document.getElementById('userMessage');
    var roomId = document.getElementById("chat_title").getAttribute("room-id");

    if(roomId)
    {
        var room = firestore.collection("rooms").doc(roomId);
        room.update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                userid:firebase.auth().currentUser.uid,
                usermail:firebase.auth().currentUser.email,
                messagetext:message.value,
                create_date: firebase.firestore.Timestamp.now(),
            })
        });

        message.value = "";
    }
    else
    {
        alert("Oda seçmelisiniz");
    }
}