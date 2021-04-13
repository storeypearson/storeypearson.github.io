const url = 'http://api.openweathermap.org/data/2.5/weather'; // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiKey = 'ee0e7055ed6d5a5af79611edc1ea0b4f';

let cities = ["London", "Dallas", "Shanghai", "Tokyo", "Paris", "Moscow", "Barcelona", "Dubai", "Madrid", "Bangladesh"]

const getWeather = async (cityName) => {
  const endpoint = url + '?q=' + cityName + '&appid=' + apiKey; // http://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=ee0e7055ed6d5a5af79611edc1ea0b4f

  try {
    const response = await fetch(endpoint, {cache: 'no-cache'});
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
        return jsonResponse;
    }
  } catch(error) {
    console.log(error);
  };
}

/* Every time the window is scrolled ... */
$(window).scroll( function(){

    /* Check the location of each desired element */
    $('#circle').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if( bottom_of_window > bottom_of_object ){

            $(this).animate({'opacity':'1'},500);

        }

    });

});


const numberSteps = $('.quiz__step').length - 1;
let disableButtons = false;
const tick = '<div class="answer__tick"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></div>';
let thanks = '<div class="thanks"><div class="thanks__tick">✔ </div><h1 class="thanks__title">Thank you!</h1></div>';

$('.answer__input').on('change', function(e) {

    if($(this).next().children('.answer__tick').length>0){
      return false
    }
  $(this).next().append(tick)
});


$('.navigation__btn--right').click(function(e){
let currentIndex = Number($('.quiz__step--current').attr('data-question'));
  if($('.quiz__step--current input:checked').length == 0){
     //console.log('input empty');
     return false;
 }
  //console.log({'currentIndex': currentIndex, 'numberSteps': numberSteps-1})
  if(currentIndex == numberSteps + 1 || disableButtons==true){
    //console.log('last')
    return false;
  }
  if(currentIndex + 1 == numberSteps + 1 ){
    $(this).addClass('navigation__btn--disabled');
      let n = 1 + Math.floor(Math.random() * 9) // returns a decimal between 0 and 1
       let weatherData = getWeather(cities[n]).then((resolve)=>{
           console.log (resolve.wind.deg)
           let node = '<div>'+resolve.weather[0].description+'</div>'
           $('#end').append(node)
       });

  }
  if(currentIndex == numberSteps){

  $('.summary__item').remove();
    $('.quiz__step:not(.quiz__summary)').each(function(index, item){
      console.log(item)
      let icon = $(item).children('.question__emoji').text()
      let answer = $(item).children('.answer').find('input:checked').val();
      let node = '<div class="summary__item"><div class="question__emoji">'+icon+'</div>'+answer+'</div>'
      $('#summary').append(node)
    })
  }
  const percentage = (currentIndex * 100)/ numberSteps;
  $('.progress__inner').width(percentage+ '%');
  console.log('input ok')
  const currentStep = $('.quiz__step--current');
  currentStep.removeClass('quiz__step--current');
  currentStep.one('transitionend', () => {
    currentStep.addClass('quiz__step--hidden');
  });
  $('.quiz__step--'+(currentIndex+1)).removeClass('quiz__step--hidden');
  $('.quiz__step--'+(currentIndex+1)).focus();
  $('.quiz__step--'+(currentIndex+1)).addClass('quiz__step--current');
  currentIndex = Number($('.quiz__step--current').attr('data-question'));
   if(currentIndex > 1 ){
    $('.navigation__btn--left').removeClass('navigation__btn--disabled');
  }
});


//REload Quiz
 $(".btn").click(function() {
     //  leftPress()
     // leftPress()
     // leftPress()
     // leftPress()
     // leftPress()
     // leftPress()
     currentIndex = Number($('.quiz__step--current').attr('data-question'));
      $('#end').empty()
    $(".container").load(".container > *");
     $( 'input[type="checkbox"]' ).prop('checked', false);
         $('.navigation__btn--right').addClass('navigation__btn');

     const currentStep = $('.quiz__step--current');
     currentStep.removeClass('quiz__step--current');
     currentStep.one('transitionend', () => {
       currentStep.addClass('quiz__step--hidden');

       let nextStep;

       if ($('.quiz__step--'+(currentIndex + 1)).length > 0) {
         nextStep = $('.quiz__step--'+(currentIndex));
       } else {
         nextStep = $('.quiz__step--1')
       }

       nextStep.removeClass('quiz__step--hidden');
       nextStep.focus();
       nextStep.addClass('quiz__step--current');

       currentIndex = Number($('.quiz__step--current').attr('data-question'));
     });
  });




function keypressEvent(e){
    let key = e.which || e.keyCode;

  if(key==65 || key==66){
    $('.quiz__step--current input[data-char="'+key+'"]').prop('checked', true).change();
    console.log($('.quiz__step--current input[data-char="'+key+'"]'))
    $('.quiz__step--current input[data-char="'+key+'"] + .answer__label').change();
  }
}

