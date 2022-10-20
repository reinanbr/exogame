/*
Author: Reynan Br
Date init: Aug 15 23:12 2022
Project: WebGame ExoGame (TCC Project)
LICENSE: MIT
email: slimchatuba@gmail.com
*/




////////////////////////////////* essa parte vai em pt-br msm, fodas *///////////////////////////////////
$(Window).ready(()=>{

//initializing the server 
var socket = io();
var width = 10

//////////////////////////////////////* LOADING PANEL */////////////////////////////////////////

function initPainel(){
  $('#app').html(`<div class='center'> <div class='login'>
  <br>
  <hr>
  <img class='logoInit rounded' src='/static/img/apple_ico.png'>
  <hr>
  <img class='loading circle' src='/static/img/loading.gif'>
  </div</div>`)
  setTimeout(() => {
    $('#app').fadeOut()
    screenLogin()
    $('#app').fadeIn()
  }, 6000);
}


////////////////////////////////////* AVATAR CREATE */////////////////////////////////////////


var htmlOld;
var user = {}
var seg = 0;

// initializing the login user
function added(srcAvatar){
  $("#avatarChoicePainel").html(`<img class='avatar' src='/static/img/avatar/${srcAvatar}.png'>`)
}

function screenLogin(){
  $('#app').html(`<div class='center'><div class='login'>
  <h2>crie seu nick</h2>
  <hr>
  <form>
  <p>escolha o teu avatar *:</p>
  <span id='avatarChoicePainel'></span>
  <b></b>
  <hr>
  <span> <input type='radio' required id='avatarInput' name='avatar' value='avatar_1'><img class='avatar' src="/static/img/avatar/avatar_1.png">  <input  id='avatarInput' type='radio' name='avatar' value='avatar_2'><img class='avatar' src="/static/img/avatar/avatar_2.png"> <input  id='avatarInput' type='radio' name='avatar' value='avatar_3'><img class='avatar' src="/static/img/avatar/avatar_3.png"> </span>
  <br>
  <span> <input type='radio' id='avatarInput' name='avatar' value='avatar_4'><img class='avatar' src="/static/img/avatar/avatar_4.png">  <input  id='avatarInput' type='radio' name='avatar' value='avatar_5'><img class='avatar' src="/static/img/avatar/avatar_5.png"> <input  id='avatarInput' type='radio' name='avatar' value='avatar_6'><img class='avatar' src="/static/img/avatar/avatar_6.png"> </span>
 <br>
  <span> <input type='radio' id='avatarInput' name='avatar' value='avatar_7'><img class='avatar' src="/static/img/avatar/avatar_7.png">  <input  id='avatarInput' type='radio' name='avatar' value='avatar_8'><img class='avatar' src="/static/img/avatar/avatar_8.png"> <input  id='avatarInput' type='radio' name='avatar' value='avatar_9'><img class='avatar' src="/static/img/avatar/avatar_9.png"> </span>
 <hr>
 <br>
 <span><p>insira o teu nick *:
 <input class='loginInput' required id='nameNick' type='text' ng-model='name' placeholder='insira o seu belo nome <3'></p></span>
 <hr>
 <p>email *:</p>
 <input type='email' required id='emailUser' placeholder='insira o seu emaiuzinho, meu amr' class='loginInput'>
 <hr>
  <p>data de nascimento * </p>
  <input type='date' id='old' required  value="2002-07-22"
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
  <br>
  <hr>
  </form>
  </div>
  </div>`)
}
//restart login
$(document.body).on('click','#restartLogin',(e)=>{
  $('#app').html(htmlOld)
})

//Cancel to submit form!!!!
$(document.body).on('submit',"form",function (event) {
  user.name = $('#nameNick').val()
  user.srcAvatar = $(`[name="avatar"]:checked`).val()
  user.email = $('#emailUser').val()
  user.bio = $('#bio').val()
  user.old = $('#old').val()
  htmlOld = $('#app').html()
  console.log(user)
  console.log(htmlOld)
  bioHtml = ''
  if(user.bio){
    bioHtml = `<p><b>Bio</b>: ${user.bio} </p>`
  }

  $('#app').html(`<div class='center'><div class='login'>
  <h3>Avatar Nick</h3>
<hr>
<img class='avatar' src='/static/img/avatar/${user.srcAvatar}.png'>
<br>
<div style='text-align:left'>
<p><b>Nome</b>: ${user.name} </p>
<p><b>Data de Nascimento</b>: ${user.old} </p>
<p><b>Email</b>: ${user.email} </p>

${bioHtml}
<hr>
<br>
<span><button  class='backLogin' id='restartLogin'>voltar para a criação do perfil</button> <button id='startGame' class='btNick'>iniciar o jogo</button></span>
</div>
  </div></div>`)
  event.preventDefault();
  var keyPressed = event.keyCode || event.which;
  if (keyPressed === 13) {
      alert("You pressed the Enter key!!");
  
      return false;
  }
});


$(document.body).on('click',"#startGame",function (event) {
  $("#app").html(`<div class='center'><div class='login'>
  <p style='text-align:left'>Se liga, <b>${user.name}</b>, você terá que responder exatamente <b>${questions.length} questões</b> sobre exoplanetas em um determinado tempo.<br>
  Vocẽ terá acesso a dicas que estarão disponível no cabeçalho da questão. <br> Você só poderá errar no <b>máximo 3 vezes</b>, caso contrário você irá perder.<br>
  No final será ti enviada uma imagem no email e estará disponível para download sobre as informaçoẽs do jogo que você fez.<br>
  <hr><i>Boa sorte - ReinanBr</i></p> <br> <button id='iniciarGame' class='btNick'>iniciar</button>
  </div></div>`)
})

// $(document.body).on('click',"#createAvatarBt",function (e) {
  
// })


$(document.body).on('click',"#iniciarGame",function (e) {
  console.log('oh, toh fufando aqui')
$('#avatarGamePainel').html(`<img
  src='/static/img/avatar/${user.srcAvatar}.png'
  class="rounded-circle z-depth-0"
  alt="avatar image"
  height="35"
/><br><span>${user.name}</span>
<span id='timeGame'></span>`)
currentTime()
$('#app').html('')
workQuestions()
})

function currentTime(){
  setInterval(() => {
    seg = seg + 1
    $("#timeGame").text(seg)
  }, 1000);
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



//////////////////////////////////* WORKING WITH QUESTIONS */////////////////////////////////////////////


////////* ADDING ON THE SCREEN *////////

var questions;

//getting questions
socket.emit('get_question')
socket.on('question',(questionsData)=>{
    console.log(questionsData)
    questions = questionsData;
    console.log(questions)
    //questions.forEach(dataWorkQuestions);
});

function workQuestions(){

  for(var i in questions){
    dataWorkQuestions(questions[i],i);
    console.log(questions[i])
}
console.log(questions);
}

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



////////* RESOLUTION OF QUESTIONS *////////

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














//verify if it are connected
socket.on('connect', function() {
    //socket.emit('connected', {'username':username,'text': 'I\'m connected!'});
    $('#socketStatus').html(`<p  class="footer_text" title='Server Online' >Online 🟢</p>`)
});


socket.on('usersCount',(n)=>{
  console.log(n)
  nConnect = n>1 ? `${n} conectados` : `${n} conectado`
  $('#socketStatus').html(`<p  class="footer_text" title='Server Online' >Online 🟢 (${nConnect})</p>`)

})

//verify if the server was disconnected
socket.on('disconnect',()=>{
    $('#socketStatus').html(`<p  class="footer_text" title='Server Offline'>Offline🔴</p>`)
});

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








var globalVar = {};

fetch('http://www.geoplugin.net/json.gp').then((dataIp)=>{
  return dataIp.json()
})
.then((res) => {
  data_ip = res
  userIpInfo = {}
  userIpInfo.city = res.geoplugin_city
  userIpInfo.state = res.geoplugin_regionCode
  userIpInfo.location = [res.geoplugin_latitude,res.geoplugin_longitude]
  userIpInfo.ping = res.geoplugin_delay
  userIpInfo.ip = res.geoplugin_request

 // socket.emit('userIpInfo',userIpInfo)
  globalVar.userIpInfo = userIpInfo


  console.log(data_ip)
})

//console.log(userIpInfo)
var user_;
socket.on('userInfo',(user)=>{
  user_ = user
})

window.onbeforeunload = function () {
  socket.emit('disconnected', user_);
}







/* //////////////////////////////////////////////////// */

////////////////////* WORKING SITE *//////////////////



// starting the gamer
initPainel()

})