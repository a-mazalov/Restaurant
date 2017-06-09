var getdata = {a:1111};

var ReserveCard = new Vue({
    el: "#Reserve",
    data: {
//        queryPoint: 'http://d0008482.atservers.net/Felix/reserve.php',
//        queryPoint: 'http://restaurant.atservers.net/php/reserve.php',
        queryPoint: 'http://workproject/www/php/mobileReserve.php',
        reserveObj: {
            date: '',
            time: '',
            name: '',
            lastName: '',
            telephone: '',
            numguest: 1,
            notes: '',
            useBonus: 0,
            bonus: 0
        },
        copyVar: {
            price: 0,
            bonus: 0
        },
        checkbox: false,
        ListOrders: [],
        countDish: 0,
        totalPrice: 0,
        modeBonus: 0,
        messageOrder: "",
        showBlock: false,
        tokenMessage: '',
        snackMessage: "",
        submitted: false
        
  },
    methods: {
        InitForm: function (){
            let Account = Local.Get("Account");
//            console.log(Account);
            
            this.reserveObj.name = Account.Name;
            this.reserveObj.lastName = Account.LastName;
            this.reserveObj.telephone = Account.Telephone;
//            this.reserveObj.bonus = checkBonus(Account.ID_user);
            checkBonus(Account.ID_user,function(output){
                ReserveCard.reserveObj.bonus = output;
                Account.Bonus = output;
                Local.Set("Account", Account);
            });
        },
        ReserveInfo: function(){
//            console.log(this.reserveObj);
//            console.log(getAccID());
//            
//            let Account = getAccID();
//            
//            console.log(Account);
//            console.log(Account["ID_user"]);
            let validInp = validate(ReserveCard.reserveObj);
            console.log(validInp);
            if(validInp["Valid"]){
               
                if(this.reserveObj.useBonus){
                    
                    if(this.modeBonus){
                        this.reserveObj.bonus = this.copyVar.price;
                    }else{
                        this.reserveObj.bonus = this.copyVar.bonus;
                    }
                    
                }
                
            var SendReserve = {"ID_account": getAccID(), "InfoReserve" : this.reserveObj, "Token": this.tokenMessage };

            if( (this.checkbox) && (this.countDish > 0) ){

                SendReserve["Order"] = this.ListOrders;
                console.log(SendReserve);
//                alert("Галочка нажата и количество блюд больше 0")
                
            }else{
                console.log(SendReserve);
//                alert("что-то не выполнено");
            }
            
                this.$http.get(this.queryPoint,  { params: SendReserve } ).then(function(response){

                    console.log(response.data);
    //                alert("Отправлено");
                    this.reserveObj = {
                        date: '',
                        time: '',
                        name: '',
                        lastName: '',
                        telephone: '',
                        numguest: 1,
                        notes: '',
                        useBonus: false,
                        bonus: 0
                    }

    //                let Account = Local.Get("Account");
    //                Account.Bonus = 0;
    //                Local.Set("Account", Account);
                },
                    function (error) {
                    console.log("Ошибка запроса: " + error.data);
                    this.showSnackBar("Ошибка при выполнении операции");
                });
                this.submitted = true;
                
            }else{
                this.showSnackBar("Неверное поле: "+validInp[0]); 
            }
        },
        GetOrders: function(){
//            this.ListOrders = Local.Get("Orders"); 
            this.ListOrders = Order.ListOrders; 
//            console.log(this.ListOrders);
//            console.log(!this.checkbox);

            if (this.ListOrders.length > 0) {
                    this.totalPrice = 0;
                    let price = 0;
                    for (var i = 0; i < this.ListOrders.length; i++) {
                        let DataDish = this.ListOrders[i];
                        price += parseInt( (DataDish.Price_dish * DataDish.Amount) * 100)/100;
                    }
                    
                    this.totalPrice = price.toFixed(2);
                    this.countDish = this.ListOrders.length;
                    this.messageOrder = "Блюда из вашей корзины заказов";
//                console.log("Количество блюд" + this.ListOrders.length);
            } else {
                this.messageOrder = "Вы ничего не добавили к заказу!";
//                console.log("length == 0");
            }
            
            
            console.log(this.ListOrders);
            console.log(this.totalPrice,this.countDish, this.messageOrder);
        },
        useBonusFunc: function(){
            this.totalPrice = parseFloat(this.totalPrice);
//           
//            alert(!this.reserveObj.useBonus);
//            
            if(!this.reserveObj.useBonus){
                this.copyVar.price = this.totalPrice;
                this.copyVar.bonus = this.reserveObj.bonus;
                console.log(this.copyVar);
                
                
                if(this.totalPrice >= this.reserveObj.bonus){
                    this.totalPrice -= this.reserveObj.bonus;
                    this.reserveObj.bonus -= this.reserveObj.bonus;
                    this.modeBonus = 0;
                }
                if(this.totalPrice <= this.reserveObj.bonus){
                    this.reserveObj.bonus = (this.reserveObj.bonus - this.totalPrice);
                    this.totalPrice -= this.totalPrice;
                    this.modeBonus = 1;
                }
                
            }else{
                if(this.totalPrice >= this.reserveObj.bonus){
                    console.log(this.copyVar);
                    this.totalPrice = this.copyVar.price;
                    this.reserveObj.bonus = this.copyVar.bonus;
                }
                if(this.totalPrice <= this.reserveObj.bonus){
                   this.reserveObj.bonus = this.copyVar.bonus;
                   this.totalPrice = this.copyVar.price;
                }
            }
            this.reserveObj.bonus = parseFloat(this.reserveObj.bonus).toFixed(2);
            this.totalPrice = parseFloat(this.totalPrice).toFixed(2);

        },
        CheckInp: function(){
            let input = this.reserveObj;
            let flag = true;
            for (var key in input) {
//                    .trim()
                if( input[key] == "" ){
                    console.log("Пустое значение: " + key);
                    this.showSnackBar("Пустое значение: " + key);
                    flag = false;
                    break;
                }
            }
            return flag;

        },
        showSnackBar(Message) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        },
        submit: function(){
        
        }
    },
    created: function () {
//        this.InitForm();
    }
})

document.addEventListener("deviceready",getTokenC,false);
function getTokenC(){
    FCMPlugin.getToken(function(token){
        window.ReserveCard.tokenMessage = token;
        console.log("Token CL:" + ReserveCard.tokenMessage);
    });
}

flatpickr(".inp-date", {
    enableTime: false,
    minDate: "today",
    maxDate: new Date().fp_incr(14)
});
flatpickr(".inp-time", {
    noCalendar: true,
    enableTime: true,
    time_24hr: true,
});

//$(".inp-date").flatpickr({
//    enableTime: false
//});
//
//$(".inp-time").flatpickr({
//    noCalendar: true,
//    enableTime: true,
//    time_24hr: true,
//});

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

