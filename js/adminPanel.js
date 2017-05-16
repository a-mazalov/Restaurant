

Vue.use(VueMaterial);


//----------------Инициализация основного контента------------------//

var adminPanel = new Vue({
    el: "#adminPanel",
    data: {
        loader: true,
        layers: {
            main: false,    
            news: false,
            editor: false,
            reserve: true,
            notificat: false

        },
        servers:{
            reserveURL: "http://restaurant.atservers.net/php/ListReserve.php",
            reserveURL: "http://workproject/www/php/ListReserve.php",
            actionsURL: "http://restaurant.atservers.net/php/actionDB.php",
            actionsURL: "http://workproject/www/php/actionDB.php",
        },
        listReserve: [],
        notification: {
            dataSend: {
                title: "asd",
                body: "asddsfsdf"
            },
            saveMessage: false,
            successSend: false,
            errorSend: false,
            url: "https://fcm.googleapis.com/fcm/send",
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
        actions: function(item,index,action){
//            this.closeDialog("menuAction");
//            alert("sdasdasd");
            
//            console.log(this.listReserve.indexOf(item));
            this.listReserve.splice(index, 1);
            console.log(this.listReserve);
            
//            let infoSend = {"item":item, "action": action};
//            
//            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
//                console.log("Выполнено");
////                console.log(response.data);
//                
//                this.remItmsCheck = "favorite";
//
//                this.indexLastItem = this.listReserve.indexOf(item);
//                //            console.log(this.indexLastItem);
//                this.removedItem = item; //Копия удаляемого элемента 
//
//                this.accListFavorite.splice(this.indexLastItem, 1); //Удаление элемента
//        
//                
//            }, function (error) {
//                console.log("Ошибка запроса: " + error.data);
//            });
//            
        },
        getReserve: function () {
                this.$http.get(this.servers.reserveURL).then(function (response) {
                
                    this.loader = false;
                    this.listReserve = JSON.parse(response.data);
                    console.log( JSON.parse(response.data) );
                }, function (error) {
                    this.error = true;
                    console.log("Ошибка запроса: " + error.data);
                });
        },
        priceInReserve: function(dishes){
//            console.log(dishes);
            
            let price = 0;
            for (let i = 0; i < dishes.length; i++) {
                price += parseInt( (dishes[i].Price_dish * dishes[i].Amount_dish) * 100)/100;
            }
            return price.toFixed(2);
            
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
            xhttp.send(dataS);

        },
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        }
    },
    created: function(){
        this.getReserve();
    }
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