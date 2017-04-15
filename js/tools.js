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
        let data = this.storage.getItem(section);
        return JSON.parse(data);
    }  
    Remove(section){
        this.storage.removeItem(section);
    }
    Clear(section){
        this.storage.clear();
    }
    Check(section){
        if ( (null != this.storage.section) || (undefined != this.storage.section) ){
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
        this.ListOrders = [];
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
var Order = new Orders();
//Order.orders.length;



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