function leftPress(){
let currentIndex = Number($('.quiz__step--current').attr('data-question'));

  console.log({'currentIndex': currentIndex, 'numberSteps': numberSteps-1})
  if(currentIndex == 1 || disableButtons==true){
    console.log('first')
    $(this).addClass('navigation__btn--disabled');
    return false;
  }


  $('.navigation__btn--right').removeClass('navigation__btn--disabled')

  console.log('input ok')
  const currentStep = $('.quiz__step--current');
  currentStep.removeClass('quiz__step--current');
  currentStep.one('transitionend', () => {
    currentStep.addClass('quiz__step--hidden');

    const prevStep = $('.quiz__step--'+(currentIndex-1));
    prevStep.removeClass('quiz__step--hidden');
    prevStep.focus();
    prevStep.addClass('quiz__step--current');

    currentIndex = Number($('.quiz__step--current').attr('data-question'));
    // if(currentIndex == 1) {
    //   $(this).addClass('navigation__btn--disabled');
    // }
  });
    const percentage = ((currentIndex-1)  * 100)/ numberSteps+1;
  $('.progress__inner').width(percentage+ '%');
$('.quiz__step--current').keyup(keypressEvent);

}


$('.navigation__btn--left').click(function(e){
let currentIndex = Number($('.quiz__step--current').attr('data-question'));

  console.log({'currentIndex': currentIndex, 'numberSteps': numberSteps-1})
  if(currentIndex == 1 || disableButtons==true){
    console.log('first')
    $(this).addClass('navigation__btn--disabled');
    return false;
  }


  $('.navigation__btn--right').removeClass('navigation__btn--disabled')

  console.log('input ok')
  const currentStep = $('.quiz__step--current')
  currentStep.removeClass('quiz__step--current');
  currentStep.one('transitionend', () => {
    currentStep.addClass('quiz__step--hidden');

    $('.quiz__step--'+(currentIndex-1)).removeClass('quiz__step--hidden');
    $('.quiz__step--'+(currentIndex-1)).focus();
    $('.quiz__step--'+(currentIndex-1)).addClass('quiz__step--current');

    currentIndex = Number($('.quiz__step--current').attr('data-question'));
    if(currentIndex == 1 ){
      $(this).addClass('navigation__btn--disabled');
    }
    const percentage = ((currentIndex-1)  * 100)/ numberSteps+1;
    $('.progress__inner').height(percentage+ '%');
  });
$('.quiz__step--current').keyup(keypressEvent);
});



$('.submit').click(function(e){
  e.preventDefault();
  $('.quiz').remove();
  $(thanks).appendTo('.container');
  disableButtons=true;
  $('.navigation__btn').addClass('navigation__btn--disabled')
})

