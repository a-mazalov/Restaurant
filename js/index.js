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

//document.addEventListener('DOMContentLoaded',NotificationFunc,false)





document.addEventListener("deviceready",NotificationFunc,false);
function NotificationFunc(){

    window.FCMPlugin.onNotification(function(data){
        window.cordova.plugins.notification.local.schedule({
            id: 1,
            title: data.title,
            text: data.body,
            smallIcon: ""
        });

        if(data.wasTapped){
          //Notification was received on device tray and tapped by the user.
          console.log( JSON.stringify(data) );
        }else{
          //Notification was received in foreground. Maybe the user needs to be notified.
          console.log( JSON.stringify(data) );
        }
    });

}



//----------------//----//------------------//
//var push;
//
// function setupPush() {
//     var push = PushNotification.init({
//        android: {
//            senderID: "546819335473"
//        },
//         browser: {
//             pushServiceURL: 'http://push.api.phonegap.com/v1/push'
//         },
//        ios: {
//            alert: "true",
//            badge: true,
//            sound: 'false'
//        },
//        windows: {}
//     });
////   push = PushNotification.init({
////       "android": {
////           senderID: "546819335473",
////           vibrate: true,
////           clearBadge: true,
////           sound: true,
////           forceShow: false
////       },
////       "ios": {
////         "sound": true,
////         "alert": true,
////         "badge": true
////       },
////       "windows": {}
////   });
//   push.on('registration', function(data) {
//       console.log("registration event: " + data.registrationId);
//       var oldRegId = localStorage.getItem('registrationId');
//       if (oldRegId !== data.registrationId) {
//           // Save new registration ID
//           localStorage.setItem('registrationId', data.registrationId);
//           // Post registrationId to your app server as the value has changed
//       }
//   });
////
//   push.on('error', function(e) {
//       console.log("push error = " + e.message);
//   });
//
////   push.on('notification', function(data) {
////        console.log('notification event');
////        navigator.notification.alert(
////            "message Test",         // message
////            null,                 // callback
////            "Title notif",           // title
////            'Ok'                  // buttonName
////        );
////   });
//
//   push.on('notification', function(data) {
//        console.log(data.message);
//        console.log(data.title);
//   });
//
//}
//
//document.addEventListener("deviceready",setupPush,false);








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