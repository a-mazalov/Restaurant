//Vue.use(VueMaterial);
//new Vue({
//    el: "#loader"
//
//});

class LocalStore{
    constructor(){
      this.storage = window.localStorage;
    }
    Set(section,data){
        this.storage.setItem(section, JSON.stringify(data));
    } 
    Get(section){
        
        if(this.Check(section)){
            let data = this.storage.getItem(section);
            return JSON.parse(data);
        }else{
            return [];   
        }
    }  
    Remove(section){
        this.storage.removeItem(section);
    }
    Clear(section){
        this.storage.clear();
    }
    Check(section){
        if ( (undefined == this.storage[section]) ){
            return false;
        }
        else{
            return true;
        }
    }
}
var Local = new LocalStore();

class Orders {
    constructor(){
        this.ListOrders = Local.Get('Orders');
    }
    Add(item){
        this.ListOrders.push(item); 
        Local.Set("Orders",this.ListOrders);
        console.log(this.ListOrders);
    }
    Remove(item,index){
//        let index = this.ListOrders.indexOf(item);
        this.ListOrders.splice(index, 1); //
        Local.Set("Orders",this.ListOrders);
    }
    Clear(){
//        this.ListOrders.splice(0, this.ListOrders.length);
        Local.Remove("Orders");
    }
    
}
const Order = new Orders();
//Order.orders.length;

function Sync() {
    let queryPoint = 'http://workprojectmobile/www/php/Sync.php';
    let dataSync = Local.Get("Favorite");
    Vue.http.get(queryPoint, {params: dataSync}).then(function (response) {
        console.log(response.data);
//        if (response.data != " ") {
//            
//        } else {
////            this.showSnackBar("Неверный телефон или пароль!");
//        }
    }, function (error) {
//        this.showSnackBar("Нет соединения");
        console.log("Ошибка запроса: ");
    });

}


class Snack{
    constructor(){
      this.message = "";
    }
    Show(){
        this.$refs.snackbar.open();
        return this.message;
    }
}

//let store = new Store()
//
//store.set()
