var Names=['Jani','Hege','Kai','Abhishek','Wain','sarthak','khandekar'];
var Books = [{
  'name': 'Nexus S',
    'title': 'Fast just got faster with Nexus S.',
    'price': '250',
    'location': 'Ahmedabad',
    'host': 'Chaitanya'
}, {
    'name': 'Nexus S Abhishek',
    'title': 'Fast just got faster with Nexus S.',
    'location': 'Ahmedabad',
    'price': '250',
    'host': 'Chaitanya'
}, {
    'name': 'Motorola XOOM™ with Wi-Fi',
    'title': 'The Next, Next Generation tablet.',
    'location': 'Ahmedabad',
    'price': '250',
    'host': 'Chaitanya'
}, {
    'name': 'Motorola XOOM™ with Wi-Fi',
    'title': 'The Next, Next Generation tablet.',
    'location': 'Ahmedabad',
    'price': '250',
    'host': 'Chaitanya'
}, {
    'name': 'Motorola XOOM™ with Wi-Fi',
    'title': 'The Next, Next Generation tablet.',
    'location': 'Ahmedabad',
    'price': '250',
    'host': 'Chaitanya'
}, {
    'name': 'Motorola XOOM™ with Wi-Fi',
    'title': 'The Next, Next Generation tablet.',
    'location': 'Ahmedabad',
    'price': '250',
    'host': 'Chaitanya'
}];
var nl_like_url = "";
var nl_recent_url = "http://0.0.0.0:3000/api/viewers/recent_nlfeed";
var l_like_url = "";
var l_recent_url = "";
var recent_feed;
//var nl_like_feed = getPosts(nl_like_url);

 // alert(nl_recent_feed[0].name);
//var l_like_feed = getPosts(l_like_url);
//var l_recent_feed = getPosts(l_recent_url);


getPosts(nl_recent_url,function(arr) {
     recent_feed = arr.res;
     //console.log(recent_feed);
     //console.log(Books);
   });

//var timeout_time=1000;

function getPosts(url,cb){

  var xmlhttp = new XMLHttpRequest();
  var posts;

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr=JSON.parse(xmlhttp.responseText);
            cb(myArr);
            // alert(myArr.res[0].name);
            // alert("...................");
            //return myArr.res;
          //posts = myArr.res;
          //alert("Hi i'm Myarr poster:"+myArr.res);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();



  // alert(posts.res[0].name);
  // return ;
}

var app = angular.module("abhishek_abcd", []);
app.controller("abhishekctrl", function($scope){
	$scope.names=Names;
	$scope.books=Books;
	//$scope.nl_like_feed=nl_like_feed;
	$scope.nl_recent_feed=recent_feed;
	//$scope.l_like_feed=l_like_feed;
	//$scope.l_recent_feed=l_recent_feed;
  getPosts(nl_recent_url,function(arr){
    $scope.nl_recent_feed=arr.res;
    console.log($scope.nl_recent_feed);
  })
  setTimeout(function(){
    $scope.$apply(function(){
    //alert("apply called");
    });
  },100);
  console.log($scope.nl_recent_feed);	

  $scope.getNumber = function(numb){
    if (numb == null){
      return [];
    }
    var n = Math.floor(numb/4);
    var rem = numb % 4;
    if (rem > 0) {
      n = n ;
    }
    console.log(numb);
    console.log(rem);
    console.log(n);
    return new Array(n);
  }

});



app.directive("w3TestDirective", function() {
    return {
        template : "<h1>Made by a directive!</h1>"
    };
});
