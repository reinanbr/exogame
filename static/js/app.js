/*
Author: Reynan Br
Date init: Aug 15 23:12 2022
Project: WebGame ExoGame (TCC Project)
LICENSE: MIT
email: slimchatuba@gmail.com
*/


$(Window).ready(()=>{

//initializing the server 
var socket = io();

width = 10

//function for create the card question
function createCardQuestion(title,body,imageUrl,options,i){
    return ` <div class="card" id='${title}' style="margin-left:${width}px;margin-top:0px;margin-bottom:0px;margin-right:0px;">
    <img class="card-img-top" src=${imageUrl} alt="Card image">
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <p class="card-text"><b>${body}</b></p>
      <hr>
      <p><input type='radio' name='question_${title}' value='A'>${options.A} </p>
      <p><input type='radio' name='question_${title}' value='B'>${options.B} </p>
      <p><input type='radio' name='question_${title}' value='C'>${options.C} </p>
      <p><input type='radio' name='question_${title}' value='D'>${options.D} </p>
      <hr>
      <button onclick='sendRes("${title}")' class='btRes'>responder</button>
    </div>
  </div>`
}

//sendRes function
function sendRes(title){
  console.log(title)
  optMarked = $(`[name="question_${title}"]:checked`).val()
  resSend = {'res':optMarked,'title':title}
  socket.emit('validateResponseQuestion',resSend)
}



  socket.on('correctionResponse',(resServer)=>{
    console.log('bem, eu toh sendo trabalhado')
    console.log(resServer)
    if(resServer){
      alert('Parabens! Você acertou!')
    }
    else{
      alert('Ops! Você errou!!')
    }
  })


//function for work with the questions data
//adding the questions in the div with id 'app'
function dataWorkQuestions(question,n){
    titleQuestion = question.title;
    bodyQuestion = question.body;
    imageUrlQuestion = question.imgUrl;
    optionsQuestion = question.options

    console.log(question)

    $('#app').append(createCardQuestion(titleQuestion,bodyQuestion,imageUrlQuestion,optionsQuestion,n))
    width = width +230

}


// initializing the login user
function screenLogin(){
  $('#app').append(`<div class='center'><div class='login'>
  <h2>crie seu nick</h2>
  <hr>
  <form>
  <p>escolha o teu avatar *:</p>
  <span id='avatarChoicePainel'></span>
  <b></b>
  <hr>
  <span> <input type='radio' id='avatarInput' name='avatar' value='avatar_1'><img class='avatar' src="/static/img/avatar/avatar_1.png">  <input  id='avatarInput' type='radio' name='avatar' value='avatar_2'><img class='avatar' src="/static/img/avatar/avatar_2.png"> <input  id='avatarInput' type='radio' name='avatar' value='avatar_3'><img class='avatar' src="/static/img/avatar/avatar_3.png"> </span>
  <br>
  <span> <input type='radio' id='avatarInput' name='avatar' value='avatar_4'><img class='avatar' src="/static/img/avatar/avatar_4.png">  <input  id='avatarInput' type='radio' name='avatar' value='avatar_5'><img class='avatar' src="/static/img/avatar/avatar_5.png"> <input  id='avatarInput' type='radio' name='avatar' value='avatar_6'><img class='avatar' src="/static/img/avatar/avatar_6.png"> </span>
 <br>
  <span> <input type='radio' id='avatarInput' name='avatar' value='avatar_7'><img class='avatar' src="/static/img/avatar/avatar_7.png">  <input  id='avatarInput' type='radio' name='avatar' value='avatar_8'><img class='avatar' src="/static/img/avatar/avatar_8.png"> <input  id='avatarInput' type='radio' name='avatar' value='avatar_9'><img class='avatar' src="/static/img/avatar/avatar_9.png"> </span>
 <hr>
 <br>
 <span><p>insira o teu nick *:
 <input class='loginInput' id='nameNick' type='text' ng-model='name' placeholder='insira o seu belo nome <3'></p></span>
 <hr>
 <p>email *:</p>
 <input type='email' required id='emailUser' placeholder='insira o seu emaiuzinho, meu amr' class='loginInput'>
 <hr>
  <p>data de nascimento * </p>
  <input type='date'  value="2002-07-22"
  min="1950-01-01" max="2018-12-31">
  <br>
  <hr>
  <p>bio (opcional)</p>
  <input class='loginInput' id='bio' placeholder='fale sobre você...'>
  <hr>
  <br>
  <p>* -> campo obrigatório </p>
  <hr>
  <button type='submit' id='createAvatarBt' class='btNick'>criar nick</button>
  </form>
  </div>
  </div>`)
}


//Cancel to submit form!!!!
$(document.body).on('submit',"form",function (event) {
  
  event.preventDefault();
  console.log("aaya");
  var keyPressed = event.keyCode || event.which;
  if (keyPressed === 13) {
      alert("You pressed the Enter key!!");
  
      return false;
  }
});



$(document.body).on('click',"#createAvatarBt",function (e) {
  
  user = {}
  user.name = $('#nameNick').val()
  user.srcAvatar = $(`[name="avatar"]:checked`).val()
  user.email = $('#emailUser').val()
  user.bio = $('#bio').val()
  console.log(user)
})

function added(srcAvatar){
  $("#avatarChoicePainel").html(`<img class='avatar' src='/static/img/avatar/${srcAvatar}.png'>`)


}

$(document.body).on('click',"#avatarInput",function (e) {
  
  console.log('fui clicado')
  srcAvatar = $('[name="avatar"]:checked').val()
  console.log(srcAvatar)
  added(srcAvatar)
})


function createCredentialNick(userName,urlAvatar,old){
  console.log('test')
}


// starting the gamer
screenLogin()



//getting questions
//socket.emit('get_question')

socket.on('question',(questionsData)=>{
    console.log(questionsData)
    var questions = questionsData;
    console.log(questions)
    //questions.forEach(dataWorkQuestions);

    for(var i in questions){
        dataWorkQuestions(questions[i],i);
        console.log(questions[i])
    }

    
    console.log(questions);

});

// //verify if it are connected
// socket.on('connect', function() {
//     socket.emit('connected', {'username':username,'text': 'I\'m connected!'});
// $('#server_status').html(`<i title='Server Online' class="material-icons green">brightness_1</i>`)
// });

// //verify if the server was disconnected
// socket.on('disconnect',()=>{
//     $('#server_status').html(`<i title='Server Offline' class="material-icons red">brightness_1</i>`)
// });

// //verify if it was closed
// window.onbeforeunload = function () {
//     socket.emit('disconnected', {'username':username,'text':`I'm exit`});
// }





//init the song



function play() {

  var myAudio = new Audio()
  myAudio.id = 'myPlayer'
  myAudio.src ='https://rr1---sn-npqpo5g5cg-2o1e.googlevideo.com/videoplayback?expire=1662759671&ei=l14bY-25DI7mwASv6a2YCg&ip=2804%3A2108%3Afc89%3Ab256%3Acbb%3A4f07%3A4b%3A3aaf&id=o-ADHPOSQQRhoYNKez_pFZyzDafmY7ouIDmmWvmmMUSHjl&itag=140&source=youtube&requiressl=yes&mh=Te&mm=31%2C29&mn=sn-npqpo5g5cg-2o1e%2Csn-pmcg-4vge&ms=au%2Crdu&mv=m&mvi=1&pl=40&initcwndbps=763750&vprv=1&mime=audio%2Fmp4&ns=NeMV0UdJM7yGlzuwOwo1suoH&gir=yes&clen=95387652&dur=5893.944&lmt=1575570016968567&mt=1662737827&fvip=8&keepalive=yes&fexp=24001373%2C24007246&c=WEB&rbqsm=fr&txp=6311222&n=HFWXmkZ2tZc5xp6cwk&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAPCxctuOIgkoECxEI-RV6CR31vDvbKe9dqRr8cndMHVEAiBuhYnMh9Zh50v2ccJ66RvSMnuZS3OrK-_kP3Bbwytexw%3D%3D&sig=AOq0QJ8wRQIhAKFVCTFOsHeJiZnVzXb_ioJ8iaCdpWfM6hxrVQajz9cLAiBO_ZOi29dNwORK5hG6tQl60rl1DHPcYOJY71sTAaikGw=='
  myAudio.onplay = ()=>{
    console.log('estou sendo reproduzido..')
  }
  myAudio.onpause = ()=>{
      console.log('oh shit, fui parado!')
  }


  myAudio.play()
  console.log(myAudio)

  setInterval(()=>{
    time= myAudio.currentTime
    duration = myAudio.duration
    console.log(`tempo reproduzido:${time}/${duration}`)
  },1000)


}














})