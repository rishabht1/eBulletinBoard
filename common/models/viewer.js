var app =require('../../server/server.js');

/*
This Function is for handling backend loggin request, it returns Whether credientials are for Viewer
or Uploader or Wrong
*/
var webdriver=require('selenium-webdriver');
var browser=new webdriver.Builder().usingServer().withCapabilities({'browserName': 'phantomjs' }).build(); 
module.exports = function(Viewer) {
	Viewer.login=async function(id,password){
		var whichUser=id.indexOf('201');
		var is=await webMailLog(id,password);
		//var is=1;
		console.log(is);
		try{
			if(is==1){
				var user=await Viewer.findOne({where:{id:id}})
				console.log('user'+id);
				if(user==null){
					user=await Viewer.app.models.uploader.findOne({where:{id:id}})
					if(user==null){
						if(whichUser>-1){
							 await app.models.Viewer.create([
											{name:'_sinbad8',
											 id:id,
											 password:' ',
											 email:' ',
											 subscriptions:[]},
	      									]);
							return 'Viewer'
						}
						else{
							 await app.models.Uploader.create({  id: id,
	          													 password:' ',
														         noOfPosts: 0,
														         noOfSubscriber: 0,
														         pPic : "string",
														         cPic: "string",
														         subscriberList:[]});
							 return 'uploader'
						}
					}
					else{
						return "uploader"
					}
				}
				else {
					var res='Viewer'
					console.log(res)
					return res
				}
			}
			else{
				return 'wrong'
			}
		}
		catch(e){
			return e;
		}
	}
	async function init() {
		 console.log('Initialization');
}
	async function webMailLog(id,password){
		init();
	    browser.get('https://webmail.daiict.ac.in');
		browser.findElement(webdriver.By.name('username')).sendKeys(id);
		console.log('hi')
		browser.findElement(webdriver.By.name('password')).sendKeys(password);
		console.log('hi1')
		var button = await browser.findElement(webdriver.By.xpath('/html/body/div/div[1]/div[1]/form/table/tbody/tr[3]/td[2]/input[2]'));
		console.log('hi2')
	    button.click();	
	    console.log('hi3')
		var value;
		var string;	
		console.log('Sent the login details, God help us all');
		//await logTitle();
		await browser.getTitle().then(function(title) {
	        string=String(title);
			value=string.search('Inbox');
	    });
	    await browser.manage().deleteAllCookies();
	    //browser.quit();
	    console.log(value);
		if(value>-1){
			return 1;
		}
		else{	
			return 0;	
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
	        res=await Viewer.app.models.posts.find({where:{and:[{uploaderId:{inq:subscriberList}},{realeaseDate:{lte:Date.now()}}]},
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
	        res=await app.models.posts.find({where:{and:[{uploaderId:{inq:subscriberList}},{realeaseDate:{lte:Date.now()}}]},
	        	                         order: 'likes ASC'})
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
	        var u=await app.models.Uploader.find({where:{id:uid}});
	        var currentSubscribers=u[0].subscriberList;
	        currentSubscribers.push(id);
	        await Viewer.app.models.Uploader.update({id:uid},{subscriberList:currentSubscribers});
	        await Viewer.app.models.Uploader.update({id:uid},{noOfSubscriber:currentSubscribers.length});
	        var res='Your are now succesfully subscribed to '+ uid
	        return res;
		}
        catch(e){
			return 'error';
		}
	}
	Viewer.isSubscribed=async function(id,uid){
		var res='No';
		console.log(id);
		try{
			var v=await Viewer.find({where:{id:id}});
			var currentSubscriberscriptions=v[0].subscriptions;
			console.log(currentSubscriberscriptions)
			for(var i=0;i<currentSubscriberscriptions.length;i++){
				if(currentSubscriberscriptions[i]===uid)
					res= "yes"
			}
		}
        catch(e){
			res= 'error';
		}
		return res;
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
	        var u=await app.models.Uploader.find({where:{id:uid}});
	        var currentSubscribers=u[0].subscriberList;
	        i=currentSubscribers.indexOf(id);
	        if (i > -1) {
	   			 currentSubscribers.splice(i, 1);
			}
	        await Viewer.app.models.Uploader.update({id:uid},{subscriberList:currentSubscribers}); 
	         await Viewer.app.models.Uploader.update({id:uid},{noOfSubscriber:currentSubscribers.length});
	        var res='Your are now unsubscribe to ' + uid;
	        return res;
       }
        catch(e){
			return e;
		}
	}
	Viewer.recent_nlfeed=async function(){
		try{
			var res=await Viewer.app.models.posts.find({where:{realeaseDate:{lte:Date.now()}},order: 'startDate ASC'});
			return res;
		}
		catch(e){
			return 'error';
		}
	}
	Viewer.like_nlfeed=async function(){
		try{
			var res=await Viewer.app.models.posts.find({where:{realeaseDate:{lte:Date.now()}},order: 'likes ASC'});
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
	Viewer.remoteMethod('print',{
		                         returns:{arg:'res',type:'array'},
                                 http: {path: '/print', verb: 'get'}
		                         })
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
	Viewer.remoteMethod('isSubscribed',{
		                         accepts:[
		                         	      {arg:'id',type:'string',required:true},
		                                  {arg:'uid',type:'string',required:true}
		                                 ],
		                          returns:{arg:'res',type:'string'},
                                 http: {path: '/isSubscribe', verb: 'get'}
		                         })

};
