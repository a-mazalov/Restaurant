var MenuList = new Vue({
        el: '#MenuList',
        data: {
            //            queryPoint : 'https://jsonplaceholder.typicode.com/posts',
            //            queryPoint : '//d0008482.atservers.net/Felix/menu-query.php',
            queryPoint: 'http://workproject/www/php/menu-query.php',
            posts: {},
            post: {},
            error: false,
            
            listFavorite: { 
                
                5: {
                    dish: 2,
                    checked: true,
                },                
                10: {
                    dish: 5,
                    checked: true,
                }
            
            }
            
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
            favorite: function(params){
                
                
                if ( !this.listFavorite[params] ) {
                    
                    this.listFavorite.push({
                        params:{ checked: true }
                        
                    });
                } else {
                    var index = this.listFavorite.indexOf(Number(params));
                    this.listFavorite.splice(index, 1);
                }
                
                console.log(this.listFavorite);
            }
        },
        created: function () {
                //this.getSinglePost()
                this.getPosts()
        }
    })


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