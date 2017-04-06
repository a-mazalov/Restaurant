var MenuList = new Vue({
        el: '#MenuList',
        data: {
            //            queryPoint : 'https://jsonplaceholder.typicode.com/posts',
            //            queryPoint : '//d0008482.atservers.net/Felix/menu-query.php',
            queryPoint: 'http://workproject/www/php/menu-query.php',
            posts: {},
            post: {},
            error: false,
            
            listFavorite: []
            
        },  
        methods: {

            getPosts: function () {
                //                Параметры запроса
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
            fav: function(post){
                var index = this.listFavorite.indexOf(post);
                    if(index >= 0){
                        return false;
                    }
                    else {
                        return true;
                    }
            },
            favorite: function(post){
                //Функция добавления/удаления в список избранного
                if (this.listFavorite.length != 0) {
                    var index = this.listFavorite.indexOf(post);
                    if(index >= 0){
                        this.listFavorite.splice(index, 1);
                        return false;
                    }
                    else {
                        this.listFavorite.push(post);
                        return true;
                    }
                } else {
                    this.listFavorite.push(post);
                    return true;
                }
        }},
        created: function () {
                //this.getSinglePost()
                this.getPosts()
        }
    });


Vue.component('favorite', {
    template: '#template-favorite',
    data: function() {
        return { };
    },
    props: {
        'name': {
            type: String,
            default: 'favorite'
        },
        'value': {
            type: Boolean,
            default: false
        },
        'disabled': {
            type: Boolean,
            default: false
        }
    },
    methods: {
        favorite: function() {
            if (this.disabled==true) {
                return;
            }
            this.value = !this.value;
        }
    }
});