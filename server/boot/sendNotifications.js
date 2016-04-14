var app=require('../server.js')
//mail=app.models.Email;
var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
async function deletePosts(){
	app.models.Posts.destroyAll({starDate:{lte:Date.now-10*DAY_IN_MILLISECONDS}})
	setTimeout(deletePosts,DAY_IN_MILLISECONDS);
}
async function sendMail(){
	console.log("hello");
	var Uploaders=await app.models.Uploader.find();
	//var Viewer=await app.models.Viewer.find();
	//var Posts=await app.models.Posts.find();
	console.log(Uploaders)
	for (var i=0;i<Uploaders.length;i++){
		console.log('hi')
		var posts=await app.models.posts.find({where:{and:[{uploaderId:Uploaders[i].id},
						                                  {starDate:Date.now()+DAY_IN_MILLISECONDS}]}})
		console.log(posts);
		var subscribers=Uploaders[i].subscriberList;
		console.log(subscribers)
		for(var j=0;j<posts.length;j++){
			console.log('hiiii')
			for(let k=0;k<subscribers.length;k++){
				var user=await app.models.Viewer.findOne({where:{id:subscribers[k]}})
				console.log(k);
				await app.models.Email.send({
					to:user.email,
					from:'sen2016.team4@gmail.com',
					subject:'Hey..!!, today is '+ posts[j].name,
					text:posts[j].poster
				})
			}
		}
	}
	setTimeout(sendMail,)
}
async function loop(){
	setTimeout(sendMail)
	setTimeout(deletePosts,60*1000)
}
//loop()
