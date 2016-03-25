module.exports = function(Viewer) {
	Viewer.feed=function(id){
		var v=Viewer.find({where:{id:id}});
		var subscriberList=v.subscriptions;
        var res;
        res=Viewer.models.posts.find({where:{uploaderId:{inq:subscriberList}},
        	                         order: 'startDate DESC'},
        	                         function(err,res){
        	                         	if (err) throw err;
        	             
        	                         })
	}
	Viewer.subscribe=function(id,uid){
        Viewer.find({where:{id:id}},function(err,v){

        }).subscriptions.push(uid);
	}
	Viewer.nlfeed=function(){
		var v=Viewer.models.posts.find({order: 'startDate DESC'},function(err,v){

		});
	}
	Viewer.remoteMethod('feed',{
		                         accepts:{arg:'id',type:'string',required:true},
		                         returns:{arg:'res',type:'array'},
                                 http: {path: '/feed', verb: 'get'}
		                         })
	Viewer.remoteMethod('subscribe',{
		                         accepts:[
		                         	      {arg:'id',type:'string',required:true},
		                                  {arg:'uid',type:'string',required:true}
		                                 ],
		                         returns:{arg:'res',type:'array'},
                                 http: {path: '/subscribe', verb: 'get'}
		                         })
};
