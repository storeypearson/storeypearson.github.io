//$(document).ready(function () {
//    var $one = $('.move'),
//        browserPrefix = "",
//        usrAg = navigator.userAgent;
//    if(usrAg.indexOf("Chrome") > -1 || usrAg.indexOf("Safari") > -1) {
//        browserPrefix = "-webkit-";
//    } else if (usrAg.indexOf("Opera") > -1) {
//        browserPrefix = "-o";
//    } else if (usrAg.indexOf("Firefox") > -1) {
//        browserPrefix = "-moz-";
//    } else if (usrAg.indexOf("MSIE") > -1) {
//        browserPrefix = "-ms-";
//    }
//    
//    $(document).mousemove(function (event) {
//        var cx = Math.ceil(window.innerWidth / 2.0),
//            cy = Math.ceil(window.innerHeight / 2.0),
//            dx = event.pageX - cx,
//            dy = event.pageY - cy,
//            tiltx = (dy / cy) * 50,
//            tilty = - (dx / cx) * 50,
//            radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2)),
//            degree = (radius * 15);
////        console.log(degree)
//        
//        $one.css(browserPrefix + 'transform', 'translate(' + tiltx + 'px, ' + tilty + 'px)');
//
//        $one.css(browserPrefix + 'transform', 'translate(' + tiltx + 'px,' + ', ' + 'deg)');
//
//        $one.css(browserPrefix + 'transform', 'rotate(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
//
//});
//    });




function myFunct (){
var flipper = document.getElementsByClassName('js-flip')[0];
    
  flipper.classList.toggle('flipped');
}

function doBounce(element, times, distance, speed) {
  for(var i = 0; i < times; i++) {
      element.animate({marginTop: '-='+distance}, speed)
             .animate({marginTop: '+='+distance}, speed);
  }
}

function showMessage(id) {
  var message = $('#message-' + id);
  message.css('display', 'block');
  doBounce(message, 1, '4px', 150);
}

function start() {
  var messages = $('.message');
  var timeOut = 1000;
  var writer = $('.writing');
  
  messages.each(function(index) {
    index += 1;
    if (index === messages.length) window.setTimeout( function() { writer.remove(); }, timeOut );
    window.setTimeout( function() { showMessage(index); }, timeOut );
    timeOut += 1000;
  });
}

$(document).ready(function() {
  start();
  $('#replay').click(start());
});


// Uncomment the rest of the JS to enable click and drag to rotate.
// It is pretty buggy so I left it disabled to leave focus on the 3D CSS animation.

/*

// isDown is a flag to check if the mouse is down whe running a function
// startX will represent where the mouse was on the card when the drag started
let isDown = false; 
let startX;

// set isDown to true, set value of for where the mouse started
function startRotation(e) {
  isDown = true;
  startX = e.pageX - this.offsetLeft;
}

// function to stop the rotation
function stopRotation(e) {
  isDown = false;
}

function dragRotate(e) {
  if(!isDown) return; // if mouse is not down, exit function 
  e.preventDefault();
  
  // get value for how much the mouse has moved 
  // dividing by two here just to slow it down a bit
  const movement = (e.pageX - this.offsetLeft - startX) / 2;
  
  // set rotation value using template literal
  this.style.transform = `rotateY(${movement}deg)`;
}

// event listeners 
card.addEventListener('click', clickRotate);
card.addEventListener('mousedown', startRotation);
card.addEventListener('mouseleave', stopRotation);
card.addEventListener('mouseup', stopRotation);
card.addEventListener('mousemove', dragRotate);

*/






//document.addEventListener('mousemove', parallax);
//
//function parallax(e) {
//  this.querySelectorAll('.layer').forEach(layer => {
//    let x = (window.innerWidth - e.pageX * 10) / 100;
//    let y = (window.innerHeight - e.pageY * 10) / 100;
//    layer.style.transform = `translate(${x}px, ${y}px)`;
//  });
//}

    

//function Parallax(options){
//    options = options || {};
//    this.nameSpaces = {
//        wrapper: options.wrapper || '.parallax',
//        layers: options.layers || '.parallax-layer',
//        deep: options.deep || 'data-parallax-deep'
//    };
//    this.init = function() {
//        var self = this,
//            parallaxWrappers = document.querySelectorAll(this.nameSpaces.wrapper);
//      	for(var i = 0; i < parallaxWrappers.length; i++){
//			(function(i){
//				parallaxWrappers[i].addEventListener('mousemove', function(e){
//					var x = e.clientX,
//						y = e.clientY,
//						layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);
//					for(var j = 0; j < layers.length; j++){
//            (function(j){
//              var deep = layers[j].getAttribute(self.nameSpaces.deep),
//                  disallow = layers[j].getAttribute('data-parallax-disallow'),
//                  itemX = (disallow && disallow === 'x') ? 0 : x / deep,
//                  itemY = (disallow && disallow === 'y') ? 0 : y / deep;
//                  if(disallow && disallow === 'both') return;
//                  layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
//            })(j);  
//					}
//				})
//			})(i);
//      	}
//    };
//    this.init();
//    return this;
//}
//
//window.addEventListener('load', function(){
//    new Parallax();
//});



//draggable direction code
//$(document).ready(function() {
//  // the same as yours.
//  function rotateOnMouse(e, pw) {
//      var offset = pw.offset();
//      var center_x = (offset.left) + ($(pw).width() / 2);
//      var center_y = (offset.top) + ($(pw).height() / 2);
//      var mouse_x = e.pageX;
//      var mouse_y = e.pageY;
//      var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
//      var degree = (radians * (180 / Math.PI) * -1) + 100;
//      //            window.console.log("de="+degree+","+radians);
//      $(pw).css('-moz-transform', 'rotate(' + degree + 'deg)');
//      $(pw).css('-webkit-transform', 'rotate(' + degree + 'deg)');
//      $(pw).css('-o-transform', 'rotate(' + degree + 'deg)');
//      $(pw).css('-ms-transform', 'rotate(' + degree + 'deg)');
//  }
//
//  $('.drop div img').mousedown(function(e) {
//    e.preventDefault(); // prevents the dragging of the image.
//    $(document).bind('mousemove.rotateImg', function(e2) {
//      rotateOnMouse(e2, $('.drop div img'));
//    });
//  });
//
//  $(document).mouseup(function(e) {
//    $(document).unbind('mousemove.rotateImg');
//  });
//});


//var sun = document.querySelector(".box");
//var sun_size = 50;
//
//// Mouse move tilt effect
//document.onmousemove = function(event){
// 
//  // Detect mouse position
//  var xPos = (event.clientX/window.innerWidth) - 0.5;
//  var yPos = (event.clientY/window.innerHeight) - 0.5;
//  
////  // Sun position
////  sun.style.top = event.clientY - sun_size/2 + "px";
////  sun.style.left = event.clientX - sun_size/2 + "px";
//
//  // Tilt the container
//  TweenLite.to(".diamond", 0.1, {
//    rotationY:20*xPos, 
//    rotationX:10*-yPos, 
//    ease:Power1.easeOut, 
//    transformPerspective:3000, 
//    transformOrigin:"center"
//  });
//};



//// Rotating chrome text elements
//function rotate (event) 
//{
//    var x = event.clientX;
//    var w = window.innerWidth;
//    var midpoint = w / 2;
//    var pos = x - midpoint;
//	var val = (pos / midpoint) * 20;
//	var logo = document.getElementById("logo");
//	logo.style.transform = "perspective(550px) rotateY(" + val + "deg)";
//}
//
//document.addEventListener("mousemove", function (event)
//{
//	rotate (event)
//}, false);
