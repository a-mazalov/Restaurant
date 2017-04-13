Vue.use(VueMaterial);
var Account = new Vue({
    el: "#Account",
    data: {
        accListFavorite: [],
        indexLastItem: "",
        removedItem: {},
        snackMessage: ""
    },
    methods: {        
        showSnackBar(Message,btn) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        },
        accFavorite(){
            if (null != window.localStorage.getItem("Favorite") ){
                this.accListFavorite = JSON.parse(localStorage.getItem("Favorite"));
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
            
            window.localStorage.setItem("Favorite", JSON.stringify(this.accListFavorite)); //Перезапись списка избранного
            
            this.showSnackBar("Запись удалена"); //Оповещение
        },
        returnRemoveFav: function(){ //Возвращает последний удаленный элемент
            
            this.accListFavorite.splice(this.indexLastItem,-1,this.removedItem);
            window.localStorage.setItem("Favorite", JSON.stringify(this.accListFavorite));
            this.$refs.snackbar.close();
        },
        deleteFav: function(){
            this.accListFavorite = [];
            window.localStorage.setItem("Favorite", null);
        }
    },
    created: function(){
        this.accFavorite();
    }

});