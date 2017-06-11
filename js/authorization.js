Vue.use(VueMaterial);
var Account = new Vue({
    el: "#Account",
    data: {
        windowBlock: {
            network: false,
            welcom: false,
            register: false,
            logim: false
        },
//        queryPointLogin: 'http://workprojectmobile/www/php/loginIn.php',
//        queryPointLogin: 'http://restaurant.atservers.net/php/loginIn.php',
        queryPointLogin: 'http://workproject/www/php/loginIn.php',
        dataLogin: {
            telephone: '',
            password: ''
        },
//        queryPointRegistr: 'http://restaurant.atservers.net/php/registrations.php',
        queryPointRegistr: 'http://workproject/www/php/registrations.php',
//        queryPointRegistr: 'http://d0008482.atservers.net/Felix/registrations.php',
        dataRegister: {
            name: '',
            lastName: '',
            telephone: '',
            password1: '',
            password2: ''
        },    
        dataAccount: {},
        snackMessage: ""
    },
    methods: {
        loginIn: function(){
            
            if(checkConnection()){
            
                let validInp = validate(Account.dataLogin);


                if(validInp["Valid"]){
                    this.showSnackBar("Вход...");
                    this.$http.get(this.queryPointLogin,  { params: this.dataLogin } ).then(function(response){
                    if(response.data != " " ){
                        this.dataAccount = JSON.parse(response.data);
                        Local.Set("Account",this.dataAccount);
            //                this.showSnackBar("Вход успешен");
                        window.location = "index.html";
                    }else{
                        this.showSnackBar("Неверный телефон или пароль!");
                    }    
                    }, function (error) {
                        this.showSnackBar("Нет соединения");
                        console.log("Ошибка запроса: ");
                    });
                }else{
                    this.showSnackBar("Неверное поле: "+validInp[0]); 
                }
                
            }else{
                this.showSnackBar("Нет интернет соединения!");
            } 
        },        
        registr: function(){
            
            if(checkConnection()){

                let validInp = validate(Account.dataRegister);
                if(validInp["Valid"]){

                    if(this.dataRegister.password1 == this.dataRegister.password2){
                        this.showSnackBar("Регистрация...");
                        this.$http.get(this.queryPointRegistr,  { params: this.dataRegister } ).then(function(response){ 
                            let IDnewAcc = response.data;
                            
                Local.Set("Account",{"Telephone":Account.dataRegister.telephone,
                                     "Name":Account.dataRegister.name,
                                     "LastName":Account.dataRegister.lastName,
                                     "Bonus":0,
                                     "ID_user":IDnewAcc.trim()
                                });
                        
                        
                            window.location.href="index.html";
                        }, function (error) {
                            this.showSnackBar("Ошибка запроса");
                            console.log(error);
                        });
                        
                    }else{
                        this.showSnackBar("Пароли не сопадают");
                    }
                }else{
                    this.showSnackBar("Неверное поле: "+validInp[0]); 
                }
            
            }else{
                this.showSnackBar("Нет интернет соединения!");
            }    
        },
        showSnackBar(Message) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        },
        networkCheck: function(networkStatus){
            //если подключение есть тогда показать приветствие
            this.windowBlock.network = networkStatus;
            if(this.windowBlock.network){
                this.windowBlock.welcom = true;
            }else{
                this.windowBlock.welcom = false;
            }

//            this.windowBlock.network = networkStatus;
//            console.log(this.windowBlock.network + "tools: "+networkStatus);
        },
        navigation: function(){
            if ( !isEmpty(Local.Get("Account")) ){
                window.location.href="index.html";
            }
        }
    },
    created: function () {
        this.navigation();
//       if(this.network = checkConnection() ){
//           this.welcom = true;
//       }else{
//           this.welcom = false;
//       }
    }
});


//var networkStatus = false;
document.addEventListener("online", onOnline, false);

function onOnline() {
//    networkStatus = true;
    Account.networkCheck(true);
}

document.addEventListener("offline", onOffline, false);

function onOffline() {
//    networkStatus = false;
    Account.networkCheck(false);
}