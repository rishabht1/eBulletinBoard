var app=require('../server.js')
//mail=app.models.Email;
async function sendMail(){
		console.log("hello");
		var Uploaders=await app.models.Uploader.find();
		//var Viewer=await app.models.Viewer.find();
		//var Posts=await app.models.Posts.find();
		console.log(Uploaders)
		for (var i=0;i<Uploaders.length;i++){
			console.log('hi')
			var posts=await app.models.posts.find({where:{and:[{uploaderId:Uploaders[i].id}
				                                    ]}})
			console.log(posts);
			var subscribers=Uploaders[i].subscriberList;
			console.log(subscribers)
			for(var j=0;j<posts.length;j++){
				console.log('hiiii')
				for(let k=0;k<subscribers.length;k++){
					var user=await app.models.Viewer.find({where:{id:subscribers[k]}})
					console.log(k);
					await app.models.Email.send({
						to:'sen2016.team4@gmail.com',
						from:'sen2016.team4@gmail.com',
						subject:'Hey..!!, today is'+ posts[j].name,
						text:''
					})
				}
			}
		}
		//setTimeout(sendMail,10000)
	/*var p=0;
	while(p!=5){
	await app.models.Email.send({
						to:'abhishekjain951995@gmail.com',
						from:'pareshp1997@gmail.com',
						subject:'Hey..!!, today is',
						text:''
					})
	p++;
}*/
}
async function loop(){
	setTimeout(sendMail,1000)
}
loop()
