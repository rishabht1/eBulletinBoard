module.exports = function(Uploader) {
    Uploader.upload=async function(id,msg){
    	await Uploader.models.posts.create( {
  			"name": "string",
  			"poster": "string",
			  "description": "string",
			  "realeaseDate": "2016-03-24",
			  "startDate": "2016-03-24",
			  "endDate": "2016-03-24",
			  "likes": 0,
			  "type": true,
			  "id": "string",
			  "uploaderId": "id"
        });
    };
    Uploader.recent_feed=async function(id){
   	var res;
   	res=await Uploader.app.models.posts.find({where:{uploaderId:id},order:'startDate ASC'});
    return res;
   }
   Uploader.like_feed=async function(id){
    var res;
    res=await Uploader.app.models.posts.find({where:{uploaderId:id},order:'likes DESC'});
    return res;
   }
   Uploader.subscribers=async function(id){
   	var res;
   	var u=await Uploader.find({where:{id:id}});
   	res=u[0].noOfSubscriber;
    return res;
   }
    Uploader.totalposts=async function(id){
   	var res;
   	var u=await Uploader.find({where:{id:id}});
   	res=u[0].noOfPosts;
    console.log(res);
    return res;
   }
   Uploader.upcomingEvent=async function(id){
   var res;
    res=await Uploader.app.models.posts.find({where:{uploaderId:id},order:'startDate ASC',limit:1});
    return res;
   }
   Uploader.remoteMethod('recent_feed',{
                             accepts:{arg:'id',type:'string',required:true},
                             returns:{arg:'res',type:'array'},
                                 http: {path: '/recent_feed', verb: 'get'}
                             })
   Uploader.remoteMethod('like_feed',{
                             accepts:{arg:'id',type:'string',required:true},
                             returns:{arg:'res',type:'array'},
                                 http: {path: '/like_feed', verb: 'get'}
                             })
   Uploader.remoteMethod('subscribers',{
                             accepts:{arg:'id',type:'string',required:true},
                             returns:{arg:'res',type:'number'},
                                 http: {path: '/subscribers', verb: 'get'}
                             })
   Uploader.remoteMethod('totalposts',{
                             accepts:{arg:'id',type:'string',required:true},
                             returns:{arg:'res',type:'number'},
                                 http: {path: '/totalPosts', verb: 'get'}
                             })
   Uploader.remoteMethod('upcomingEvent',{
                             accepts:{arg:'id',type:'string',required:true},
                             returns:{arg:'res',type:'array'},
                                 http: {path: '/upcomingEvent', verb: 'get'}
                             })
};

