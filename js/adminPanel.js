

Vue.use(VueMaterial);


//----------------Инициализация основного контента------------------//

var adminPanel = new Vue({
    el: "#adminPanel",
    data: {
        layers: {
            main: true,    
            news: false,
            editor: false,
            reserve: false,
            notificat: false

        },
        notification: {
            dataSend: {
                title: "asd",
                body: "asddsfsdf"
            },
            saveMessage: false,
            successSend: false,
            errorSend: false,
            url: "https://fcm.1googleapis.com/fcm/send",
            key: "AAAAq97W7_w:APA91bE_LUOoPRmnMcxsKqGQKowG0Lmnsk9LjyKzBVBQoCLf1A6tGfZoKw3VjNyL5xQbEqGtWUJ5_lYjTcKA6W0npkbEOAInyoCgiikVoiVucX3UFSKt83WX1nyXWwDb_wtCJqpmXxCU"
            
        }
    },
    methods: {
        сhangeLayer: function(section){
            for(var layer in this.layers){
                if(section == layer){
                    this.layers[layer] = true;
                }
                else{
                    this.layers[layer] = false;
                }
            }
            console.log(this.layers);
        },
        
        sendPush: function(){
            
        this.notification.successSend = false;
        this.notification.errorSend = false;

        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
                    console.log(response);
                    if (response.result == 1){
                        adminPanel.notification.errorSend = true;
                    }
                    else{
                        adminPanel.notification.successSend = true;
                    }
                }
                else{
                    adminPanel.notification.errorSend = true;
                }
            }
        };
        xhttp.open("POST", this.notification.url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Authorization", "key=" + this.notification.key);
        var dataS = JSON.stringify({
            "to": "/topics/all",
            "data": {
                "title": this.notification.dataSend.title,
                "body": this.notification.dataSend.body
            }
        });
//        var data = JSON.stringify({"to":"/topics/all","data": {"title": "GGSDf", "body": "sfs@!3"}});
        if(xhttp.send(dataS)){
            adminPanel.notification.errorSend = true;
        }
            
        }    
    }
//    created: {
//        
//    }

});

//----------------//----//------------------//

//
//
//    function send2(){
//        
//        this.successSend = false;
//        this.errorSend = false;
//        
//        xhttp = new XMLHttpRequest();
//        xhttp.onreadystatechange = function() {
//          if(xhttp.readyState == 4){
//            if(xhttp.status == 200){
//                var response = JSON.parse(xhttp.responseText);
//                console.log( response );
//                if(response.result == 1) 
//                    this.errorSend = true
//                else 
//                    this.successSend = true;
//            }
//          }
//        };
//        xhttp.open("POST", this.url, true);
//        xhttp.setRequestHeader("Content-type", "application/json");
//        xhttp.setRequestHeader("Authorization", "key=" + this.key);
//        let data = JSON.stringify( {"to":"/topics/all","data": {"title": notification.dataSend.title, "body": notification.dataSend.body} } );
//        xhttp.send(data);
//    }