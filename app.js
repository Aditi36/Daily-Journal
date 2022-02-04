//myMHVwUGGFq8tElb

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const res = require("express/lib/response");
const uri = `mongodb+srv://journal:myMHVwUGGFq8tElb@cluster0.pp7ja.mongodb.net/<dbname>?retryWrites=true&w=majority`

const homeStartingContent = "Make your daily Journal here !!";
const aboutContent = " I am trying to learn more in devlopment, Hope you like this project.";
const contactContent = "You can email me on aditinita@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect( process.env.MONGODB_URI ||uri, { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) => {
  Post.find({},function(err,posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    })
  })
  

})


app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent })
})

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent })
})

app.get("/compose", (req, res) => {

  res.render("compose");

})
app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  })


});

app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
  

    Post.findOne({_id: requestedPostId }, function(err, post) {
      res.render("post", {
        title: post.title,
        content: post.content
      });

    });

  });

  let port = process.env.PORT;

   if(port == null || port == ""){
     port = 3000;
   }


  app.listen(port, function () {
    console.log("Server started on port");
  });
