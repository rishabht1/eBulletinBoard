var app =require('../server.js');

var mongoDs = app.dataSources.mongo;
var Viewers;
var Uploaders;
    async function t(){
    Viewers= await createViewers();
    var res=await app.models.Viewer.find({where:{name:"paresh"}});
    //console.log(res[0].name);
   // console.log(res.subscriptions);
    //await app.dataSources.mongo.viewer.find({where:{name:"paresh"}})
   // console.log(Viewers);
    Uploaders=await createUploaders();
    //console.log(app.models.Uploader[0].id);
    createPosts(Uploaders);
    console.log("Done");
  }
  /*async function sub(viewer,uploader){
    console.log('hello')
        await Viewer.updateAll({id:viewer[1].id},{"$push":{"subscriptions":uploader[1].id}});
  }*/
     // if (err) throw er);
  async function createViewers() {
     var ans = await app.models.Viewer.create([
        {name:'_sinbad8',id:'201301000',password:'1234',email: 'pareshp1997@gmail.com',subscriptions:['proClub','Debate']},
        {name:'paresh',id:'201301077',password:'1234',email: 'pareshp1997@gmail.com',subscriptions:['proClub']},
        {name:'rishabh',id:'201301001',password:'1234',email: 'pareshp1997@gmail.com',subscriptions:['Debate']}
      ]);
   // console.log('viewers');
    //await app.models.Viewer.updateAll({id:ans[1].id},{"$pushAll":{subscriptions:'Debate'}})
    //console.log(ans[1].subscriptions);
     return ans;
  }

 async function createUploaders() {
     console.log("started");
      var ans =await  app.models.Uploader.create([
        {  id: "proClub",
           password:'1234',
           noOfPosts: 2,
           noOfSubscriber: 2,
           pPic : "string",
           cPic: "string",
           subscriberList:['201301077','201301000']},
       {   id: "Debate",
           password:'1234',
           noOfPosts: 2,
           noOfSubscriber: 2,
           pPic: "string",
           cPic: "string",
           subscriberList:['201301001','201301000']}
      ]);
      console.log('ans');
     // console.log(ans[0].id);
      return ans;
  }
  async function createPosts(Uploaders) {
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      console.log("started");
       var ans= await app.models.Posts.create([
        {name: "ProContest",
         poster: "string",
         description: "string",
         realeaseDate: Date.now()+(DAY_IN_MILLISECONDS*2),
         startDate: Date.now(),
         endDate: Date.now()+(DAY_IN_MILLISECONDS*5),
         startTime:'2:30',
         endTime:'3:00',
         likes: 0,
         like:[],
         type: true,
         uploaderId: Uploaders[0].id,
         tags:'hi how are you'
        },
       {name: "ProContest1",
         poster: "string",
         description: "string",
         realeaseDate: Date.now()+(DAY_IN_MILLISECONDS*1),
         startDate: Date.now(),
         endDate: Date.now()+(DAY_IN_MILLISECONDS*5),
         startTime:'2:30',
         endTime:'3:00',
         likes: 0,
          like:[],
         type: true,
         uploaderId: Uploaders[0].id,
         tags:'thanks i am fine'
        },
        {"name": "ProContest2",
         "poster": "string",
         "description": "string",
         "realeaseDate": Date.now()+(DAY_IN_MILLISECONDS*2),
         "startDate": Date.now(),
         "endDate": Date.now()+(DAY_IN_MILLISECONDS*5),
         startTime:'2:30',
         endTime:'3:00',
         "likes": 0,
          like:[],
         "type": true,
         "uploaderId": Uploaders[1].id,
         tags:'on really'
        },
       {"name": "ProContest3",
         "poster": "string",
         "description": "string",
         "realeaseDate": Date.now()+(DAY_IN_MILLISECONDS*5),
         "startDate": Date.now(),
         "endDate": Date.now()+(DAY_IN_MILLISECONDS*6),
         startTime:'2:30',
         endTime:'3:00',
         "likes": 0,
          like:[],
         "type": true,
         "uploaderId": Uploaders[1].id,
         tags:'yeah why not'
        },
      ]);
       console.log('mcnx');
  }
t();