module.exports = function(Posts) {
  Posts.like=async function(id,uid){
    var l=Posts.findById(id);
    var l1=l[0].likes;
      
  	await Posts.update({id:id},{likes:l1+1});
    await Posts.update({id:id},{addToSet:{like:"uid"}});
  }
  Posts.deletePost=async function(id){
  	await Posts.destroyAll({where:{id:id}});
    var res='This post has been deleted successfully'
    return res;
  }
  Posts.search=async function(keyWords){
    var res;
    for (var i in keyWords){
       res=Posts.find({where:{tags:{like:keyWords[i]}}});
    }
  }
  Posts.edit=async function(id,msg){
       Posts.destroyAll({where:{id:id}});
       Posts.create({
        "name": "string",
        "poster": "string",
        "description": "string",
        "realeaseDate": "2016-03-24",
        "startDate": "2016-03-24",
        "endDate": "2016-03-24",
        "likes": 0,
        "type": true,
        "tags":"",
        "id": "string",
        "uploaderId": "id"
        });
  }
  Posts.remoteMethod('like',{
                             accepts:[
                                    {arg:'id',type:'string',required:true},
                                      {arg:'uid',type:'string',required:true}
                                     ],
                                 http: {path: '/like', verb: 'get'}
                             })
  Posts.remoteMethod('deletePost',{
                             accepts:[
                                      {arg:'uid',type:'string',required:true}
                                     ],
                            returns:{arg:'res',type:'string'},
                                 http: {path: '/deletePost', verb: 'get'}
                             })
  Posts.remoteMethod('search',{
                             accepts:[
                                    {arg:'keyWords',type:'array',required:true}
                                     ],
                            returns:{arg:'res',type:'array'},
                                 http: {path: '/search', verb: 'get'}
                             })
  /*Posts.remoteMethod('edit',{
                             accepts:[
                                    {arg:'id',type:'string',required:true},
                                      {arg:'uid',type:'string',required:true}
                                     ],
                            returns:{arg:'res',type:'string'},
                                 http: {path: '/unsubscribe', verb: 'get'}
                             })*/
};
//post update.