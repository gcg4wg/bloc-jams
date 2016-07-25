function animateHero() {
    var title = document.getElementsByClassName('hero-title');
    
    var fadeHero = function() {
        title[0].style.opacity = 1;
    };
    fadeHero();
};

var pointsArray = document.getElementsByClassName('point');

function animatePoints(points) {
  
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

 window.onload = function() {
     // automatically animate selling points on tall enough screens
     if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
     // grab selling points
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
     // calculate the distance user must scroll to animate selling points 
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    // 
     window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
     });
 }