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
        showSnackBar(Message) {
          this.snackMessage = Message;    
          this.$refs.snackbar.open();
        },
        accFavorite(){
            if (null != localStorage.getItem("Favorite") ){
                this.accListFavorite = JSON.parse(localStorage.getItem("Favorite"));
            }
            else {
                return
            }
        },   
        removeFav: function (item) {
        this.indexLastItem = this.accListFavorite.indexOf(item);
                console.log(this.indexLastItem);
                this.removedItem = item;
                this.accListFavorite.splice(this.indexLastItem, 1);
                localStorage.setItem("Favorite", JSON.stringify(this.accListFavorite));
                this.showSnackBar("Запись удалена");
        },
        returnRemoveFav: function(){
            this.accListFavorite.splice(this.indexLastItem,-1,this.removedItem);
            localStorage.setItem("Favorite", JSON.stringify(this.accListFavorite));
            this.$refs.snackbar.close();
        }
    },
    created: function(){
        this.accFavorite();
    }

});