Vue.use(VueMaterial);
var OrdersList = new Vue({
    el: "#Orders",
    data: {
        ListOrders: [],
        totalprice: 0,
        indexLastItem: "",
        removedItem: {},
        snackMessage: "",
        btnSnack: false
    },
    methods: {
        showSnackBar(Message, funcBtn, vs) {
            this.btnSnack = false;
            this.snackMessage = Message;
            this.$refs.snackbar.open();
            this.$refs.snackbar.options = funcBtn;
            this.btnSnack = vs;
        },
        LocalOrders(){
            this.ListOrders = Order.ListOrders;
            console.log(this.ListOrders);
        }, 
        checkAvailableDish: function(){
            this.showSnackBar("Проверка блюд..",null,false);
//            location.href='reserve.html';
             //Оповещение
//            this.ListOrders
//            let actionsURL = "http://restaurant.atservers.net/php/actionDB.php";
            let actionsURL = "http://workproject/www/php/actionDB.php";

            //Номера блюд в корзине
            let numDish = [];
            for(ordItem in this.ListOrders){
                numDish.push(this.ListOrders[ordItem]["ID_dish"]);
            }
//            console.log(numDish);
            
                let infoSend = {"item": numDish, "action": "checkMenu"};
            
            let chgDish = false;
                this.$http.get(actionsURL,  { params: infoSend } ).then(function(response){
                    console.log("Выполнено"); 
//                    console.log(response.data); 
                    console.log(JSON.parse(response.data));
//                    console.log(OrdersList.ListOrders);
//                    
                    let checkMenu = JSON.parse(response.data);
                    
                    
                    
                    for(ordItem in OrdersList.ListOrders){
                        
                        if(OrdersList.ListOrders[ordItem]["DateСhange"] < checkMenu[ordItem]["DateСhange"] ){
                            
                            
                            let amountDish = OrdersList.ListOrders[ordItem]["Amount"];
                            checkMenu[ordItem]["Amount"] = amountDish;
                            this.ListOrders.splice(ordItem,1,checkMenu[ordItem]);
//                            OrdersList.showSnackBar("Некоторые блюда изменились, обновите меню",null, false);
//                            this.ListOrders.splice(ordItem, 1); //Удаление элемента
                            this.totalPrice();
                            Local.Set("Orders",this.ListOrders); 
                            this.openDialog('dialog5');

                            
                        }else{
                            console.log(checkMenu[ordItem]["ID_dish"] + "Not changes");
                            location.href='reserve.html';
//                            location.href='reserve.html';
                        }

                    }
 
                }, function (error) {
                    console.log("Ошибка запроса: " + error.data);
                    
                    this.showSnackBar("Ошибка при выполнении операции",null, false);
//                    this.listReserve.splice(deletedItem.index, -1, deletedItem.item);
                }); 
            
            if(chgDish){
               
            }
    
        },
        Plus: function(item,index){
            this.ListOrders[index].Amount += 1;
            Local.Set("Orders",this.ListOrders); 
            this.totalPrice();
        },
        Minus: function(item,index){
            if(this.ListOrders[index].Amount > 1){   
                this.ListOrders[index].Amount -= 1;
                Local.Set("Orders",this.ListOrders);  
                this.totalPrice();
            }
        },
        totalPrice: function(){
            this.totalprice = 0;
            let price = 0;
            for (var i = 0; i < this.ListOrders.length; i++) {
//                console.log(this.ListOrders[i].Price_dish);
                let DataDish = this.ListOrders[i];
                price += parseInt( (DataDish.Price_dish * DataDish.Amount) * 100)/100;
            }
            this.totalprice = price.toFixed(2);
        },
        removeOrd: function (item) {
            this.indexLastItem = this.ListOrders.indexOf(item);
            this.removedItem = item; //Копия удаляемого элемента  
            this.ListOrders.splice(this.indexLastItem, 1); //Удаление элемента
            //Перезапись списка избранного
            Local.Set("Orders",this.ListOrders); 
            this.showSnackBar("Запись удалена",this.returnRemoveOrd,true); //Оповещение
            this.totalPrice();
        },
        returnRemoveOrd: function(){ //Возвращает последний удаленный элемент
            
            this.ListOrders.splice(this.indexLastItem,-1,this.removedItem);
            Local.Set("Orders",this.ListOrders);
            this.$refs.snackbar.close();
            this.totalPrice();
        },
        deleteOrd: function(){
            this.ListOrders = [];
            Local.Remove("Orders");
            this.totalprice = 0;
        },            
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
    },
    created: function(){
        this.LocalOrders();
        this.totalPrice();
        
    }
});