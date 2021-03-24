var s = skrollr.init();//(function() {
//    function scrollHorizontally(e) {
//        e = window.event || e;
//        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
//        document.getElementById('main').scrollLeft -= (delta * 40); // Multiplied by 40
//        e.preventDefault();
//        e.stopPropagation(); // << add this
//    }
//    if (document.getElementById('main').addEventListener) {
//        // IE9, Chrome, Safari, Opera
//        document.getElementById('main').addEventListener('mousewheel', scrollHorizontally, false);
//        // Firefox
//        document.getElementById('main').addEventListener('DOMMouseScroll', scrollHorizontally, false);
//    } else {
//        // IE 6/7/8
//        document.getElementById('main').attachEvent('onmousewheel', scrollHorizontally);
//    }
//})();