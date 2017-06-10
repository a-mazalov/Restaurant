var ReserveCard = new Vue({
    el: "#Reserve",
    data: {
        reserveObj: {
            date: '',
            time: '',
            name: '',
            lastName: '',
            telephone: '',
            numguest: 1,
            notes: ''
        },
        queryPoint: 'http://restaurant.atservers.net/php/siteReserve.php',
        queryPoint: 'http://workproject/www/php/siteReserve.php',
        snackMessage: '',
        submitted: false,
        errorSend: true
        
  },
    methods: {
        showSnackBar(Message) {
            this.snackMessage = Message;
            this.$refs.snackbar.open();
        },
        ReserveInfo: function(){
            
            
            let validInp = validate(ReserveCard.reserveObj);
            
            if(validInp["Valid"]){
            
    //            console.log(this.reserveObj);
                this.$http.get(this.queryPoint,  { params: this.reserveObj } ).then(function(response){
                    this.submitted = true;
//                    console.log("Выполнено");
                    this.errorSend = false;
//                    console.log(response.data);

                        this.reserveObj = {date: '', time: '', name: '', lastName: '', telephone: '', numguest: 1, notes: ''};



                }, function (error) {
    //                    this.errorSend = ;
                        this.showSnackBar("Нет соединения с сервером");
                        this.errorSend = true;
                        console.log("Ошибка запроса: " + error.data);
                });
            
            }else{
                this.showSnackBar("Неверное поле: "+validInp[0]); 
            }
        },
        submit: function(){
        
        }
    }
})


//function Send(){
//    
//        $.ajax({
//            url: "http://workproject/www/php/Reserve.php",
//            type: "get",
//            data: ({
//                Test: "menu_table"
//            }),
//            dataType: "html",
//            success: function (data) {
//                //            console.log(data);
////                alert("ok");
//                console.log(data);
//            }
//        });
//    
//}





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