//// ammount to add on each button press
//const confettiCount = 20
//const sequinCount = 10
//
//// "physics" variables
//const gravityConfetti = 0.3
//const gravitySequins = 0.55
//const dragConfetti = 0.075
//const dragSequins = 0.02
//const terminalVelocity = 3
//
//// init other global elements
//const button = document.getElementById('confetti')
//var disabled = false
//const canvas = document.getElementById('canvas')
//const ctx = canvas.getContext('2d')
//canvas.width = window.innerWidth
//canvas.height = window.innerHeight
//let cx = ctx.canvas.width / 2
//let cy = ctx.canvas.height / 2
//
//// add Confetto/Sequin objects to arrays to draw them
//let confetti = []
//let sequins = []
//
//// colors, back side is darker for confetti flipping
//const colors = [
//  { front : '#00ff1f', back: '#00d119' }, // Green
//  { front : '#3ffbeb', back: '#3ae6d7' }, // Turquoise
//  { front : '#826aff', back: '#745fe3' }  // Purple
//]
//
//// helper function to pick a random number within a range
//randomRange = (min, max) => Math.random() * (max - min) + min
//
//// helper function to get initial velocities for confetti
//// this weighted spread helps the confetti look more realistic
//initConfettoVelocity = (xRange, yRange) => {
//  const x = randomRange(xRange[0], xRange[1])
//  const range = yRange[1] - yRange[0] + 1
//  let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range)
//  if (y >= yRange[1] - 1) {
//    // Occasional confetto goes higher than the max
//    y += (Math.random() < .25) ? randomRange(1, 3) : 0
//  }
//  return {x: x, y: -y}
//}
//
//// Confetto Class
//function Confetto() {
//  this.randomModifier = randomRange(0, 99)
//  this.color = colors[Math.floor(randomRange(0, colors.length))]
//  this.dimensions = {
//    x: randomRange(5, 9),
//    y: randomRange(8, 15),
//  }
//  this.position = {
//    x: randomRange(canvas.width/2 - button.offsetWidth/4, canvas.width/2 + button.offsetWidth/4),
//    y: randomRange(canvas.height/2 + button.offsetHeight/2 + 8, canvas.height/2 + (1.5 * button.offsetHeight) - 8),
//  }
//  this.rotation = randomRange(0, 2 * Math.PI)
//  this.scale = {
//    x: 1,
//    y: 1,
//  }
//  this.velocity = initConfettoVelocity([-9, 9], [6, 11])
//}
//Confetto.prototype.update = function() {
//  // apply forces to velocity
//  this.velocity.x -= this.velocity.x * dragConfetti
//  this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity)
//  this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
//
//  // set position
//  this.position.x += this.velocity.x
//  this.position.y += this.velocity.y
//
//  // spin confetto by scaling y and set the color, .09 just slows cosine frequency
//  this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09)
//}
//
//// Sequin Class
//function Sequin() {
//  this.color = colors[Math.floor(randomRange(0, colors.length))].back,
//  this.radius = randomRange(1, 2),
//  this.position = {
//    x: randomRange(canvas.width/2 - button.offsetWidth/3, canvas.width/2 + button.offsetWidth/3),
//    y: randomRange(canvas.height/2 + button.offsetHeight/2 + 8, canvas.height/2 + (1.5 * button.offsetHeight) - 8),
//  },
//  this.velocity = {
//    x: randomRange(-6, 6),
//    y: randomRange(-8, -12)
//  }
//}
//Sequin.prototype.update = function() {
//  // apply forces to velocity
//  this.velocity.x -= this.velocity.x * dragSequins
//  this.velocity.y = this.velocity.y + gravitySequins
//
//  // set position
//  this.position.x += this.velocity.x
//  this.position.y += this.velocity.y
//}
//
//// add elements to arrays to be drawn
//initBurst = () => {
//  for (let i = 0; i < confettiCount; i++) {
//    confetti.push(new Confetto())
//  }
//  for (let i = 0; i < sequinCount; i++) {
//    sequins.push(new Sequin())
//  }
//}
//
//// draws the elements on the canvas
//render = () => {
//  ctx.clearRect(0, 0, canvas.width, canvas.height)
//
//  confetti.forEach((confetto, index) => {
//    let width = (confetto.dimensions.x * confetto.scale.x)
//    let height = (confetto.dimensions.y * confetto.scale.y)
//
//    // move canvas to position and rotate
//    ctx.translate(confetto.position.x, confetto.position.y)
//    ctx.rotate(confetto.rotation)
//
//    // update confetto "physics" values
//    confetto.update()
//
//    // get front or back fill color
//    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back
//
//    // draw confetto
//    ctx.fillRect(-width / 2, -height / 2, width, height)
//
//    // reset transform matrix
//    ctx.setTransform(1, 0, 0, 1, 0, 0)
//
//    // clear rectangle where button cuts off
//    if (confetto.velocity.y < 0) {
//      ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight)
//    }
//  })
//
//  sequins.forEach((sequin, index) => {
//    // move canvas to position
//    ctx.translate(sequin.position.x, sequin.position.y)
//
//    // update sequin "physics" values
//    sequin.update()
//
//    // set the color
//    ctx.fillStyle = sequin.color
//
//    // draw sequin
//    ctx.beginPath()
//    ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI)
//    ctx.fill()
//
//    // reset transform matrix
//    ctx.setTransform(1, 0, 0, 1, 0, 0)
//
//    // clear rectangle where button cuts off
//    if (sequin.velocity.y < 0) {
//      ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight)
//    }
//  })
//
//  // remove confetti and sequins that fall off the screen
//  // must be done in seperate loops to avoid noticeable flickering
//  confetti.forEach((confetto, index) => {
//    if (confetto.position.y >= canvas.height) confetti.splice(index, 1)
//  })
//  sequins.forEach((sequin, index) => {
//    if (sequin.position.y >= canvas.height) sequins.splice(index, 1)
//  })
//
//  window.requestAnimationFrame(render)
//}
//
//// cycle through button states when clicked
//clickButton = () => {
//  if (!disabled) {
//    disabled = true
//    // Loading stage
//    button.classList.remove('ready')
//    setTimeout(() => {
//      // Completed stage
//      button.classList.add('complete')
//      setTimeout(() => {
//        window.initBurst()
//        setTimeout(() => {
//          // Reset button so user can select it again
//          disabled = false
//          button.classList.add('ready')
//          button.classList.remove('complete')
//        }, 4000)
//      }, 320)
//    }, 1800)
//  }
//}
//
//// re-init canvas if the window size changes
//resizeCanvas = () => {
//  canvas.width = window.innerWidth
//  canvas.height = window.innerHeight
//  cx = ctx.canvas.width / 2
//  cy = ctx.canvas.height / 2
//}
//
//// resize listenter
//window.addEventListener('resize', () => {
//  resizeCanvas()
//})
//
//// click button on spacebar or return keypress
//document.body.onkeyup = (e) => {
//  if (e.keyCode == 13 || e.keyCode == 32) {
//    clickButton()
//  }
//}
//
//// Set up button text transition timings on page load
//textElements = button.querySelectorAll('.button-text')
//textElements.forEach((element) => {
//  characters = element.innerText.split('')
//  let characterHTML = ''
//  characters.forEach((letter, index) => {
//    characterHTML += `<span class="char${index}" style="--d:${index * 30}ms; --dr:${(characters.length - index - 1) * 30}ms;">${letter}</span>`
//  })
//  element.innerHTML = characterHTML
//})
//
//// kick off the render loop
//window.initBurst()
//render()
//
//
//
//
//
