var getdata = {a:1111};

var ReserveCard = new Vue({
    el: "#Reserve",
    data: {
//        queryPoint: 'http://d0008482.atservers.net/Felix/reserve.php',
        queryPoint: 'http://workprojectmobile/php/reserve.php',
        reserveObj: {
            date: '',
            time: '',
            name: '',
            lastName: '',
            telephone: '',
            numguest: 1,
            notes: ''
        },
        checkbox: false,
        ListOrders: [],
        countDish: 0,
        totalPrice: 0,
        messageOrder: "",
        showBlock: false,
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
            
            
        },
        ReserveInfo: function(){
//            console.log(this.reserveObj);
//            console.log(getAccID());
//            
//            let Account = getAccID();
//            
//            console.log(Account);
//            console.log(Account["ID_user"]);
            if( this.CheckInp() ){
               
        
            var SendReserve = {"ID_account": getAccID(), "InfoReserve" : this.reserveObj };
            
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
                alert("Отправлено");
                
            });
                
                this.submitted = true;
                
            }    
        },
        GetOrders: function(){
//            this.ListOrders = Local.Get("Orders"); 
            this.ListOrders = Order.ListOrders; 
//            console.log(this.ListOrders);
//            console.log(!this.checkbox);

            if (this.ListOrders.length > 0) {
                    this.totalprice = 0;
                    let price = 0;
                    for (var i = 0; i < this.ListOrders.length; i++) {
                        console.log(this.ListOrders[i].Price_dish);
                        price += parseInt(this.ListOrders[i].Price_dish * 100) / 100;
                    }
                    
                    this.totalprice = price.toFixed(2);
                    this.countDish = this.ListOrders.length;
                    this.messageOrder = "Блюда из вашей корзины заказов";
//                console.log("Количество блюд" + this.ListOrders.length);
            } else {
                this.messageOrder = "Вы ничего не добавили к заказу!";
//                console.log("length == 0");
            }
            
            
            console.log(this.ListOrders);
            console.log(this.totalprice,this.countDish, this.messageOrder);
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
        this.InitForm();
    }
})



$(".inp-date").flatpickr({
    enableTime: false
});

$(".inp-time").flatpickr({
    noCalendar: true,
    enableTime: true,
    time_24hr: true,
});

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

