Vue.use(VueMaterial);

Vue.material.registerTheme({

});


var Account = new Vue({
    el: "#Account",
    data: {
        infoAccount: [],
        accListFavorite: [],
        indexLastItem: "",
        removedItem: {},
        remItmsCheck: "",
        snackMessage: "",
        DelayDel: true,
        loadServer: false,
        serverFav: [],
        countServerFav: 0,
        countLocalFav: 0,
        groupName: '',
        inpCreate: false,
        customMenu: {},
        deferDisabled: true
    },
    methods: {
        showSnackBar(Message, btn) {
                this.snackMessage = Message;
                this.$refs.snackbar.open();
            },
            getInfAccount: function () {
                this.infoAccount = Local.Get("Account");
                console.log(this.infoAccount);
            },
            accFavorite() {
                if (window.localStorage.Favorite) {
                    this.accListFavorite = Local.Get("Favorite");
                } else {
                    return
                }
            },
            removeFav: function (item) {
                this.remItmsCheck = "favorite";

                this.indexLastItem = this.accListFavorite.indexOf(item);
                //            console.log(this.indexLastItem);
                this.removedItem = item; //Копия удаляемого элемента 

                this.accListFavorite.splice(this.indexLastItem, 1); //Удаление элемента

                //Перезапись списка избранного
                Local.Set("Favorite", this.accListFavorite);
                this.showSnackBar("Запись удалена"); //Оповещение
            },
            returnRemoveFav: function () { //Возвращает последний удаленный элемент

                this.accListFavorite.splice(this.indexLastItem, -1, this.removedItem);
                Local.Set("Favorite", this.accListFavorite);
                this.$refs.snackbar.close();
            },
            deleteFav: function () {
                this.accListFavorite = [];
                Local.Remove("Favorite");
            },
            CheckFavServ: function () { //выгрузка данных о локальном и серверном хранилище
                Sync("Favorite", "Count");
            },
            Btn: function () {
                setTimeout(function () {
                    if (this.countServerFav == 0) {
                        this.loadServer = true;
                    } else {
                        this.loadServer = false;
                    }
                }, 2000);
                return this.loadServer;
            },
            SyncFavRead: function () {
                Sync("Favorite", "Read");
                Local.Set("Favorite", this.serverFav);
            },
            SyncFavWrite: function () {
                Sync("Favorite", "Write");

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
            LoginOut: function () {
                Local.Remove("Account");
                window.location = "authorization.html";
            },
            localCustomGroup: function(){
                if (window.localStorage.CustomGroup) {
                    this.customMenu = Local.Get("CustomGroup");
                } else {
                    return
                }
                
            },
            createGroup: function () {
                this.customMenu[this.groupName] = new Array();
                this.inpCreate = false;
                this.groupName = '';
                Local.Set("CustomGroup", this.customMenu);
            },
            deleteGroup: function(key){
                delete this.customMenu[key];
//                this.checkValues()
                this.$forceUpdate();
                Local.Set("CustomGroup", this.customMenu);
            },
            TimerDelete: function(){
                
//                $refs.menu.open
//                alert("asd");
//                this.$refs.menuGroup.open();
                this.DelayDel = true;
                setTimeout(function(){
                    Account.DelayDel = false; 
                },2000);
//                this.$forceUpdate();
            },
            checkValues: function(key){
                let status = isEmpty(this.customMenu[key]);  
                return status;
                
            },
            addToGroup: function (key, item) {
                this.customMenu[key].push(item);
                this.$forceUpdate();
                Local.Set("CustomGroup", this.customMenu);
            },
            removeItemGroup: function (index, key) {
                this.remItmsCheck = "group";

                this.lastkey = key;
                this.indexLastItem = index;
                this.removedItem = this.customMenu[key][index]; //Копия удаляемого элемента  
                this.customMenu[key].splice(index, 1); //Удаление элемента
                //Перезапись списка избранного
                //            Local.Set("Orders",this.ListOrders);
                this.showSnackBar("Запись удалена"); //Оповещение
                Local.Set("CustomGroup", this.customMenu);
            },
            returnItemGroup: function () { //Возвращает последний удаленный элемент

                this.customMenu[this.lastkey].splice(this.indexLastItem, -1, this.removedItem);
//                Local.Set("Orders", this.ListOrders);
                this.$refs.snackbar.close();
                this.$forceUpdate();
                Local.Set("CustomGroup", this.customMenu);

            },
            removedItems: function () {

                switch (this.remItmsCheck) {
                    case "group":
                        this.returnItemGroup();
                        break;
                    case "favorite":
                        this.returnRemoveFav();
                        break;
                }
            },
            addGroupToOrder: function(key){
                
                for(item in this.customMenu[key]){
                    Order.Add(this.customMenu[key][item]);
                }
                
                
//                console.log(this.customMenu[key]);
//                Order.Add(this.customMenu[key]);
            }

    },
    created: function () {
        //        let Local = new LocalStore();
        this.accFavorite();
        this.localCustomGroup();
        this.getInfAccount();
    },
    mounted(){        
        this.$material.inkRipple = false;
    }

});