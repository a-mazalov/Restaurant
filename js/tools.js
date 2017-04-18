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

function Sync(section, mode) {
    let queryPoint = 'http://workprojectmobile/www/php/Sync.php';
    
    let id_Account = Local.Get("Account");
    let dataSync = Local.Get(section);
    let Mode = mode;
    
    let listDish = [];
    for(let i=0; i<dataSync.length; i++){
        listDish[i] = dataSync[i].ID_dish;
    }

    let SectionData = [{"Section":section, "Mode": mode},{"id_Account":id_Account.ID_user}, listDish];
//    Vue.dataDB;
//    console.log(SectionData);
    console.log(id_Account.ID_user);

    
    Vue.http.get(queryPoint, {params: SectionData }).then(function (response) {
        console.log(response.data);

//        queryCallback(JSON.parse(response.data));
        switch(response.data[0]){
            case "Read": Local.Set("Favorite", response.data[1]);  console.log("Switch Read"); break;
            case "Write": console.log("Switch Write"); break;
        }
        

        
//        console.log(JSON.parse(response.data));
        
//        console.log(response.data);
        
//        Local.Set("Favorite",JSON.parse(response.data));
    }, function (error) {
//        this.showSnackBar("Нет соединения");
        console.log("Ошибка запроса: ");
        
    }).finally(function () {
//        DBu = this.dataDB;
    });

}


function queryCallback(result){
    const dataDB = result;
    return dataDB;
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
