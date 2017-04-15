Vue.use(VueMaterial);
var Account = new Vue({
    el: "#Account",
    data: {
        window: {
            welcom: true,
            register: false,
            logim: false
        },
        queryPointLogin: 'php/loginIn.php',
//        queryPointLogin: 'http://d0008482.atservers.net/Felix/loginIn.php',
        dataLogin: {
            telephone: '',
            password: ''
        },
        queryPointRegistr: 'http://workprojectmobile/www/php/registrations.php',
//        queryPointRegistr: 'http://d0008482.atservers.net/Felix/registrations.php',
        dataRegister: {
            name: '',
            lastName: '',
            telephone: '',
            password: ''
        },    
        dataAccount: {},
        snackMessage: ""
    },
    methods: {
        loginIn: function(){
            this.$http.get(this.queryPointLogin,  { params: this.dataLogin } ).then(function(response){
            
            console.log(response.data);
            if(response.data != " " ){
                this.dataAccount = JSON.parse(response.data);
                alert("asd");
                this.showSnackBar("Вход успешен");
                
//                let Local = new LocalStore();
                
                Local.Set("Account",this.dataAccount);
                
//                window.localStorage.setItem("Account", JSON.stringify(this.dataAccount));
                window.location = "index.html";
            }else{
                this.showSnackBar("Неверный телефон или пароль!");
            }    
                
            }, function (error) {
                this.showSnackBar("Нет соединения");
                console.log("Ошибка запроса: ");
            });
        },        
        registr: function(){
            this.$http.get(this.queryPointRegistr,  { params: this.dataRegister } ).then(function(response){
            
            });
        },
        log: function (){
            console.log(this.dataLogin);
            console.log(this.dataRegister);
        },
        showSnackBar(Message) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        }
    }

});