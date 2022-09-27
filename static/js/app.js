/*
Author: Reynan Br
Date init: Aug 15 23:12 2022
Project: WebGame ExoGame (TCC Project)
LICENSE: MIT
email: slimchatuba@gmail.com
*/


//initializing the server 
var socket = io();

width = 10

//function for create the card question
function createCardQuestion(title,body,imageUrl,options){
    return ` <div class="card"  style="margin-left:${width}px;margin-top:0px;margin-bottom:0px;margin-right:0px;">
    <img class="card-img-top" src=${imageUrl} alt="Card image">
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <p class="card-text">${body}</p>
      <p><input type='radio' name='question_${title}' value='A'>${options.A} </p>
      <p><input type='radio' name='question_${title}' value='B'>${options.B} </p>
      <p><input type='radio' name='question_${title}' value='C'>${options.C} </p>
      <p><input type='radio' name='question_${title}' value='D'>${options.D} </p>
    </div>
  </div>`
}

//function for work with the questions data
//adding the questions in the div with id 'app'
function dataWorkQuestions(question){
    titleQuestion = question.title;
    bodyQuestion = question.body;
    imageUrlQuestion = question.img_url;
    optionsQuestion = question.options

    console.log(question)

    $('#app').append(createCardQuestion(titleQuestion,bodyQuestion,imageUrlQuestion,optionsQuestion))
    width = width +230

}

//getting questions
socket.emit('get_question')

socket.on('question',(questionsData)=>{
    console.log(questionsData)
    var questions = questionsData;
    console.log(questions)
    //questions.forEach(dataWorkQuestions);

    for(var i in questions){
        dataWorkQuestions(questions[i]);
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