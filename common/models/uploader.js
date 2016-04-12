module.exports = function(Uploader) {
    Uploader.upload=async function(id,name,poster,desc,rd,sd,st,et,ed,type,tags){
        var check=await Uploader.findOne({where:{id:id}})
        // console.log(check)
        var res;
        console.log(id+" "+name+" "+ed+" "+sd+" "+st+" "+et+" "+type+" "+tags)
        tags=tags.toLowerCase()
        if(check==null){
          res="notsuccess";
          return res;
        }
        try{
      	var k=await Uploader.app.models.posts.create( {
  			"name": name,
  			"poster": poster,
			  "description": desc,
			  "realeaseDate": rd,
			  "startDate": sd,
			  "endDate": ed,
        "startTime": st,
        "endTime": et,
			  "likes": 0,
        "tags":tags,
        "like":[],
			  "type": type,
			  "uploaderId": id
        });
        res="success";
      }
      catch(e){
        res="error";
      }
      console.log(k)
      return res;
    };
    
    Uploader.recent_feed=async function(id){
   	var res;
    try{
   	res=await Uploader.app.models.posts.find({where:{uploaderId:id},order:'startDate ASC'});
    return res;
    }
    catch(e){
    res="error";
    return res;
    }
   }
   Uploader.like_feed=async function(id){
    var res;
    try{
       res=await Uploader.app.models.posts.find({where:{uploaderId:id},order:'likes DESC'});
       return res;
    }
    catch(e){
     res="error";
     return res;
    }
  }
   Uploader.subscribers=async function(id){
   	var res;
    try{
      var u=await Uploader.find({where:{id:id}});
      res=u[0].noOfSubscriber;
      return res;
    }
   	 catch(e){
     res="error";
     return res;
    }
   }
  Uploader.totalposts= async function(id){
   	var res;
    try{
      var u=await Uploader.find({where:{id:id}});
    res=u[0].noOfPosts;
    console.log(res);
    return res;
    }
   	catch(e){
     res="error";
     return res;
    }
   }
   Uploader.upcomingEvent= async function(id){
   var res;
   try{
     res=await Uploader.app.models.posts.find({where:{uploaderId:id},order:'startDate ASC',limit:1});
    return res;
   }
   catch(e){
     res="error";
     return res;
    }
   }
   Uploader.remoteMethod('upload',{
                             accepts:[{arg:'id',type:'string',required:true},
                                      {arg:'name',type:'string',required:true},
                                      {arg:'poster',type:'string',required:true},
                                      {arg:'desc',type:'string',required:true},
                                      {arg:'rd',type:'Date',required:true},
                                      {arg:'sd',type:'Date',required:true},
                                      {arg:'st',type:'string',required:true},
                                      {arg:'et',type:'string',required:true},
                                      {arg:'ed',type:'Date',required:true},
                                      {arg:'type',type:'boolean',required:true},
                                      {arg:'tags',type:'string',required:true}],
                             returns:{arg:'res',type:'string'},
                                 http: {path: '/upload', verb: 'get'}
                             })
   Uploader.remoteMethod('recent_feed',{
                             accepts:{arg:'id',type:'string',required:true},
                             returns:{arg:'res',type:'array'},
                                 http: {path: '/recent_feed', verb: 'get'}
                             })
   Uploader.remoteMethod('like_feed',{
                             accepts:{arg:'id',type:'string',required:true},
                             returns:{arg:'res',type:'object'},
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

