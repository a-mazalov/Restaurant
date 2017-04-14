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
    RemoveOf(section,data){
        this.storage.setItem(section, JSON.stringify(data));
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
