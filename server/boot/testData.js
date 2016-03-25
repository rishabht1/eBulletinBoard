
var app =require('../server.js');
async function test(){
    var mongoDs = app.dataSources.mongo;

    var Viewers= createViewers();
    var Uploaders= await createUploaders();


    var posts=createPosts(Uploaders);
    console.log("Done");
     // if (err) throw er);
}
  async function createViewers(cb) {
    mongoDs.automigrate('Viewers', function(err) {
     // if (err) return cb(err);

      app.models.viewer.create([
        {name:'_sinbad8',id:'201301000',email: 'foo@bar.com',subscriptions:['proClub','Debate']},
        {name:'paresh',id:'201301077',email: 'foo1@bar.com',subscriptions:['proClub']},
        {name:'rishabh',id:'201301001',email: 'foo2@bar.com',subscriptions:['Debate']}
      ], cb);
    });
  }

  async function createUploaders(cb) {
    mongoDs.automigrate('Uploaders', function(err) {
     // if (err) return cb(err);

      app.models.uploader.create([
        {"id": "proClub",
          "noOfPosts": 2,
          "noOfSubscriber": 2,
          "pPic": "string",
          "cPic": "string"},
       {"id": "Debate",
          "noOfPosts": 2,
          "noOfSubscriber": 2,
          "pPic": "string",
          "cPic": "string"},
      ], cb);
    });
  }

  
  async function createPosts(Uploaders, cb) {
    
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      console.log("started");
      app.models.posts.create([
        {"name": "ProContest",
         "poster": "string",
         "description": "string",
         "realeaseDate": Date.now()+(DAY_IN_MILLISECONDS*2),
         "startDate": Date.now()+(DAY_IN_MILLISECONDS*4),
         "endDate": Date.now()+(DAY_IN_MILLISECONDS*5),
         "likes": 0,
         "type": true,
         "uploaderId": Uploaders[0].id
        },
       {"name": "ProContest1",
         "poster": "string",
         "description": "string",
         "realeaseDate": Date.now()+(DAY_IN_MILLISECONDS*1),
         "startDate": Date.now()+(DAY_IN_MILLISECONDS*4),
         "endDate": Date.now()+(DAY_IN_MILLISECONDS*5),
         "likes": 0,
         "type": true,
         "uploaderId": Uploaders[0].id
        },
        {"name": "proContest2",
         "poster": "string",
         "description": "string",
         "realeaseDate": Date.now()+(DAY_IN_MILLISECONDS*2),
         "startDate": Date.now()+(DAY_IN_MILLISECONDS*4),
         "endDate": Date.now()+(DAY_IN_MILLISECONDS*5),
         "likes": 0,
         "type": true,
         "uploaderId": Uploaders[1].id
        },
       {"name": "ProContest3",
         "poster": "string",
         "description": "string",
         "realeaseDate": Date.now()+(DAY_IN_MILLISECONDS*5),
         "startDate": Date.now()+(DAY_IN_MILLISECONDS*6),
         "endDate": Date.now()+(DAY_IN_MILLISECONDS*6),
         "likes": 0,
         "type": true,
         "uploaderId": Uploaders[1].id
        },
      ], function(err,p){ console.log("started25");});
  }
  test();
