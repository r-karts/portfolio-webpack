require("../css/normalize.css");
require("../css/style.scss");

$(".nav-item").click(function() {

    $("li.nav-item.active").removeClass("active");
    $(this).addClass('active');
});


$(".sun").click(function() {

    console.log("check");
});

window.onscroll = function() {scrolling()};

function scrolling() {
    // let stepGrayScale =100 / ($(document).height() - $(window).height());
    // let stepContrast = 50 / ($(document).height() - $(window).height());
    // document.getElementById("ground").style.webkitFilter = "grayscale("+ (100 - stepGrayScale * $(window).scrollTop()) +"%)  contrast(" + (150 - stepContrast * $(window).scrollTop()) +  "%)";
    // console.log( document.getElementById("sky").getBoundingClientRect().top + " " + heightPage);

}

jQuery(document).ready(function($){

    //variables
    var animationType = $('body').data('animation'),
        delta = 0,
        scrollThreshold = 5,
        actual = 1,
        animating = false;

    //DOM elements
    var sectionsAvailable = $('.cd-section');

    //check the media query and bind corresponding events
    var MQ = deviceType(),
        bindToggle = false;

    bindEvents(MQ, true);

    $(window).on('resize', function(){
        MQ = deviceType();
        bindEvents(MQ, bindToggle);
        if( MQ == 'mobile' ) bindToggle = true;
        if( MQ == 'desktop' ) bindToggle = false;
    });

    function bindEvents(MQ, bool) {
        console.log(MQ);
      //  if( MQ == 'desktop' && bool) {
            //bind the animation to the window scroll event, arrows click and keyboard
            scrollAnimation();
            $(window).on('scroll', scrollAnimation);

        // } else if( MQ == 'mobile' ) {
        //     //reset and unbind
        //     resetSectionStyle();
        //     $(window).off('scroll', scrollAnimation);
        // }
    }

    function scrollAnimation(){
        //normal scroll - use requestAnimationFrame (if defined) to optimize performance
        (!window.requestAnimationFrame) ? animateSection() :
            window.requestAnimationFrame(animateSection);
    }

    function animateSection() {
        var scrollTop = $(window).scrollTop(),
            windowHeight = $(window).height();

        sectionsAvailable.each(function(){
            var actualBlock = $(this),
                offset = (scrollTop + windowHeight) - (actualBlock.offset().top + actualBlock.height());
            //according to animation type and window scroll, define animation parameters
            var animationValues = setSectionAnimation(offset, windowHeight);
            if(actualBlock.hasClass("main-section"))
            {
                console.log(offset);
            }
            transformSection(actualBlock.children('div'), animationValues[0], animationValues[1], animationValues[2], animationValues[3], animationValues[4]);
            // ( offset >= 0 && offset < windowHeight ) ? actualBlock.addClass('visible') : actualBlock.removeClass('visible');
        });

    }

    function transformSection(element, translateY, scaleValue, rotateXValue, opacityValue, boxShadow) {
        // console.log(element, translateY, scaleValue, rotateXValue, opacityValue, boxShadow);
        //transform sections - normal scroll
        element.velocity({
            translateY: translateY+'vh',
            scale: scaleValue,
            rotateX: rotateXValue,
            opacity: opacityValue,
            boxShadowBlur: boxShadow+'px',
            translateZ: 0,
        }, 0);
    }

    function resetSectionStyle() {
        //on mobile - remove style applied with jQuery
        sectionsAvailable.children('div').each(function(){
            $(this).attr('style', '');
        });
    }

    function deviceType() {
        //detect if desktop/mobile
        return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
    }

    function setSectionAnimation(sectionOffset, windowHeight ) {
        // select section animation - normal scroll

        var scale = 1,
            translateY = 0,
            rotateX = '0deg',
            opacity = 1,
            boxShadowBlur = 0;

        if( sectionOffset >= -windowHeight && sectionOffset <= 0 ) {

            // section entering the viewport
            translateY = (-sectionOffset)*100/windowHeight;
            // console.log("<= 0 ------ translateY(" + translateY +")" );

        } else if( sectionOffset > 0 && sectionOffset <= windowHeight ) {
            // console.log(sectionOffset + "> 0 &&" + sectionOffset + "<=" + windowHeight);
            //section leaving the viewport - still has the '.visible' class
            translateY = 0;
            // console.log("translateY = 0");


        } else if( sectionOffset < -windowHeight ) {
            // console.log(sectionOffset + " < " +(-windowHeight));
            //section not yet visible
            translateY = 100;
            // console.log("translateY = 100");

        } else {
            //section not visible anymore
            // console.log("else translateY = 0");
            translateY = 0;
        }

        return [translateY, scale, rotateX, opacity, boxShadowBlur];
    }
});

