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
$(document).ready(function () {

    if ($(this).scrollTop() != 0) {
        $('.nav-custom').addClass("sticky");
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.nav-custom').addClass("sticky");
        } else {
            $('.nav-custom').removeClass("sticky");
        }
    });

    //close document-ready
});