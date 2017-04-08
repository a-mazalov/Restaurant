var getdata = {a:1111};

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
        queryPoint: 'http://workproject/www/php/reserve.php',
        test: 'Menu_table',
        
  },
    methods: {
        ReserveInfo: function(){
            console.log(this.reserveObj);
                this.$http.get(this.queryPoint,  { params: this.reserveObj } ).then(function(response){
            
            console.log(response.data);
                
            });
        },
        submit: function(){
        
        }
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

