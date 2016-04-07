var app =require('../../server/server.js');
module.exports = function(Viewer) {
	Viewer.recent_feed=async function(id){
		//console.log(id);
		var v=await Viewer.find({where:{id:id}});
		//console.log(v[0].name);
		var subscriberList=v[0].subscriptions;
		//console.log(subscriberList)
        var res;
        res=await Viewer.app.models.posts.find({where:{and:[{uploaderId:{inq:subscriberList}},{realeaseDate:{gte:Date.now()}}]},
        	                         order: 'startDate ASC'})
        return res;
	}
	Viewer.like_feed=async function(id){
		console.log(id);
		var v=await Viewer.find({where:{id:id}});
		//console.log(v[0].name);
		var subscriberList=v[0].subscriptions;
		//console.log(subscriberList)
        var res;
        res=await app.models.posts.find({where:{and:[{uploaderId:{inq:subscriberList}},{realeaseDate:{gt:Date.now()}}]},
        	                         order: 'likes DESC'})
        return res;
	}
	Viewer.subscribe=async function(id,uid){
		var v=await Viewer.find({where:{id:id}});
		var currentSubscriptions=v[0].subscriptions;
		currentSubscriptions.push(uid);
        await Viewer.update({id:id},{subscriptions:currentSubscriptions});
        var u=app.models.Uploader.find({where:{id:uid}});
        var currentSubscribers=u[0].subscriberList;
        currentSubscribers.push(id);
        await Viewer.app.models.Uploader.update({id:uid},{subscriberList:currentSubscribers});
        var res='Your are now succesfully subscribed to'+ uid
        return res;
	}
	Viewer.unsubscribe=async function(id,uid){
        var v=await Viewer.find({where:{id:id}});
		var currentSubscriptions=v[0].subscriptions;
		var i=currentSubscriptions.indexOf(uid);
		if (i > -1) {
   			 currentSubscriptions.splice(i, 1);
		}
        await Viewer.update({id:id},{subscriptions:currentSubscriptions});
        var u=app.models.Uploader.find({where:{id:uid}});
        var currentSubscribers=u[0].subscriberList;
        i=currentSubscribers.indexOf(id);
        if (i > -1) {
   			 currentSubscribers.splice(i, 1);
		}
        await Viewer.app.models.Uploader.update({id:uid},{subscriberList:currentSubscribers}); 
        var res='Your are now unsubscribe to' + uid;
        return res;
	}
	Viewer.recent_nlfeed=async function(){
		var res=await Viewer.app.models.posts.find({where:{realeaseDate:{gt:Date.now()}},order: 'startDate ASC'});
		return res;
	}
	Viewer.like_nlfeed=async function(){
		var res=await Viewer.app.models.posts.find({where:{realeaseDate:{gt:Date.now()}},order: 'likes DESC'});
		return res;
	}
	Viewer.changeEmail=async function(id,mail){
		await Viewer.update({id:id},{email:mail});
		var res='Your email has been changed succesfully'
		return res;
	}
	Viewer.showSubscribers=async function(id){
		var v=await Viewer.find({where:{id:id}});
		var res=v[0].subscriptions
		return res;
	}
	Viewer.remoteMethod('recent_feed',{
		                         accepts:{arg:'id',type:'string',required:true},
		                         returns:{arg:'res',type:'array'},
                                 http: {path: '/recent_feed', verb: 'get'}
		                         })
	Viewer.remoteMethod('like_feed',{
		                         accepts:{arg:'id',type:'string',required:true},
		                         returns:{arg:'res',type:'array'},
                                 http: {path: '/like_feed', verb: 'get'}
		                         })
	Viewer.remoteMethod('recent_nlfeed',{
		                         returns:{arg:'res',type:'array'},
                                 http: {path: '/recent_nlfeed', verb: 'get'}
		                         })
	Viewer.remoteMethod('like_nlfeed',{
		                         returns:{arg:'res',type:'array'},
                                 http: {path: '/like_nlfeed', verb: 'get'}
		                         })
	Viewer.remoteMethod('showSubscribers',{
		                         accepts:{arg:'id',type:'string',required:true},
		                         returns:{arg:'res',type:'array'},
                                 http: {path: '/showSubscriptionList', verb: 'get'}
		                         })
	Viewer.remoteMethod('unsubscribe',{
		                         accepts:[
		                         	      {arg:'id',type:'string',required:true},
		                                  {arg:'uid',type:'string',required:true}
		                                 ],
		                        returns:{arg:'res',type:'string'},
                                 http: {path: '/unsubscribe', verb: 'get'}
		                         })
	Viewer.remoteMethod('changeEmail',{
		                         accepts:[
		                         	      {arg:'id',type:'string',required:true},
		                                  {arg:'mail',type:'string',required:true}
		                                 ],
		                         returns:{arg:'res',type:'string'},
                                 http: {path: '/changeEmail', verb: 'get'}
		                         })
	Viewer.remoteMethod('subscribe',{
		                         accepts:[
		                         	      {arg:'id',type:'string',required:true},
		                                  {arg:'uid',type:'string',required:true}
		                                 ],
		                          returns:{arg:'res',type:'string'},
                                 http: {path: '/subscribe', verb: 'get'}
		                         })
};