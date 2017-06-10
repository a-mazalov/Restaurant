

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
            qr: true,
            editor: false,
            reserve: false,
            notificat: false
        },
        servers:{
            menuURL: 'http://restaurant.atservers.net/php/menu-query.php',
            menuURL: 'http://workproject/www/php/menu-query.php',
            reserveURL: "http://restaurant.atservers.net/php/ListReserve.php",
            reserveURL: "http://workproject/www/php/ListReserve.php",
            actionsURL: "http://restaurant.atservers.net/php/actionDB.php",
            actionsURL: "http://workproject/www/php/actionDB.php",
            loadImgURL: "http://workproject/www/php/loadPicture.php",
        },
        listMenu: [],
        errorMenu: false,
        newDish: {
            Title_dish: '',
            Caption_dish: '',
            Category_dish: 'Hot_dishes',
            Price_dish: '',
            Image: false
        },
        viewImg: 'img/food/id_default.jpg',
        deletedItem: '',
        actionMenu: {
            preEdit: [],
            acceptEdit: false,
            cancelEdit: false
        },
        listReserve: [],
        listReserveNew: [],
        listReserveAccept: [],
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
            
        },
        listQRcode: [],
        newQRcode:{
            inpQR: '',
            bonus: '',
            amount: ''
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
                this.errorMenu = true;
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
//                    this.listReserve.splice(deletedItem.index, -1, deletedItem.item);
                });    
            
            }else{
//                this.showSnackBar("Нет изменений");
            }

            this.editMode = false;
    
        },
        previewImg: function(){
            
            var input = document.getElementById("loadpicture");
            
            if( (input.files[0]["type"] === "image/jpeg") || (input.files[0]["type"] === "image/png") || (input.files[0]["type"] === "image/bmp") ){
                oFReader = new FileReader();
                oFReader.onload = function (oFREvent) {
                    adminPanel.viewImg = oFREvent.target.result || window.URL.createObjectURL(fl[0]);
    //                $('.cover-preview').attr('src', oFREvent.target.result || window.URL.createObjectURL(fl[0]));
                }
                if (input.files.length === 0) { return; }
                var oFile = input.files[0];
                oFReader.readAsDataURL(oFile);
            }else{
                this.showSnackBar("Неверный тип изображения");
                document.getElementById("avImg").src='img/food/id_default.jpg';
                this.viewImg = 'img/food/id_default.jpg';
                document.forms.formImg.reset();
//            var input = inpValue;

            }
//            this.src = formData;
        },
        createDish: function(){
//            console.log(this.newDish); 
            var file = document.getElementById('loadpicture').files[0];

            if ( file && (file["type"] === "image/jpeg") || (file["type"] === "image/png") || (file["type"] === "image/bmp") ) {
                this.newDish.Image = true;
            } else {
                this.newDish.Image = false;
            }
            console.log(file);
            
            let infoSend = {"item":this.newDish, "action": "newDish"};
                      
            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
                console.log("Выполнено"); 
                console.log(response.data);
                setImg(response.data);
                this.getMenu();
                
            }, function (error) {
                console.log("Ошибка запроса: " + error.data);
                this.showSnackBar("Ошибка при выполнении операции");
            });
