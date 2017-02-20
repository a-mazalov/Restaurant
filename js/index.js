
//var app = {
//    // Application Constructor
//    initialize: function() {
//        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//    },
//
//    // deviceready Event Handler
//    //
//    // Bind any cordova events here. Common events are:
//    // 'pause', 'resume', etc.
//    onDeviceReady: function() {
////        this.receivedEvent('deviceready');
//        
//
//        
//    },
//
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};
//
//app.initialize();
//
//$( document ).ready(function() {
//    
//    $('#test').on('click',function(){
//           alert("Работает"); 
//        });
//    
//    console.log( "ready!" );
//});
var inf = "info is variable"
var app = new Vue({
  el: '#vue',
  data: {
    message: 'It\'s work!'
  }
});

var app2 = new Vue({
   el: "#vue2",
    data: {
        hint: "Загрузка страницы " + new Date(),
        info: inf
    }
});

var app3 = new Vue({
   el: "#vue3",
    data:{
        state: true
    }
});

//Изменение переменной 
var i = 0;
function change(){
//    alert("asds");
    app2.info = "Переменная изменена: " + i++;
    
    if (app3.state == true){
        app3.state = false;
    }
    else
        app3.state = true;
}

var app4 = new Vue ({
   el: "#vue4",
    data : {
        list : [
            { text: "Задание 1 " },
            { text: "Задание 2 " },
            { text: "Задание 36 " }
        ]
    }
});

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: ''
  }
})

function addToList(){
    app4.list.push({
        text : app6.message
    })
}
