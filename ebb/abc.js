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
var l_like_url = "http://0.0.0.0:3000/api/viewers/like_feed?id=";
var l_recent_url = "";
var debate_url = "http://0.0.0.0:3000/api/uploaders/Debate/posts";

var recent_feed;
var debate_feed;
//var nl_like_feed = getPosts(nl_like_url);

 // alert(nl_recent_feed[0].name);
//var l_like_feed = getPosts(l_like_url);
//var l_recent_feed = getPosts(l_recent_url);

/***********************************NOT LOGIN RECENT FEED***********************************/
getPosts(nl_recent_url,function(arr) {
     recent_feed = arr.res;
     //console.log(recent_feed);
     //console.log(Books);
   });

/***********************************DEBATE FEED***********************************/
getPosts(debate_url,function(arr){
  debate_feed=arr;
  console.log("Hi i'm debate feed");
  console.log(debate_feed);
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

var app = angular.module("abhishek_abcd", ['ngCookies']);
app.controller("abhishekctrl",function($scope){
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

  $scope.getNumber = function(numb){
    if (numb == null){
      return [];
    }
    var n = Math.floor(numb/4);
    var rem = numb % 4;
    if (rem > 0) {
      n = n ;
    }
    console.log("The length is "+numb);
    //console.log(rem);
    console.log("The quotient is "+n);
    return new Array(n);
  }

  $scope.getRem = function(num){
    if(num == null){
      return 0;
    }
    var r = num % 4;
    console.log("kuch aur "+num+" The remainder is "+r);
    return r;
  }

  setTimeout(function(){
    $scope.$apply(function(){
    //alert("apply called");
    });
  },100);
  console.log($scope.nl_recent_feed);	

  


});



app.directive("w3TestDirective", function() {
    return {
        template : "<h1>Made by a directive!</h1>"
    };
});


app.controller("loginctrl",['$cookies',function($scope,$cookies){
  $scope.userName='';
  $scope.pass='';
  $scope.show = function(){
    alert("The credentials are :" + $scope.userName+" "+$scope.pass);
    var xmlhttp = new XMLHttpRequest();
    var url = "http://0.0.0.0:3000/api/viewers/login?id="+$scope.userName+"&password="+$scope.pass;
    var result;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              var myArr=JSON.parse(xmlhttp.responseText);
              if(myArr.res=="wrong"){
                alert("Wrong credentials");
              }else{
                $cookies.user=$scope.userName;
                alert("congrats u have successfully logged in"+$cookies.user);
              }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  };



}]);

app.controller("debate",function($scope){
  
  getPosts(debate_url,function(arr){
  $scope.dfeed=arr;
  
});

  $scope.checkChutiyapa = function(num){
    console.log(num.length);
    return num;
  };
  
  setTimeout(function(){
    $scope.$apply(function(){
    //alert("apply called");
    });
  },1000);

  console.log($scope.dfeed);

});
