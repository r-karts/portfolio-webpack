require("../css/normalize.css");
require("../css/style.scss");

$(document).ready(function () {

    // hide .navbar first
});

$(".nav-item").click(function () {

    $("li.nav-item.active").removeClass("active");
    $(this).addClass('active');
});


$(".sun").click(function () {

    console.log("check");
});

window.onscroll = function () {
    scrolling();
    scrollingToBottom();
};

function scrolling() {
    let stepGrayScale = 100 / ($(document).height() - $(window).height());
    let stepContrast = 50 / ($(document).height() - $(window).height());
    document.getElementById("ground").style.webkitFilter = "grayscale(" + (100 - stepGrayScale * $(window).scrollTop()) + "%)  contrast(" + (150 - stepContrast * $(window).scrollTop()) + "%)";
}

function scrollingToBottom() {
    $(window).scroll(function () {
        if($(window).scrollTop() + $(window).height() >= $(document).height()) {
            $("#section1").css({
               display : "block"
            });
            $("#nav-bar").css({
                position : "fixed"
            }) ;
            $("#ground").css({
                position : "absolute"
            }) ;
        }
    });

}