//            
            function setImg(id_dish){
//            
                var newFileName;
                if (file != undefined) {
                    newFileName = "id_"+id_dish.trim()+".jpg";
                }
                
                var formData = new FormData();
                formData.append('file', file, newFileName);
 
                $.ajax({
                    url: "http://workproject/www/php/loadPicture.php",
                    type: 'post',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) { 
//                        console.log(JSON.parse(result)); 
                        let statusImg = JSON.parse(result);
                        if(!statusImg["Status"]){
                            adminPanel.showSnackBar(statusImg["Message"]+" Пересоздайте блюдо");
//                            adminPanel.deleteDish(adminPanel.newDish,id_dish);
                        }
//                        console.log(result); 
                    }
                });
            }
            
            
        },
        deleteDish: function(item,index){
            console.log("delDish");
            this.deletedItem = {
                "index": index,
                "item": item
            };

            delete this.listMenu[item.Category_dish][index];
            this.$forceUpdate();
            
//            console.log(deletedItem);
            
            let infoSend = {"item":item.ID_dish, "action": "deleteDish"};
            console.log(infoSend)
//            this.listMenu.splice(deletedItemю.item.index, 1);
            
            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
                console.log("Выполнено");
                console.log(response.data)
            }, function (error) {
                console.log("Ошибка запроса: " + error.data);
                this.showSnackBar("Ошибка при выполнении операции");
                this.listMenu[item.Category_dish][index] = item;
                this.$forceUpdate();
            });    
        },
        Tchange: function(){
            alert("change");        
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
//                    this.listReserve = JSON.parse(response.data);
                let dataReserve = JSON.parse(response.data);
                for (prop in dataReserve) {
                    if (dataReserve[prop].Status === "new") {
                        this.listReserveNew.push(dataReserve[prop]);
                    }else if(dataReserve[prop].Status === "accept"){
                        this.listReserveAccept.push(dataReserve[prop]);       
                    }
                }
                    console.log(this.listReserveNew);
                    console.log(this.listReserveAccept);
                    
                    
                    
                    
                    
//                    console.log( JSON.parse(response.data) );
                }, function (error) {
                    this.showSnackBar("Ошибка соединения");
                    console.log("Ошибка запроса: " + error.data);
                });
        },
        priceInReserve: function(dishes, bonusCode){
//            console.log(dishes);
            
            let price = 0;
            for (let i = 0;  dishes && i < dishes.length; i++) {
                price += parseInt( (dishes[i].Price_dish * dishes[i].Amount_dish) * 100)/100;
            }
            if(bonusCode > 0){
                price -= bonusCode;
            }
//            console.log("bo" + bonusCode);
//            console.log(price);
            return price.toFixed(2);
            
        },
        actionsDelRes: function(item,index,status){
            console.log("index"+index);
            
            let deletedItem = {
                "index": index,
                "item": item
            };
            
            switch(status){
                case "new": this.listReserveNew.splice(index, 1); break;
                case "accept": this.listReserveAccept.splice(index, 1); break;
            }
            
            let infoSend = {"item":item, "action": "deleteReserve"};
            console.log(infoSend);
            
//            this.listReserve.splice(deletedItem.index, 1);
            
            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
                console.log("Выполнено");
                console.log(response.data)
            }, function (error) {
                console.log("Ошибка запроса: " + error.data);
                this.showSnackBar("Ошибка при выполнении операции");
                
                switch(status){
                    case "new": this.listReserveNew.splice(deletedItem.index, -1, deletedItem.item); break;
                    case "accept": this.listReserveAccept.splice(deletedItem.index, -1, deletedItem.item); break;
                }
            });
//            
        },
        actionAcceptRes: function(item,index){
            this.listReserveNew.splice(index, 1);  
            this.listReserveAccept.splice(0, -1, item);
            
            let infoSend = {"item":item, "action": "acceptReserve"};

            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
                console.log("Выполнено");
//                console.log(response.data)
            }, function (error) {
                console.log("Ошибка запроса: " + error.data);
                this.showSnackBar("Ошибка при выполнении операции");
                this.listReserveNew.splice(index, -1, item);
            });
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
//                "to": "clCIyjDp7hM:APA91bFbwGNKjpeiJjq-H1nTHkv8YXwS2WsaUArL2uwUahGLTKOHWFPKT1gj5T9EkgC0KIlIoMnCLn1TCJXAr82wcKwpbahCOnNFcGmHF_vDJM2zoKAaFnLCxZy-hFwz-DRw1HUTtRVX",
                "data": {
                    "title": this.notification.dataSend.title,
                    "body": this.notification.dataSend.body
                }
            });
    //        var data = JSON.stringify({"to":"/topics/all","data": {"title": "GGSDf", "body": "sfs@!3"}});
            xhttp.send(dataS);

        },
        sendAcceptNotif: function(reserve,answer){
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4) {
                    if (xhttp.status == 200) {
                        var response = JSON.parse(xhttp.responseText);
                        console.log(response);
                        if (response.result == 1) {
//                            adminPanel.notification.errorSend = true;
                        } else {
//                            adminPanel.notification.successSend = true;
                        }
                    } else {
//                        adminPanel.notification.errorSend = true;
                    }
                }
            };
            xhttp.open("POST", this.notification.url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Authorization", "key=" + this.notification.key);
            var dataS = JSON.stringify({
                "to": reserve.TokenMessage,
                "data": {
                    "title": 'Заявка на '+ reserve.Date + ' ' + reserve.Time,
                    "body": answer
                }
            });
            //        var data = JSON.stringify({"to":"/topics/all","data": {"title": "GGSDf", "body": "sfs@!3"}});
            xhttp.send(dataS); 
        },
        
