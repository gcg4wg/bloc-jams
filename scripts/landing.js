function animateHero() {
    var title = document.getElementsByClassName('hero-title');
    
    var fadeHero = function() {
        title[0].style.opacity = 1;
    };
    fadeHero();
};

var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point) {
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
};
      
function animatePoints(points) {
    forEach(points, revealPoint);
};

 window.onload = function() {
     // animate hero title
     animateHero();
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