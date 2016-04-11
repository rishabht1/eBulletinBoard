var app =require('../../server/server.js');
module.exports = function(Viewer) {
	Viewer.login=async function(id,password){
		try{
		var user=[];
		user=await Viewer.findOne({where:{and:[{id:id},{password:password}]}})
		console.log(user);
		if(user==null){
			user=await Viewer.app.models.uploader.findOne({where:{and:[{id:id},{password:password}]}})
			if(user==null)
				return "wrong"
			else
				return "uploader"
		}
		else{
			return "viewer"
		}
	}
		catch(e){
			return 'error';
		}
	}
	Viewer.recent_feed=async function(id){
		//console.log(id);
		try{
			var v=await Viewer.find({where:{id:id}});
		//console.log(v[0].name);
		var subscriberList=v[0].subscriptions;
		//console.log(subscriberList)
        var res;
        res=await Viewer.app.models.posts.find({where:{and:[{uploaderId:{inq:subscriberList}},{realeaseDate:{gte:Date.now()}}]},
        	                         order: 'startDate ASC'})
        return res;
    }
    catch(e){
			return 'error';
		}
		
	}
	Viewer.like_feed=async function(id){
		try{
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
		catch(e){
			return 'error';
		}
	}
	Viewer.subscribe=async function(id,uid){
		try{
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
        catch(e){
			return 'error';
		}
	}
	Viewer.unsubscribe=async function(id,uid){
       try{
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
        catch(e){
			return 'error';
		}
	}
	Viewer.recent_nlfeed=async function(){
		try{
			var res=await Viewer.app.models.posts.find();
		return res;
		}
		catch(e){
			return 'error';
		}
	}
	Viewer.like_nlfeed=async function(){
		try{
			var res=await Viewer.app.models.posts.find({where:{realeaseDate:{gt:Date.now()}},order: 'likes DESC'});
		return res;
		}
		catch(e){
			return 'error';
		}
	}
	Viewer.changeEmail=async function(id,mail){
		try{
			await Viewer.update({id:id},{email:mail});
		var res='Your email has been changed succesfully'
		return res;
		}
		catch(e){
			return 'error';
		}
	}
	Viewer.showSubscribers=async function(id){
		try{
			var v=await Viewer.find({where:{id:id}});
		var res=v[0].subscriptions
		return res;
		}
		catch(e){
			return 'error';
		}
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
	Viewer.remoteMethod('login',{
		                         accepts:[
		                         	      {arg:'id',type:'string',required:true},
		                                  {arg:'password',type:'string',required:true}
		                                 ],
		                        returns:{arg:'res',type:'string'},
                                 http: {path: '/login', verb: 'get'}
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