module.exports = function(Uploader) {
    Uploader.upload=async function(id,name,poster,desc,rd,sd,ed,type,tags){
        var check=Uploader.find({where:{id:id}})
      	await Uploader.app.models.posts.create( {
  			"name": name,
  			"poster": poster,
			  "description": desc,
			  "realeaseDate": rd,
			  "startDate": sd,
			  "endDate": ed,
			  "likes": 0,
        "tags":tags,
        "like":[],
			  "type": type,
			  "uploaderId": id
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
   Uploader.remoteMethod('upload',{
                             accepts:[{arg:'id',type:'string',required:true},
                                      {arg:'name',type:'string',required:true},
                                      {arg:'poster',type:'string',required:true},
                                      {arg:'desc',type:'string',required:true},
                                      {arg:'rd',type:'Date',required:true},
                                      {arg:'sd',type:'Date',required:true},
                                      {arg:'ed',type:'Date',required:true},
                                      {arg:'type',type:'boolean',required:true},
                                      {arg:'tags',type:'array',required:true}],
                             returns:{arg:'res',type:'array'},
                                 http: {path: '/upload', verb: 'get'}
                             })
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

