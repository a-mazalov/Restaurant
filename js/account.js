Vue.use(VueMaterial);
var Account = new Vue({
    el: "#Account",
    data: {
        window: {
            welcom: true,
            register: false,
            logim: false
        },
        queryPointLogin: 'http://workprojectmobile/www/php/loginIn.php',
        dataLogin: {
            telephone: '',
            password: ''
        },
        queryPointRegistr: 'http://workprojectmobile/www/php/registrations.php',
        dataRegister: {
            name: '',
            lastName: '',
            telephone: '',
            password: ''
        }
    },
    methods: {
        loginIn: function(){
            this.$http.get(this.queryPointLogin,  { params: this.dataLogin } ).then(function(response){
            
                console.log(response.data);
                
            });
        },        
        registr: function(){
            this.$http.get(this.queryPointRegistr,  { params: this.dataRegister } ).then(function(response){
            
                console.log(response.data);
                
            });
        },
        log: function (){
            console.log(this.dataLogin);
            console.log(this.dataRegister);
        }            
    }

});