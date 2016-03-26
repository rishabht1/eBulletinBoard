module.exports = function(Posts) {
  Posts.like=function(id,uid){
  	var p=Posts.find({where:{id:id}},function(err,p){
  		if (err) throw err;
  	});
  	p.likes++;
  	p.like.push(uid);
  }
  Posts.delete=function(id){
  	Posts.destroyAll({where:{id:id}},function(err,p){
  		if (err) throw err;
  	});
  }
};
