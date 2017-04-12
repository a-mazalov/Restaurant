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
        dataAccount: {},
        snackMessage: ""
    },
    methods: {
        loginIn: function(){
            this.$http.get(this.queryPointLogin,  { params: this.dataLogin } ).then(function(response){
            
                if(response.data != " " ){
                    this.dataAccount = JSON.parse(response.data);
                    this.showSnackBar("Вход успешен");
                    window.location = "index.html";
                }else{
                    this.showSnackBar("Неверный телефон или пароль!");
                }    
            }
        },        
        showSnackBar(Message) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        }
    }

});