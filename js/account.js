Vue.use(VueMaterial);



var Child = {
  template: '<div>Пользовательский компонент22!</div>'
};

var Account = new Vue({
    el: "#Account",
    data: {
        infoAccount: [],
        accListFavorite: [],
        indexLastItem: "",
        removedItem: {},
        snackMessage: "",
        loadServer: false,
        serverFav: [],
        countServerFav: 0,
        countLocalFav: 0,
        groupName: '',
        inpCreate: false,
        customMenu: {
            it: [
            {
                ID_dish: 2
            },
            {
                ID_dish: 56
            }
            ]
        }
    },
    methods: {        
        showSnackBar(Message,btn) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        },
        getInfAccount: function(){
            this.infoAccount = Local.Get("Account"); 
            console.log(this.infoAccount);
        },
        accFavorite(){
            if (window.localStorage.Favorite){
                this.accListFavorite = Local.Get("Favorite");
            }
            else {
                return 
            }
        },   
        removeFav: function (item) {
        this.indexLastItem = this.accListFavorite.indexOf(item);
//            console.log(this.indexLastItem);
            this.removedItem = item; //Копия удаляемого элемента 
            
            this.accListFavorite.splice(this.indexLastItem, 1); //Удаление элемента
            
            //Перезапись списка избранного
            Local.Set("Favorite",this.accListFavorite);
            
//            window.localStorage.setItem("Favorite", JSON.stringify(this.accListFavorite)); 
            
            this.showSnackBar("Запись удалена"); //Оповещение
        },
        returnRemoveFav: function(){ //Возвращает последний удаленный элемент
        this.accListFavorite.splice(this.indexLastItem,-1,this.removedItem);
            Local.Set("Favorite",this.accListFavorite);
//            window.localStorage.setItem("Favorite", JSON.stringify(this.accListFavorite));
            this.$refs.snackbar.close();
        },
        deleteFav: function(){
            this.accListFavorite = [];
            Local.Remove("Favorite");
//            window.localStorage.setItem("Favorite", null);
        },
        CheckFavServ: function(){ //выгрузка данных о локальном и серверном хранилище
            Sync("Favorite","Count");
//            this.countLocalFav = Local.Get("Favorite").length;
//            console.log(Local.Get("Favorite").length);
        },
        Btn: function(){
            setTimeout(function(){
                if (this.countServerFav == 0) {
                    this.loadServer = true;
                } else {
                    this.loadServer = false;
                }
            }, 2000);    
            return this.loadServer;
        },
        SyncFavRead: function(){
            Sync("Favorite","Read");
            Local.Set("Favorite",this.serverFav);
//            console.log(this.serverFav);
        },        
        SyncFavWrite: function(){
            Sync("Favorite","Write"); 
            alert("asd");

        },
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        onOpen() {
            console.log('Opened');
        },
        onClose(type) {
            console.log('Closed', type);
        },
        LoginOut: function(){
            Local.Remove("Account");    
//            window.localStorage.setItem("Account", null);
//            window.location = "authorization.html";
            window.location = "authorization.html";
        }
    },
    components: {
    // <my-component> будет доступен только в шаблоне родителя
    'my-component': Child
    },
    created: function(){
//        let Local = new LocalStore();
        this.accFavorite();
        this.getInfAccount();
    }

});



