var MenuList = new Vue({
        el: '#MenuList',
        data: {
            //            queryPoint : 'https://jsonplaceholder.typicode.com/posts',
            //            queryPoint : '//d0008482.atservers.net/Felix/menu-query.php',
            queryPoint: 'http://workproject/www/php/menu-query.php',
            posts: {},
            post: {},
            error: false,
            i: 0,
            listFavorite: []
        },  
        methods: {

            getPosts: function () {
                //Параметры запроса
                var options = {
                    params: {
                        //_start: 0,
                        //_limit: 1
                    },
                    headers: {
                        //'Content-Type': 'application/json'
                    }
                }
                this.$http.get(this.queryPoint, options).then(function (response) {

                    this.posts = JSON.parse(response.data);
                    //alert(this.posts);
                    console.log(this.posts);

                }, function (error) {
                    this.error = true;
                    console.log("Ошибка запроса: " + error.data);
                });
            },
            favorite: function(post){
                //Функция добавления/удаления в список избранного
                if (this.listFavorite.length != 0) {
                    var index = this.listFavorite.indexOf(post);
                    if(index >= 0){
                        this.listFavorite.splice(index, 1);
                        AddToLocal(this.listFavorite)
                    }
                    else {
                        this.listFavorite.push(post);
                        AddToLocal(this.listFavorite);
                    }
                } else {
                    this.listFavorite.push(post);
                    AddToLocal(this.listFavorite);
                }
            },
            localCard: function(){  
                //Если localStorage не пустой, считать данные в лист избранного
                if (null != localStorage.getItem("Favorite") ){
                    this.listFavorite = JSON.parse(localStorage.getItem("Favorite"));
                    console.log(JSON.parse(localStorage.getItem("Favorite")));
                }
                else {
                    return
                }
            },
            checkFav: function(postFav){
                //Функция проверки записи в списке избранного, изменяет состояние иконки
              var i;
              for (i = 0; i < this.listFavorite.length; i++) {
                if (this.listFavorite[i].ID_dish == postFav.ID_dish) {
                    return true;
                }
              }               
            
//                console.log(postFav in this.listFavorite);    
                
//                let indexFav;
////                try {
//                    var i;
//                    for (i = 0; i < this.listFavorite.length; i++) {
//                        if (this.listFavorite[i].ID_dish == postFav.ID_dish) {
//                            return true;
////                            indexFav = this.listFavorite.indexOf(postFav);
////                            break;
//                        }else{
//                            return false;
//                        }
//                    } 
//                }
//                catch (error){
//                    indexFav = -1;
//                }
//                    if(indexFav < 0){
//                        return false;
//                    }
//                    else {
//                        return true;
//                    }
            }
        },
        created: function () {
                this.localCard();
                this.getPosts()
                //this.getSinglePost()
        }
    });
function AddToLocal(listFav) {
    localStorage.setItem("Favorite", JSON.stringify(listFav));
    console.log("Добавлено");
}
//function localCard(){  
//    listFavorite = JSON.parse(localStorage.getItem("Favorite"));
////    objCards.CountCards = Object.keys(objCards.Card).length;
//        console.log(JSON.parse(localStorage.getItem("Favorite")));
//        console.log(localStorage.getItem("Favorite"));
////        return objCards;
//
//}
function clearLocal(){
    localStorage.clear();
    console.log("Local storage clean");
}

//Vue.component('favorite', {
//    template: '#template-favorite',
//    data: function() {
//        return { };
//    },
//    props: {
//        'name': {
//            type: String,
//            default: 'favorite'
//        },
//        'value': {
//            type: Boolean,
//            default: false
//        },
//        'disabled': {
//            type: Boolean,
//            default: false
//        }
//    },
//    methods: {
//        favorite: function() {
//            if (this.disabled==true) {
//                return;
//            }
//            this.value = !this.value;
//        }
//    }
//});