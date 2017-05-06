//var func = function(){
//    var i = 10;
//    return function(){
//        return i;
//    }
//};
//
//var anfunc = function(){
//    var i = 20;
//    console.log(func()());
//};
//
//anfunc();

//var counter = (function() {
//    var count = 0;
//    return function(num) {
//        count = num !== undefined ? num : count;
//        return count++;
//    }
//} () );
//
//console.log(counter());
//console.log(counter());
//console.log(counter(123));
//console.log(counter());

//var counter = function(num){
//    counter.count = num !== undefined ? num : counter.count;
//    return counter.count ++;
//}
//
//console.info(counter);
//console.log(counter());
//console.log(counter(4));
//console.log(counter());


//
//function makeCounter() {
//    
//    function counter() {
//        console.log("level2");
//        
//        function clevel3(){
//            console.log("level3");
//            
//                function clevel4(){
//                    console.log("level4");
//                }
//            return clevel4;
//        }
//        
//        return clevel3;
////        return counter.count++;
//    }
////    counter.count = 1;
//    return counter;
//}
//
//console.log( makeCounter()()()() );
//
////var c = makeCounter;
////console.log( c() );



//-----------------------------------------

v 



