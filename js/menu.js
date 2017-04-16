
var MenuList = new Vue({
        el: '#MenuList',
        data: {
            //            queryPoint : 'https://jsonplaceholder.typicode.com/posts',
            queryPoint: 'http://workprojectmobile/www/php/menu-query.php',
//            queryPoint: '/php/menu-query.php',
//            queryPoint: 'http://d0008482.atservers.net/Felix/menu-query.php',
            posts: {},
            post: {},
            error: false,
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
                    // Запрос на сервер, получение всех блюд
                    this.posts = JSON.parse(response.data);
                    console.log(this.posts);

                }, function (error) {
                    this.error = true;
//                    alert(error.date);
                    console.log("Ошибка запроса: " + error.data);
                });
                
                
            },
            favorite: function(post){
                //Функция добавления/удаления в список избранного
                
                let IsSearch; //Переменная флаг, найдено/не найдено 
                if (this.listFavorite.length != 0) {
                // Цикл для поиска в массиве избранного, если не найдено помечает переменной IsSearch = true,
                // после чего добавляет в массив
                    for (var i = 0; i < this.listFavorite.length; i++) {
                        if (this.listFavorite[i].ID_dish == post.ID_dish){
                            this.listFavorite.splice(i, 1);
                            this.AddLocalFavorite(this.listFavorite);
                            IsSearch = false;
                            break;
                        }else{
                            IsSearch = true;
                        }
                    }
                    // Добавление в массив если значений небыло найдено
                    if(IsSearch){
                            this.listFavorite.push(post);
                            this.AddLocalFavorite(this.listFavorite);
                    }
                }else {
                    // Если в массиве избранных нет записей, то добавить.
                    this.listFavorite.push(post);
                    this.AddLocalFavorite(this.listFavorite);
                }
            },
            localFavorite: function(){  
                //Если localStorage не пустой, считать данные в лист избранного
                if (('null' != localStorage.Favorite) && (undefined != localStorage.Favorite) ){
                    this.listFavorite = JSON.parse(localStorage.getItem("Favorite"));
                    
                }
                else {
                    this.listFavorite = [];
                }
            },
            AddLocalFavorite: function(listFav){
                // Добавляет массив избранного в localStorage
                localStorage.setItem("Favorite", JSON.stringify(listFav));
            },
            checkFav: function(postFav){
                // Функция проверки записи в списке избранного, изменяет состояние иконки
              for (let i = 0; i < this.listFavorite.length; i++) {
                if (this.listFavorite[i].ID_dish == postFav.ID_dish) {
                    return true;
                }
              }               
            },
            AddOrder: function(item){
                Order.Add(item);
//                alert(Order.ListOrders.length);
            },
            Test: function(){
                Order.Clear();
            }
        },
        created: function () {
            this.getPosts() // Получить все блюда
            this.localFavorite(); // Считывает массив избранного из localStorage
            //this.getSinglePost()  
//            var Order = new Orders();
            
        }
    });
function clearLocal(){
    localStorage.clear();
    console.log("Local storage clean");
}
