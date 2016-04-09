module.exports = function(Posts) {
  Posts.like=async function(id,vid){
    try{
       var l=await Posts.findById(id);
    console.log(l);
    var l1=l.likes;
    await Posts.update({id:id},{likes:l1+1});
    var peopleliked=l.like;
    peopleliked.push(vid);
    await Posts.update({id:id},{like:peopleliked});
    }
    catch(e){
      return 'error';
    }
  }
  Posts.deletePost=async function(id){
  	try{
      await Posts.destroyAll({id:id});
    var res='This post has been deleted successfully'
    return res;
    }
    catch(e){
      return 'error';
    }
  }
  Posts.search=async function(k){
    try{
      var res=[];
    k=k.toLowerCase();
    var keyWords=k.split(" ")
    for(var i=0;i<keyWords.length;i++){
      console.log(keyWords[i])
     res[i]=await Posts.find({where:{tags:{like:keyWords[i]}}});
    }
    var set=new Set();
    for(let i=0;i<res.length;i++){
      for(let j=0;j<res[i].length;j++)
        await set.add(res[i][j].name);
    }
    //console.log(set)
    res=[]
    var k=0
    for(var i of set){
      res[k]=await Posts.findOne({where:{name:i}})
      k++
    }
    return res
    }
    catch(e){
      return 'error';
    }
  }
  Posts.edit=async function(id,msg){
    try{
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
    catch(e){
      return 'error';
    }
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
                                      {arg:'id',type:'string',required:true}
                                     ],
                            returns:{arg:'res',type:'string'},
                                 http: {path: '/deletePost', verb: 'get'}
                             })
  Posts.remoteMethod('search',{
                             accepts:
                                    {arg:'keyWords',type:'string',required:true},
                            returns:{arg:'res',type:'array'},
                                 http: {path: '/search', verb: 'get'}
                             })
  Posts.remoteMethod('edit',{
                             accepts:[
                                    {arg:'id',type:'string',required:true},
                                      {arg:'uid',type:'string',required:true}
                                     ],
                            returns:{arg:'res',type:'string'},
                                 http: {path: '/unsubscribe', verb: 'get'}
                             })
};
//post update.