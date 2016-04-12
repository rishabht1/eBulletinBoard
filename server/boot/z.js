var session = require('client-sessions');
var app=require('../server.js');
/*app.models.viewer.destroyAll();
app.models.uploader.destroyAll();*/
app.post('../../common/viewer.js/login',function(req,res){
  console.log('hivhbjndfjvdk')
})
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));