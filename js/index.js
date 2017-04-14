//----------------//----//------------------//

Vue.use(VueMaterial);
//(function () {
//    /** анонимная ф-ция с вашим js-java connector */
//    var localVar = window.storage.dataAccount;
//    alert(localVar);
//})();
//----------------SlideNav------------------//
var App = new Vue({
    el: '#header',
    data: {
        dataAccount: {},
        snackMessage: ""
    },
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
    },
    created: function () {
//        let Local = new LocalStore();
//        if ( Local.Check("Account") ){
//           this.dataAccount = Local.Get("Account");
//        }
    }
});

//----------------Инициализация основного контента------------------//

    new Vue({
        el: "#Main-app"
        
    });

//----------------//----//------------------//
//$(document).ready(function () {
//
//    if ($(this).scrollTop() != 0) {
//        $('.nav-custom').addClass("sticky");
//    }
//
//    $(window).scroll(function () {
//        if ($(this).scrollTop() > 50) {
//            $('.nav-custom').addClass("sticky");
//        } else {
//            $('.nav-custom').removeClass("sticky");
//        }
//    });
//
//    //close document-ready
//});