Vue.use(VueMaterial);

var ReserveCard = new Vue({
    el: "#Reserve",
    data: {
        numguest: 1,
        message: 'Hello Vue!'
  }
})


var DataPicker = $(".inp-date").flatpickr({
    enableTime: false
});

$(".inp-time").flatpickr({
    noCalendar: true,
    enableTime: true,
    time_24hr: true,
});

//var NumGuests = new Vue({
//    el:"#NumGuest",
//    data: {
//        numguest: 1
//    }
//});


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})