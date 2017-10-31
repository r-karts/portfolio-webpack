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
    let stepGrayScale =100 / ($(document).height() - $(window).height());
    let stepContrast = 50 / ($(document).height() - $(window).height());
    document.getElementById("img-ground").style.webkitFilter = "grayscale("+ (100 - stepGrayScale * $(window).scrollTop()) +"%)  contrast(" + (150 - stepContrast * $(window).scrollTop()) +  "%)";
}