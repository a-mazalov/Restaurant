
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
    Clear(){
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

        let SearchItem;
        
        //Поиск уже имеющуюся записи
        for (let i = 0; i < this.ListOrders.length; i++) {
            if (this.ListOrders[i].ID_dish == item.ID_dish) {
                    //Если запись есть, записать ее индекс
                    SearchItem = i;
                break;
            } else {
                SearchItem = -1;
            }
        }
        
        if ( SearchItem > -1 ){
            this.ListOrders[SearchItem].Amount += 1;
        }
        else{   
            //Если записи небыло, установить количество = 1;
            item.Amount = 1;
            this.ListOrders.push(item); 
        }
        //Запись в хранилище
        Local.Set("Orders",this.ListOrders);
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
//    let queryPoint = 'http://restaurant.atservers.net/php/Sync.php';
    let queryPoint = 'http://workproject/www/php/Sync.php';
    
    let id_Account = Local.Get("Account");
    let dataSync = Local.Get(section);
    let Mode = mode;
    
    let listDish = [];
    for(let i=0; i<dataSync.length; i++){
        listDish[i] = dataSync[i].ID_dish;
    }

    let SectionData = [{"Section":section, "Mode": mode},{"id_Account":id_Account.ID_user}, listDish];
//    console.log(SectionData);
   
    console.log(id_Account.ID_user);

    
    Vue.http.get(queryPoint, {params: SectionData }).then(function (response) {
        
    
        switch(response.data[0]){
            case "Count": 
                console.log("Count" + response.data[1] + "Local" + dataSync.length); 
                Account.$data.countLocalFav = dataSync.length;
                Account.$data.countServerFav = response.data[1];
                break;
            case "Read": 
                Account.$data.accListFavorite = response.data[1];
                Local.Set(section,response.data[1])
                console.log(response.data[1]);
//                Local.Set("Favorite", response.data[1]);  
                console.log("Switch Read"); 
                break;
            case "Write": 
                console.log("Switch Write"); break;
        }
//        console.log(JSON.parse(response.data));
//        console.log(response.data);
//        Local.Set("Favorite",JSON.parse(response.data));
    }, function (error) {
        console.log("Ошибка запроса: ");
    });
//    console.log(Account.$data.countServerFav = dataDB.length);
}


function getAccID(){
    let Account = Local.Get("Account");

//    console.log(isEmpty(Account));
    
    
    if( !isEmpty(Account) ) {
        return Account.ID_user;
    }else{
        console.log("Ошибка ID Аккаунта");
        return 
    }
////    
}

function checkBonus(account_id,handldata){
    
//    let actionsURL = "http://restaurant.atservers.net/php/actionDB.php";
    let actionsURL = "http://workproject/www/php/actionDB.php";
    
    let infoSend = {"item": account_id, "action": "checkBonus"};

    Vue.http.get(actionsURL,  { params: infoSend } ).then(function(response){
        console.log("Выполнено"); 
        let responseData = JSON.parse(response.data);
        responseData = responseData > 0 ? responseData : 0;
        handldata(responseData);
    }, function (error) {
        console.log("Ошибка запроса: " + error.data);
//        this.showSnackBar("Ошибка при выполнении операции");
//                    this.listReserve.splice(deletedItem.index, -1, deletedItem.item);
    });   
}


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


var networkStatus = false;
document.addEventListener("online", onOnline, false);

function onOnline() {
    networkStatus = true;
    Account.networkCheck(true);
}

document.addEventListener("offline", onOffline, false);

function onOffline() {
    networkStatus = false;
    Account.networkCheck(false);
}

function checkConnection() {
    var networkState = navigator.connection.type;
}


class Snack{
    constructor(msg){
      this.message = msg;
    }
    Show(){
        this.$refs.snackbar.open();
        return this.message;
    }
}

function TestF(){
    alert('Test function');
    console.log('Test function');
}
//let store = new Store()
//
//store.set()
