const express = require("express");
  const app = express();
  const mongoose = require("mongoose")
  const cors=require('cors');
  var bcrypt = require('bcryptjs');
  

  app.use(cors())
  app.use(express.json());
  const port = 5000;

  const conn_str = "mongodb+srv://Arya:FRMAIP8sLeiAcGKa@dasssignup.17lqwy4.mongodb.net/?"

  mongoose.set("strictQuery",false)
  mongoose.connect(
  conn_str,
  { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
  }).then(()=>{
    console.log("success");
  }).catch((err)=>console.log(err));
  //create a server object:
  app.listen(port, () => {
  console.log("starting the server");
  }); 
  
const ProfileSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    age: String,
    contactnumber:String,
    password:String,
    organistaion:String,
    location: String,
    followers:[{
      username: { type: String, required: true }
    }],
    followings:[{
      username: { type: String, required: true }
    }]
  });
  
const User = mongoose.model('User', ProfileSchema);
  
//profile page....

  app.post('/yoursingup', (req, res) => {
    var pass = req.body.logpass;
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);

    const user = new User({ 
      firstname: req.body.logfirstname,
      lastname: req.body.loglastname,
      username: req.body.logusername ,
      email: req.body.logemail,
      age:req.body.logage,
      contactnumber: req.body.lognumber,
      password:hash
    });
    user.save((err, user) => {
      if (err) return console.error(err);
      res.json(user);
      console.log("sent");
    });
  });

  app.post('/yourlogin', (req, res) => {
    const  username = req.body.username;
    // console.log(username);
    // console.log(password);
    // Find the user by name
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(user) {
        // console.log(user);
        return res.send(user);
      }
      return res.status(200).json({ exists: false });
    });
  });

  app.post('/yourdata', (req, res) => {
    const  username = req.body.username;
    console.log(username);
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(user) {
        // console.log(user);
        return res.send(user);
      }
      return res.status(200).json({ exists: false });
    });
  });

  app.post('/change-data', (req, res) => {
    var data = req.body;
    User.updateOne({username:req.body.username}, {$set: {username: data.un, lastname:data.ln, firstname:data.fn, age:data.age, email:data.mail, contactnumber:data.number, location:data.loc, organistaion:data.org}}, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        // console.log(user);
        res.send("changed")
      }
    });
  });

  app.post('/add-followers-followings', (req, res) => {

    const username = req.body.username;
    // console.log(username);

    const initialdata = [
      {id: 1, name: "Following 1"},
      {id: 2, name: "Following 2"},
      {id: 3, name: "Following 3"},
      {id: 4, name: "Following 4"},
      {id: 5, name: "Following 5"},
      {id: 6, name: "Following 6"}
    ];

    User.updateOne({username:username}, { $push: { followers: { $each: initialdata } } }, (err, res) => {
      if (err) if (err) return console.error(err);;
      console.log(res);
    });
  });

  app.post('/getfollowing', (req, res) => {

    const username = req.body.username;
    console.log(username);
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(user) {
        console.log("followings:->"+user.followings);
        return res.send(user.followings);
      }
      return res.status(200).json({ exists: false });

    });
  });

  app.post('/getalldata', (req, res) => {
    let posts = User.find({} , function(err , posts){
      if(err){
        console.log(err);
      }// axios.post('http://localhost:5000/getalldata')
        // .then(response => {
        //     setOthers(JSON.parse(JSON.stringify(response.data))); 
        //     // console.log("temp->"+others+"\nfoloowings"+followings);
            // let other = temp.filter(member => {
            //     return !followings.some(following => following.username === member.username);
            //   });
            // setOthers(other);
        // })
        // .catch(error => {
        //   console.error(error);
        // }); 
      else{
        console.log(posts);
        res.send(posts);
      }
    })
  });

  app.post('/addfollowing', (req , resp)=>{
    const username = req.body.username;
    const add_following = req.body.other;
    console.log(req.body);

    User.updateOne({username:username}, { $push: { followings: {username:add_following} } }, (err, res) => {
      if (err) if (err) return console.error(err);;
    });

    User.updateOne({username:add_following}, { $push: { followers: {username:username } } }, (err, res) => {
      if (err) if (err) return console.error(err);;
      resp.send("Done");
    });

  }); 

  app.post('/removefollowing', (req, res) => {

    const username = req.body.username;
    const remove_following = req.body.remove;
    
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(user) {
        var x = user.followings;
        x.pull({username: remove_following});
        user.save((err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          return 1;
        });
      }
    });

    User.findOne({ username: remove_following }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(user) {
        var x = user.followers;
        x.pull({username: username});
        user.save((err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          console.log("hi");
          res.send("done");
          // return 1;
        });
      }
    });

  });

  app.post('/getfollowers', (req, res) => {

    const username = req.body.username;
    console.log(username);
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(user) {
        // console.log("followings:->"+user.followers);
        return res.send(user.followers);
      }
      return res.status(200).json({ exists: false });

    });
  });

  app.post('/removefollower', (req, res) => {

    const username = req.body.username;
    const remove_follower = req.body.remove;
    
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(user) {
        var x = user.followers;
        x.pull({username: remove_follower});
        user.save((err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          return 1;
        });
      }
    });

    User.findOne({ username: remove_follower }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if(user) {
        var x = user.followings;
        x.pull({username: username});
        user.save((err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          // console.log("hi");
          res.send("done");
          // return 1;
        });
      }
    });

  });

  //end of profile page

  // public Post page starts here...

  const PublicPostSchema = new mongoose.Schema({
    username:String,
    Content: String,
    title:String,
    banned_keywords:String,
    tags:String,
    followers:[{
      username: { type: String}
    }],
    requests:[{
      username: { type: String }
    }],
    banned_people:[{
      username: { type: String}
    }]
    
  });
  
