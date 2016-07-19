var animateHero = function() {
    var title = document.getElementsByClassName('hero-title');
    
    var fadeHero = function() {
        title[0].style.opacity = 1;
    };
    fadeHero();
};

var animatePoints = function() {
    var points = document.getElementsByClassName('point');
  
    var revealPoint = function(i) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
      
    for (var i = 0; i < points.length; i++) {
        revealPoint(i);
    };
};
