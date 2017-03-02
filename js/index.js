//----------------//----//------------------//

Vue.use(VueMaterial);

//var initMaterial = new Vue({
//    el: '#material'
//});

//----------------//----//------------------//
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
//----------------//----//------------------//
    $(document).ready(function () {
        
        if ( $(this).scrollTop() != 0 )  {
            $('.nav-custom').addClass("sticky");
        }
        
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.nav-custom').addClass("sticky");
            } else {
                $('.nav-custom').removeClass("sticky");
            }
        });
    });
//    
//    var obj = {
//        "One":"First-Item",
//        "Two": [7,5,2,10]
//    }
//
//    function AddToLocal() {
//        localStorage.setItem("card", JSON.stringify(obj));
//        console.log("Добавлено");
//    }
//    var LocalCard = function (){  
//        var objCards = {};
//        objCards.Card = JSON.parse(localStorage.getItem("card"));
//        objCards.CountCards = Object.keys(objCards.Card).length;
////        console.log(localStorage.getItem("card"));
////        return objCards;
//        
//    }
//    function clearLocal(){
//        localStorage.clear();
//        console.log("Local storage clean");
//    }
////    function CountOrder(){
////        console.log("Шт: " + objCards.CountCards);
////    }
////    console.log("CountCard:" + LocalCard().CountCards);
//
//    class Cardz {
//        constructor(){
////            this.objC = {};
//            this.value = Array();
//        }
//        get GetCard(){
//            return this.value;
//        }
//        set setCard(item){
//            this.value = item;
////            console.log(value);
//        }
//        count(){
//            console.log("asd");
//        }
//    };
////    var cl = new Cardz();
////    cl.setCard = obj;
//
//
//    $( document ).ready(function() {
//        
//        $('#order').on('click',function(){
////            alert("Работает");
//            console.log(LocalCard().Card);
//        });
//    });
//
////    console.log(cl.GetCard);
//
//
//
//
////    (function(){ console.log("function") } ) ();
////----------------//----//------------------//
////var app = {
////// Application Constructor
////initialize: function () {
////document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
////},
////
////// deviceready Event Handler
//////
////// Bind any cordova events here. Common events are:
////// 'pause', 'resume', etc.
////onDeviceReady: function () {
//////        this.receivedEvent('deviceready');
////
////
////
////},
////
////// Update DOM on a Received Event
////receivedEvent: function (id) {
////var parentElement = document.getElementById(id);
//////        var listeningElement = parentElement.querySelector('.listening');
//////        var receivedElement = parentElement.querySelector('.received');
//////
//////        listeningElement.setAttribute('style', 'display:none;');
//////        receivedElement.setAttribute('style', 'display:block;');
//////
//////        console.log('Received Event: ' + id);
//////    }
//////};
//////
//////app.initialize();
//////
//////$( document ).ready(function() {
//////    
//////    $('#test').on('click',function(){
//////           alert("Работает"); 
//////        });
//////    
//////    console.log( "ready!" );
//////});
//var inf = "info is variable"
//var app = new Vue({
//    el: '#vue',
//    data: {
//        message: 'It\'s work!'
//    }
//});
//
//var app2 = new Vue({
//    el: "#vue2",
//    data: {
//        hint: "Загрузка страницы " + new Date(),
//        info: inf
//    }
//});
//
//var app3 = new Vue({
//    el: "#vue3",
//    data: {
//        state: true
//    }
//});
//
////Изменение переменной 
//var i = 0;
//
//function change() {
//    //    alert("asds");
//    app2.info = "Переменная изменена: " + i++;
//
//    if (app3.state == true) {
//        app3.state = false;
//    } else
//        app3.state = true;
//}
//
//var app4 = new Vue({
//    el: "#vue4",
//    data: {
//        list: [
//            {
//                text: "Задание 1 "
//            },
//            {
//                text: "Задание 2 "
//            },
//            {
//                text: "Задание 36 "
//            }
//        ]
//    }
//});
//
//
////var app5 = new Vue({
////    el: '#vue5',
////    data: {
////        message: ''
////    }
////})
////
////function addToList() {
////    app4.list.push({
////        text: app5.message
////    })
////}
//var app5 = new Vue({
//    el: '#vue5',
//    data: {
//        message: ''
//    },
//    methods: {
//        addNote: function () {
//            app4.list.push({
//                text: app5.message
//            })
//        }
//    }
//});
////-----------------------------------------//
//var app6 = new Vue({
//    el: "#vue6",
//    data: {
//        testVue6: "Alive"
//    },
//    methods: {
//        event: function () {
//            this.testVue6 += "-ga"
//        }
//    }
//
//});
//
////-----------------------------------------//
////Vue.component('todo-item', {
////  props: ['todo'],
////  template: '<li>{{ todo.text }}</li>'
////});
////var app7 = new Vue({
////  el: '#app-7',
////  data: {
////    groceryList: [
////      { text: 'Овощи' },
////      { text: 'Сыр' },
////      { text: 'Что там ещё люди едят?' }
////    ]
////  }
////});
////-----------------------------------------//
////Vue.component('comp-item', {
////    props: ['item'],
////    template: '<li>{{ item.text }}</li>'
////});
////
////var app7 = new Vue({
////    el: "#vue7",
////    data: {
////        itemlist : [
////      { text: 'Овощи' },
////      { text: 'Сыр' },
////      { text: 'Что там ещё люди едят?' }    
////        ]
////    }
////});