const PublicPost = mongoose.model('PublicPost', PublicPostSchema);

  app.post('/addPublicPost' , (req , res) => {
    const pp = new PublicPost({ 
        username : req.body.username,
        Content: req.body.content,
        title  : req.body.title,
        banned_keywords : req.body.bann,
        tags:req.body.tags
    });
    pp.followers.push({username : req.body.username});
    pp.save((err, pp) => {
      if (err) return console.error(err);
      res.json(pp);
      console.log("sent");
    });
  });

  app.post('/getPublicPostData', (req, res) => {
      var usname = req.body.username;

      PublicPost.find({ username: usname }, (err, posts) => {
        if (err) return console.error(err);
        res.send( JSON.parse( JSON.stringify(posts) ) );
      });
  });

  app.post('/deletePost', (req, res) => {
    PublicPost.deleteOne({ Content: req.body.Content }, function (err) {
      if (err) return handleError(err);
      console.log("done");
      res.send("deleted");
      // deleted!
    });

    Comments.deleteMany({id : req.body._id} , function(err){
      if (err) return handleError(err);
      console.log("done");
      res.send("Done");
    })
  });

  app.post('/getAllPostData', (req, res) => {
    PublicPost.find({}, (err, posts) => {
      if (err) return console.error(err);
      res.send( JSON.parse( JSON.stringify(posts) ) );
    });
});

app.post('/followRequest', (req, res) => {
  const username = req.body.username;
    const post_content = req.body.content;
    console.log(post_content , username);
    // console.log(post_content);
    PublicPost.updateOne({Content:post_content}, { $push: { requests: {username:username } } }, (err, ress) => {
      if (err) return console.error(err);
      res.send("Done");
    });
});

app.post('/getPostData', (req, res) => {
    idx = req.body.id;
    PublicPost.findOne({_id:idx}, (err, ress) => {
      if (err) return console.error(err);
      console.log(ress);
      res.send(JSON.parse(JSON.stringify(ress)));
    });
});

app.post('/Accept_req', (req, res) => {
  idx = req.body.id;
  username = req.body.username;

  PublicPost.findOne({_id: idx }, (err, post) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if(post) {
      var y = post.followers;
      y.push({username:username});
      var x = post.requests;
      x.pull({username: username});
      post.save((err) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        console.log("hi");
        res.send("done");
        // return 1;
      });
    }
  });
  
});

app.post('/Deny_req', (req, res) => {
  idx = req.body.id;
  username = req.body.username;

  PublicPost.findOne({_id: idx }, (err, post) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if(post) {
      var y = post.banned_people;
      y.push({username:username});
      var x = post.requests;
      x.pull({username: username});
      post.save((err) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        console.log("hi");
        res.send("done");
        // return 1;
      });
    }
  });
  
});

