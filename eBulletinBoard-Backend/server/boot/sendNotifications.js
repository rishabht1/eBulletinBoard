var app=require('../server.js')
//mail=app.models.Email;
async function sendMail(){
	while(true){
		console.log("hello");
		var Uploaders=await app.models.Uploader.find();
		var Viewer=await app.models.Viewer.find();
		var Posts=await app.models.Posts.find();
		console.log(Uploaders)
		for (var i in Uploaders){
			console.log('hi')
			var posts=await Posts.find({where:{and:[{uploaderId:Uploaders[i].id},
				                                    {statDate:Date.now()}]}})
			console.log(Uploaders[i].id);
			var subscribers=Uploaders.subscriberList;
			for(j in posts){
				for(k in subscribers){
					var user=await Viewer.find({where:{id:subscribers[k]}})
					console.log(user);
					await app.models.Email.send({
						to:user[0].email,
						from:'pareshp1997@gmail.com',
						subject:'Hey..!!, today is'+ posts[j].name,
						text:''
					})
				}
			}
		}
		var p=0;
		while(p!=1000000)
			p++;
	}
}
sendMail();
