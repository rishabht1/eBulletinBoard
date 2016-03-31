var app=require('../server.js');
app.models.uploader.destroyAll();
app.models.posts.destroyAll();
app.models.viewer.destroyAll();
/*async function k(p){
var res;
//res[0]=await app.models.Posts.find({where:{tags:{like:p[0]}}});
for (var j in p){
	//console.log(j)
    res=await app.models.Posts.find({where:{tags:{like:p[0]}}});
}
console.log(res);
}
k(["Pro","programme"]);*/