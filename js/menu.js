var MenuList = new Vue({
        el: '#MenuList',
        data: {
            //            queryPoint : 'https://jsonplaceholder.typicode.com/posts',
            //            queryPoint : '//d0008482.atservers.net/Felix/menu-query.php',
            queryPoint: 'http://workproject/www/php/menu-query.php',
            posts: {},
            post: {}

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

//                    if()
                    this.posts = JSON.parse(response.data);
                    //alert(this.posts);
                    console.log(this.posts);

                }, function (error) {
                    console.log("Ошибка запроса: " + error.data);
                });
            }
        },
        created: function () {
            //this.getSinglePost()
            this.getPosts()
        }
    })