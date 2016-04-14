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
  Posts.disLike=async function(id,vid){
    try{
        var l=await Posts.findById(id);
        console.log(l);
        var l1=l.likes;
        await Posts.update({id:id},{likes:l1-1});
        var peopleliked=l.like;
        var ind=peopleliked.indexOf(vid);
        if(ind>-1)
          peopleliked.splice(ind,1)
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
  Posts.edit=async function(id,name,poster,desc,rd,sd,st,et,ed,type,tags){
        var check=await Poster.findOne({where:{id:id}});
        Posts.destroyAll({where:{id:id}});
        //console.log(poster+'\n')
        var res;
       // console.log(id+" "+name+" "+ed+" "+sd+" "+st+" "+et+" "+type+" "+tags)
        tags=tags.toLowerCase()
        if(check==null){
          res="notsuccess";
          return res;
        }
        try{
          var k=await posts.create( {
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
          "uploaderId": check.uploaderId
        });
        res="success";
      }
      catch(e){
        res="error";
      }
      console.log(res)
      return res;
    };
  Posts.remoteMethod('like',{
                             accepts:[
                                    {arg:'id',type:'string',required:true},
                                      {arg:'uid',type:'string',required:true}
                                     ],
                                 http: {path: '/like', verb: 'get'}
                             })
  Posts.remoteMethod('disLike',{
                             accepts:[
                                    {arg:'id',type:'string',required:true},
                                      {arg:'uid',type:'string',required:true}
                                     ],
                                 http: {path: '/disLike', verb: 'get'}
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
                                 http: {path: '/edit', verb: 'get'}
                             })
};
//post update.