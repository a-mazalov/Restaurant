

Vue.use(VueMaterial);

var Copyied;
//----------------Инициализация основного контента------------------//

var adminPanel = new Vue({
    el: "#adminPanel",
    data: {
        loader: true,
        snackMessage: '',
        editMode: false,
        layers: {
            main: false,    
            news: false,
            editor: false,
            reserve: true,
            notificat: false

        },
        servers:{
            menuURL: 'http://restaurant.atservers.net/php/menu-query.php',
            menuURL: 'http://workproject/www/php/menu-query.php',
            reserveURL: "http://restaurant.atservers.net/php/ListReserve.php",
            reserveURL: "http://workproject/www/php/ListReserve.php",
            actionsURL: "http://restaurant.atservers.net/php/actionDB.php",
            actionsURL: "http://workproject/www/php/actionDB.php",
        },
        listMenu: [],
        newDish: {
            Title_dish: '',
            Caption_dish: '',
            Category_dish: '',
            Price_dish: '',
            ImagePath: ''
        },
        actionMenu: {
            preEdit: [],
            acceptEdit: false,
            cancelEdit: false
        },
        listReserve: [],
        notification: {
            dataSend: {
                title: "Уведомление от ресторана",
                body: "Добрный день, я тюлень"
            },
            saveMessage: false,
            successSend: false,
            errorSend: false,
            url: "https://fcm.googleapis.com/fcm/send",
            key: "AAAAq97W7_w:APA91bE_LUOoPRmnMcxsKqGQKowG0Lmnsk9LjyKzBVBQoCLf1A6tGfZoKw3VjNyL5xQbEqGtWUJ5_lYjTcKA6W0npkbEOAInyoCgiikVoiVucX3UFSKt83WX1nyXWwDb_wtCJqpmXxCU"
            
        }
    },
    methods: {
//-------------------Работа с меню---------------------------
        getMenu: function () {
            this.$http.get(this.servers.menuURL).then(function (response) {

//                console.log(response.data);
                this.listMenu = JSON.parse(response.data);
//                this.listMenu = response.data;
                console.log(this.listMenu);

            }, function (error) {
                console.log("Ошибка запроса: " + error.data);
            });
        },
        SwithEditMode: function(){
            
            if(!this.editMode){
                this.actionMenu.preEdit = copyObj(this.listMenu);
            }else{
                this.listMenu = this.actionMenu.preEdit;
            }

        },
        cancelEdit: function(){
            this.listMenu = this.actionMenu.preEdit;
        },
        sendUpadeMenu: function(){

            let arrUpdate = [];

            for(let category in this.listMenu){

                for(let dish in this.listMenu[category])

                    if( this.listMenu[category][dish].hasOwnProperty('edit') ){

                        delete this.listMenu[category][dish].edit;
                        arrUpdate.push(this.listMenu[category][dish]);
                    }    
            }   
            console.log(arrUpdate);
            
            if(arrUpdate.length){
               
                let infoSend = {"item": arrUpdate, "action": "update"};
            
                this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
                    console.log("Выполнено"); 
                    console.log(response.data);
                }, function (error) {
                    console.log("Ошибка запроса: " + error.data);
                    this.showSnackBar("Ошибка при выполнении операции");
                    this.listReserve.splice(deletedItem.index, -1, deletedItem.item);
                });    
            
            }else{
                this.showSnackBar("Нет изменений");
            }

            this.editMode = false;

        },
        createDish: function(){
            alert('sdf');
            console.log(this.newDish); 
            
            let infoSend = {"item":this.newDish, "action": "newDish"};
            
            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
                console.log("Выполнено"); 
                console.log(response.data);
                this.getMenu();
            }, function (error) {
                console.log("Ошибка запроса: " + error.data);
                this.showSnackBar("Ошибка при выполнении операции");
            });
            
            
            
        },
        Tchange: function(){
            alert("change");        
        },
        test: function(){
  
        },
        actionE: function(index){
            this.listMenu["Hot_dishes"][index]['edit'] = true;
            alert('asd');
            return true;
//            alert('sdffd');    
        },
//-------------------Работа с бронированием---------------------------
        getReserve: function () {
                this.$http.get(this.servers.reserveURL).then(function (response) {
                
                    this.loader = false;
                    this.listReserve = JSON.parse(response.data);
                    console.log( JSON.parse(response.data) );
                }, function (error) {
                    this.showSnackBar("Ошибка соединения");
                    console.log("Ошибка запроса: " + error.data);
                });
        },
        priceInReserve: function(dishes){
//            console.log(dishes);
            
            let price = 0;
            for (let i = 0;  dishes && i < dishes.length; i++) {
                price += parseInt( (dishes[i].Price_dish * dishes[i].Amount_dish) * 100)/100;
            }
            return price.toFixed(2);
            
        },
        actionsDelRes: function(item,index){
            console.log("delRes");
            let deletedItem = {
                "index": index,
                "item": item
            };
            
            let infoSend = {"item":item, "action": "delete"};
            console.log(infoSend)
            this.listReserve.splice(deletedItem.index, 1);
            
            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
                console.log("Выполнено");
                console.log(response.data)
            }, function (error) {
                console.log("Ошибка запроса: " + error.data);
                this.showSnackBar("Ошибка при выполнении операции");
                this.listReserve.splice(deletedItem.index, -1, deletedItem.item);
            });
//            
        },
//-------------------Работа с рассылкой уведомлений-----------------------
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
//-------------------Вспомогательные функции----------------
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
        showSnackBar(Message) {
            this.snackMessage = Message;
            this.$refs.snackbar.open();
//            this.$refs.snackbar.options = funcBtn;
        },
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        }
    },
//-------------------При создании---------------------------            
    created: function(){
        this.getMenu();
        this.getReserve();
    }
});
//----------------//----//------------------//


 function copyObj(obj) {
    if (typeof obj != "object") {
        return obj;
    }
    
    var copy = obj.constructor();
    for (var key in obj) {
        if (typeof obj[key] == "object") {
            copy[key] = this.copyObj(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
};     


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