app.post('/leavepost', (req, res) => {
  username = req.body.username;
  idx = req.body.idx;
  // console.log(username , idx);
  PublicPost.findOne({_id: idx }, (err, post) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if(post) {
      var y = post.banned_people;
      y.push({username:username});
      var x = post.followers;
      x.pull({username: username});
      post.save((err) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        console.log("hi");
        res.send("done");
        // return 1;
      });
    }
  });
  
});

//id , usename , content , upvotes, downvotes, replies, title

const CommetsSchema = new mongoose.Schema({
  username:String,
  Content: String,
  title:String,
  upvotes:[{
    username:String
  }],
  downvote:[{
    username:String
  }],
  replies:[{
    text:String,
    username:String
  }],

  reportedBy : [{
    username : String,
    reason : String
  }],

  id:String //main post ka id
});

const Comments = mongoose.model('Comments', CommetsSchema);

app.post('/postComment', (req, res) => {
  username = req.body.username;
  data = req.body.content;
  title = req.body.title;
  id = req.body.id;

  const newComment = new Comments({ 
    username :username,
    Content : data,
    title : title,
    id:id
  });

  newComment.save((err, pp) => {
    if (err) return console.error(err);
    // console.log(pp);
    console.log("sent");
    res.send("Done");
  }); 
});

app.post('/getCommentsData', (req, res) => {
  idx = req.body.id;
  Comments.find({id:idx}, (err, ress) => {
    // console.log("lknvjdfvvkf vfd\n\n\nkjvjkfv\n\n");
    if (err) return console.error(err);
    // console.log(ress);
    res.send(JSON.parse(JSON.stringify(ress)));
  });
});


app.post('/addRelplay' , (req , res)=>{
  
  Comments.findOne({_id : req.body.id}, (err , ress)=>{
    if(err) return console.error(err);

    ress.replies.push({username : req.body.username , text:req.body.replay} );
    ress.save((error , re)=>{
      if (error) return console.error(error);
      // res.json(pp);
      res.send("sent");
      // console.log("sent");

    })  
  });
});

app.post('/upvote' , (req , res)=>{
  
  Comments.findOne({_id : req.body.id}, (err , ress)=>{
    if(err) return console.error(err);

    ress.upvotes.push({username : req.body.username } );
    let y= ress.downvote;
    y.pull({username : req.body.username } );
    ress.save((error , re)=>{
      if (error) return console.error(error);
      // res.json(pp);
      res.send("sent");
      // console.log("sent");

    })  
  });
});


app.post('/downvote' , (req , res)=>{
  
  Comments.findOne({_id : req.body.id}, (err , ress)=>{
    if(err) return console.error(err);

    ress.downvote.push({username : req.body.username } );
    let y = ress.upvotes;
    y.pull({username : req.body.username } );
    ress.save((error , re)=>{
      if (error) return console.error(error);
      // res.json(pp);
      res.send("sent");
      // console.log("sent");

    })  
  });
});


app.post('/reportPost' , (req , res)=>{
  
  Comments.findOne({_id : req.body.idx}, (err , ress)=>{
    if(err) return console.error(err);

    let y = ress.reportedBy;
    y.push({username : req.body.username , reason : req.body.issue} );
  
    ress.save((error , re)=>{
      if (error) return console.error(error);
      console.log("Reported");
      res.send("sent");

    })  
  });
});


app.post('/getCommentData' , (req , res)=>{
  
  Comments.findOne({_id : req.body.idx}, (err , ress)=>{
    if(err) return console.error(err);
    // console.log(ress);
    res.send(ress); 
  });
});



app.post('/ignore' , (req , res)=>{
  
  Comments.findOne({_id : req.body.idx}, (err , ress)=>{
    if(err) return console.error(err);
    // console.log(ress);
    let y = ress.reportedBy;

    y.pull({_id : req.body.report_id});
    ress.save((error , re)=>{
      if (error) return console.error(error);
      console.log("Reported");
      res.send("sent");

    })  
  });
});


app.post('/delete_post' , (req , res)=>{
  
 
  Comments.deleteOne({ _id : req.body.idx }, function (err) {
    if (err) return handleError(err);
  });
  res.send("Done");
});

