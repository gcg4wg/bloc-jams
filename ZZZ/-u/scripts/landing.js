var animateHero = function() {    
    $('.hero-title').css({
        opacity: 1,
    });
};

var animatePoints = function() {
    var revealPoint = function() {
       $(this).css({
           opacity: 1,
           transform: 'scaleX(1) translateY(0)'
       });
    };
    $.each($('.point'), revealPoint);
};
      
 $(window).load(function() {
     // first animate hero title
     animateHero();
     // automatically animate selling points on tall enough screens
     if ($(window).height() > 950) {
         animatePoints;
     }
     // calculate the distance user must scroll to animate selling points 
     var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    // execute selling points animation on scroll
     $(window).scroll(function(event) {
         if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
         }
     });
 });