//----------------//----//------------------//

Vue.use(VueMaterial);

//----------------SlideNav------------------//
var App = new Vue({
    el: '#header',
    methods: {
        toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle();
            },
            toggleRightSidenav() {
                this.$refs.rightSidenav.toggle();
            },
            closeRightSidenav() {
                this.$refs.rightSidenav.close();
            },
            open(ref) {
                console.log('Opened: ' + ref);
            },
            close(ref) {
                console.log('Closed: ' + ref);
            }
    }
});

//----------------Инициализация основного контента------------------//

    new Vue({
        el: "#Main-app"
        
    });

//----------------//----//------------------//

document.addEventListener('DOMContentLoaded', function(e) {
    
//    var nav_custom = document.getElementsByClassName("nav-custom")[0];
    var nav_custom = document.querySelector(".nav-custom");
    if (document.documentElement.scrollTop != 0) {
        nav_custom.classList.add("sticky");
    }

    window.addEventListener('scroll', function() {
        if (document.documentElement.scrollTop > 50) {
            nav_custom.classList.add("sticky");
        } else {
            nav_custom.classList.remove("sticky");
        }
    });
    
    
});

//
//$(document).ready(function () {
//
////    document.getElementById("custom");
////    document.getElementsByClassName();
//
//
//    
//    $(window).scroll(function () {
//
//    });
//
//    //close document-ready
//});
