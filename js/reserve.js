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
        queryPoint: 'http://workprojectmobile/www/php/reserve.php',
//        queryPoint: 'http://d0008482.atservers.net/Felix/reserve.php',
        test: 'Menu_table',
        showBlock: false
        
  },
    methods: {
        ReserveInfo: function(){
            console.log(this.reserveObj);
                this.$http.get(this.queryPoint,  { params: this.reserveObj } ).then(function(response){
            
            console.log(response.data);
                
            });
        },
        expandBlock: function(){
//            this.$refs.dishes.$children[0].toggleExpandList();
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

