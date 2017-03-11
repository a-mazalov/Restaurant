

var ReserveCard = new Vue({
    el: "#Reserve",
    data: {
        reserveObj: {
            date: '',
            time: '',
            name: '',
            lastName: '',
            telefone: '',
            numguest: 1,
            notes: ''
        },
        
        message: 'Hello Vue!'
  },
    methods: {
        ReserveInfo: function(){
            console.log(this.reserveObj);
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

