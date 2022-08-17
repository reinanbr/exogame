/*
Author: Reynan Br
Date init: Aug 15 23:12 2022
Project: WebGame ExoGame
LICENSE: MIT
email: slimchatuba@gmail.com
*/


//initializing the server 
var socket = io();

//verify if it are connected
socket.on('connect', function() {
    socket.emit('connected', {'username':username,'text': 'I\'m connected!'});
$('#server_status').html(`<i title='Server Online' class="material-icons green">brightness_1</i>`)
});

//verify if the server was disconnected
socket.on('disconnect',()=>{
    $('#server_status').html(`<i title='Server Offline' class="material-icons red">brightness_1</i>`)
});

//verify if it was closed
window.onbeforeunload = function () {
    socket.emit('disconnected', {'username':username,'text':`I'm exit`});
}