/* Custom effects registration - feature available in the Velocity UI pack */
//none
$.Velocity
    .RegisterEffect("translateUp", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '-100%'}, 1]
        ]
    });
$.Velocity
    .RegisterEffect("translateDown", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '100%'}, 1]
        ]
    });
$.Velocity
    .RegisterEffect("translateNone", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '0', opacity: '1', scale: '1', rotateX: '0', boxShadowBlur: '0'}, 1]
        ]
    });

//scale down
$.Velocity
    .RegisterEffect("scaleDown", {
        defaultDuration: 1,
        calls: [
            [ { opacity: '0', scale: '0.7', boxShadowBlur: '40px' }, 1]
        ]
    });
//rotation
$.Velocity
    .RegisterEffect("rotation", {
        defaultDuration: 1,
        calls: [
            [ { opacity: '0', rotateX: '90', translateY: '-100%'}, 1]
        ]
    });
$.Velocity
    .RegisterEffect("rotation.scroll", {
        defaultDuration: 1,
        calls: [
            [ { opacity: '0', rotateX: '90', translateY: '0'}, 1]
        ]
    });
//gallery
$.Velocity
    .RegisterEffect("scaleDown.moveUp", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '-10%', scale: '0.9', boxShadowBlur: '40px'}, 0.20 ],
            [ { translateY: '-100%' }, 0.60 ],
            [ { translateY: '-100%', scale: '1', boxShadowBlur: '0' }, 0.20 ]
        ]
    });
$.Velocity
    .RegisterEffect("scaleDown.moveUp.scroll", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '-100%', scale: '0.9', boxShadowBlur: '40px' }, 0.60 ],
            [ { translateY: '-100%', scale: '1', boxShadowBlur: '0' }, 0.40 ]
        ]
    });
$.Velocity
    .RegisterEffect("scaleUp.moveUp", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '90%', scale: '0.9', boxShadowBlur: '40px' }, 0.20 ],
            [ { translateY: '0%' }, 0.60 ],
            [ { translateY: '0%', scale: '1', boxShadowBlur: '0'}, 0.20 ]
        ]
    });
$.Velocity
    .RegisterEffect("scaleUp.moveUp.scroll", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '0%', scale: '0.9' , boxShadowBlur: '40px' }, 0.60 ],
            [ { translateY: '0%', scale: '1', boxShadowBlur: '0'}, 0.40 ]
        ]
    });
$.Velocity
    .RegisterEffect("scaleDown.moveDown", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '10%', scale: '0.9', boxShadowBlur: '40px'}, 0.20 ],
            [ { translateY: '100%' }, 0.60 ],
            [ { translateY: '100%', scale: '1', boxShadowBlur: '0'}, 0.20 ]
        ]
    });
$.Velocity
    .RegisterEffect("scaleDown.moveDown.scroll", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '100%', scale: '0.9', boxShadowBlur: '40px' }, 0.60 ],
            [ { translateY: '100%', scale: '1', boxShadowBlur: '0' }, 0.40 ]
        ]
    });
$.Velocity
    .RegisterEffect("scaleUp.moveDown", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '-90%', scale: '0.9', boxShadowBlur: '40px' }, 0.20 ],
            [ { translateY: '0%' }, 0.60 ],
            [ { translateY: '0%', scale: '1', boxShadowBlur: '0'}, 0.20 ]
        ]
    });
//catch up
$.Velocity
    .RegisterEffect("translateUp.delay", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '0%'}, 0.8, { delay: 100 }],
        ]
    });
//opacity
$.Velocity
    .RegisterEffect("hide.scaleUp", {
        defaultDuration: 1,
        calls: [
            [ { opacity: '0', scale: '1.2'}, 1 ]
        ]
    });
$.Velocity
    .RegisterEffect("hide.scaleDown", {
        defaultDuration: 1,
        calls: [
            [ { opacity: '0', scale: '0.8'}, 1 ]
        ]
    });
//parallax
$.Velocity
    .RegisterEffect("translateUp.half", {
        defaultDuration: 1,
        calls: [
            [ { translateY: '-50%'}, 1]
        ]
    });