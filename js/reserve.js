

var ReserveCard = new Vue({
    el: "#Reserve",
    data: {
        date: '',
        time: '',
        name: '',
        lastName: '',
        telefone: '',
        numguest: 1,
        notes: '',
        
        message: 'Hello Vue!'
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

