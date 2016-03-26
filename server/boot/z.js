var app=require('../server.js');
/*app.models.viewer.destroyAll();
app.models.uploader.destroyAll();*/
var res=app.models.uploader.find({where:{id:"proClub"}});
console.log(res);