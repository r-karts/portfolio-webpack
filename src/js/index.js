require("../css/normalize.css");
require("../css/style.scss");


$(".nav-item").click(function() {

    $("li.nav-item.active").removeClass("active");
    $(this).addClass('active');
});