//-------------------Бонус-коды-------------------------------------------
        getListQR: function(){
            let infoSend = {"item": null, "action": "checkListBonus"};

            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
                this.listQRcode = JSON.parse(response.data);
            }, function (error) {
                console.log("Ошибка запроса: " + error.data);
                this.showSnackBar("Ошибка при загрузке списка кодов");
            });     
        },
        createCode: function(codeStr,newBonus){
//            var text = adminPanel.inpQR;
//            var text = "Повелся, ты не оч";
  //do work
            
            var text = codeStr;
            var rst = "";

            var addPoint = function (t) {
                rst +=
                    "<div class='" +
                    (t ? "qrTrue" : "qrFalse") +
                    "'> </div>";
            };

            var newLine = function () {
                rst += "<br/>";
            }
            var code = qrencode.encodeString(text, 0,
                qrencode.QR_ECLEVEL_L,
                qrencode.QR_MODE_8, true);

            var i;
            var j;

            for (i = 0; i < 2; i++) {
                for (j = 0; j < code.length; j++) addPoint(false);
                newLine();
            }

            for (j = 0; j < code.length; j++) {
                addPoint(false);
                addPoint(false);

                for (i = 0; i < code.length; i++)
                    addPoint(code[i][j]);

                addPoint(false);
                addPoint(false);
                newLine();
            }

            for (i = 0; i < 2; i++) {
                for (j = 0; j < code.length; j++) addPoint(false);
                newLine();
            }
//            console.log(rst);
            
            if(newBonus == true){
                document.getElementById("newQR").innerHTML = " ";
                document.getElementById("newQR").innerHTML = rst;
            }else{
                return rst;
            }
            
//                $("#pictureQRCode").html(rst);
            
            
        },
        deleteCode: function(ID_code,index){
            
            let infoSend = {"item":ID_code, "action": "deleteBonusCode"};
            
            this.$http.get(this.servers.actionsURL,  { params: infoSend } ).then(function(response){
//                console.log("Выполнено");
                console.log(response.data);
                this.listQRcode.splice(index, 1);
            }, function (error) {
//                console.log("Ошибка запроса: " + error.data);
                this.showSnackBar("Ошибка при выполнении операции");

            });
        },
//-------------------Вспомогательные функции------------------------------
        сhangeLayer: function(section){
            for(var layer in this.layers){
                if(section == layer){
                    this.layers[layer] = true;
                    this.$forceUpdate();
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
        },
        strBool(value){
            return !!value;
//            switch(type){
//                   case "str": return value === 1 ? "true" : "false";
//                   case "num": return value === "true" ? "1" : "0";
//            }
        },
        str_rand() {
            var result = '';
            var words = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM';
            var max_position = words.length - 1;
            for (i = 0; i < 6; ++i) {
                position = Math.floor(Math.random() * max_position);
                result = result + words.substring(position, position + 1);
            }
            return result;
        }
    },
//-------------------При создании---------------------------            
    created: function(){

    },
    mounted: function(){
        this.getMenu();
        this.getReserve();
        this.getListQR();
        Vue.config.devtools = false;
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


function CallPrint(strid) {
var prtContent = document.getElementById(strid);
var prtCSS = '';
var WinPrint = window.open('','','left=50,top=50,width=800,height =640,toolbar=0,scrollbars=1,status=0');

var print = document.createElement("div");
print.className = "contentpane";
print.setAttribute("id", "print");
print.appendChild(prtContent.cloneNode(true));

WinPrint.document.body.appendChild(print); 

WinPrint.focus();
WinPrint.print();
WinPrint.close();
}
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