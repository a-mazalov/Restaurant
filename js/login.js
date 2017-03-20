Vue.use(VueMaterial);
var Account = new Vue({
    el: "#Account",
    data: {
        window: {
            welcom: true,
            register: false,
            logim: false
        },
        dataLogin: {
            telephone: '',
            password: ''
        },
        dataRegister: {
            name: '',
            lastname: '',
            telephone: '',
            password: ''
        }
    },
    methods: {
        log: function (){
            console.log(this.dataLogin);
            console.log(this.dataRegister);
        }                  
    }

});