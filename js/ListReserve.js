var ListReserve = new Vue({
        el: '#ListReserve',
        data: {
            //            queryPoint : 'https://jsonplaceholder.typicode.com/posts',
            //            queryPoint : '//d0008482.atservers.net/Felix/menu-query.php',
            queryPoint: 'http://restaurant.atservers.net/php/ListReserve.php',
            ListReserve: [],
            post: {},
            error: false
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

                    this.ListReserve = response.data;
                    //alert(this.posts);
                    console.log(this.ListReserve);

                }, function (error) {
                    this.error = true;
                    console.log("Ошибка запроса: " + error.data);
                });
            }
        },
        created: function () {
            //this.getSinglePost()
            this.getPosts()
        }
    })