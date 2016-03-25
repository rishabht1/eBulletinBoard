module.exports = function(Uploader) {
    Uploader.upload=function(id,msg){
    	var u=Uploader.findById(id);
    	Uploader.models.posts.create( {
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
   Uploader.feed=function(id){
   	var res;
   	res=Uploader.models.posts.find({where:{uploaderId:id}},function(err,res){

   	});
   }
    Uploader.subscribers=function(id){
   	var res;
   	var u=u.findById(id);
   	res=u.noOfSubscribers;
   }
    Uploader.totalposts=function(id){
   	var res;
   	var u=Uploader.findById(id);
   	res=u.noOfposts;
   }
};

