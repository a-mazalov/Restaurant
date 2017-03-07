//----------------//----//------------------//

Vue.use(VueMaterial);


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
new Vue({
  el: "#app"  
});
//----------------//----//------------------//
    $(document).ready(function () {
        
        if ( $(this).scrollTop() != 0 )  {
            $('.nav-custom').addClass("sticky");
        }
        
        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.nav-custom').addClass("sticky");
            } else {
                $('.nav-custom').removeClass("sticky");
            }
        });

//
//    var obj = {
//        first: "Name1",
//        Last: "Last1",
//        num: 1
//    }
//    console.log(obj);

    var nVueS = new Vue({
            el: "#Repeat-Object",
            data: {
                object: {
                    firstName: 'Иван',
                    lastName: 'Петров',
                    age: 30
                }
            }
        });

    new Vue({
        el: "#ex2",
        data: {
            pRange: 13
        },
        methods: {
            range : function(){
//                pRange = document.getElementById("RangeValue").value;
                alert(this.pRange);
            }
        }
    })

    
    var number = {
        counter : 0
    }

    Vue.component('my-component', {
        props: {
            msg: {
                type: String,
                default: "Default Hello Props"
            }
        },
        template: '<div v-on:click="counter +=1"> {{msg}} <p> Компонент-{{counter}} </p>  <hr></div>',
        data: function () {
            return {
                counter : 0
            }
        }
    })
    
    new Vue({
        el: "#ex3"
    })
    

});

    Vue.component('async-example', function (resolve, reject) {
      setTimeout(function () {
        // Передаем шаблон компонента в коллбэк resolve
        resolve({
          template: '<div>Я — асинхронный!</div>'
        })
      }, 1000)
    })

    new Vue({
        el: "#ex4"
    })
    
    
    Vue.component('item-menu',{
        template: '\
        <md-card>\
            <md-card-header>\
                <md-avatar class="md-large">\
                    <img src="img/img-hood.jpg">\
                </md-avatar>\
                <md-card-header-text>\
                    <div class="md-title">{{title}}</div>\
                    <div class="md-subhead">{{info}}<span><b>{{price}}</b></span></div>\
                </md-card-header-text>\
            </md-card-header>\
        </md-card>',
        
        data: function(){
            return {
                title: 'Заголовок-1 ',
                info: 'Описание-1 ',
                price: 69
            }
        }
    })
    
    var vueMenu = new Vue({
        el: '#vue-menu'
    })

    
    var JsonApp = new Vue({
        el: '#JsonApp',

        data : {
//            queryPoint : 'https://jsonplaceholder.typicode.com/posts',
            queryPoint : 'http://workproject/www/php/menu-query.php',
            posts: {},
            post: {}
        
        },
        methods: {

            getPosts: function () {
//                Параметры запроса
                var options = {
                    params: {
//                        _start: 0,
//                        _limit: 1
                    },
                    headers: {
//                        'Content-Type': 'application/json'
                    }
                }
                    this.$http.get(this.queryPoint,options).then( function(response){
                    
                    this.posts = JSON.parse(response.data);
                       
//                    alert(this.posts);
                    console.log( this.posts);
                    
                }, function(error){
                    console.log("Ошибка запроса: " + error.data);
                } );
            }
        },
        created: function(){
//            this.getSinglePost()
            this.getPosts()
        }
    })
    
    
    
//                getSinglePost: function() {
//                var resource = this.$resource('https://jsonplaceholder.typicode.com/posts{/id}')
//                
//                resource.get({ id:1 }).then(function(response){
//                    this.post = response.data
//                })
//            },
    
    
//    new Vue({
//        el: '#appJ',
//        data: {
//            jobs: []
//        },
//        methods: {
//            getJobs: function getJobs() {
//                var _this = this;
//
//                var route = 'https://codepen.io/jobs.json';
//                this.$http.get(route).then(function (response) {
//                    _this.jobs = response.data.jobs;
//                });
//            }
//        },
//        ready: function ready() {
//            this.getJobs();
//        }
//    });
    
    
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
//var app = {
//// Application Constructor
//initialize: function () {
//document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//},
//
//// deviceready Event Handler
////
//// Bind any cordova events here. Common events are:
//// 'pause', 'resume', etc.
//onDeviceReady: function () {
////        this.receivedEvent('deviceready');
//
//
//
//},
//
//// Update DOM on a Received Event
//receivedEvent: function (id) {
//var parentElement = document.getElementById(id);
////        var listeningElement = parentElement.querySelector('.listening');
////        var receivedElement = parentElement.querySelector('.received');
////
////        listeningElement.setAttribute('style', 'display:none;');
////        receivedElement.setAttribute('style', 'display:block;');
////
////        console.log('Received Event: ' + id);
////    }
////};
////
////app.initialize();
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
