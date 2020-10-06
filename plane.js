

// PLANE from https://codepen.io/simonswiss/pen/qdmPGr

var plane = $('.plane'),
    planeWidth = plane.width();
screenWidth = $(window).width();

flight = new TimelineMax({
    repeat: -1
});

flight
    .fromTo(plane, 4, {
        x: -planeWidth,
        rotation: 0
    }, {
        x: screenWidth,
        rotation: -10,
        ease: Power4.easeIn
    })
    .fromTo(plane, 1, {
        y: 5
    }, {
        y: -200,
        ease: Power4.easeIn
    }, 3)
    .fromTo(plane, 1, {
        x: -planeWidth
    }, {
        x: screenWidth,
        ease: Power0.easeNone
    })
    .to(plane, .5, {
        y: -280,
        rotation: 0,
        ease: Power1.easeOut
    }, 4)
    .to(plane, .5, {
        y: -200,
        rotation: 18,
        ease: Power1.easeIn
    }, 4.5)
    .addLabel('landing')
    .fromTo(plane, 5, {
        x: -planeWidth,
        rotation: 18
    }, {
        x: screenWidth + planeWidth,
        rotation: 0,
        ease: Power4.easeOut
    })
    .to(plane, 2, {
        y: 5,
        ease: Power4.easeOut
    }, 'landing');