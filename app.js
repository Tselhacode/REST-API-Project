//setting up server

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//create a new app using express
const app = express();

//set the templating engine
app.set('view engine', 'ejs');

//setting up mongoDB

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

//create the schema
const articleSchema = {
  'month':String,
  'festival':String
};
//create the model - capitalized
const Article = mongoose.model("Article",articleSchema);

///request targeting all articles////
app.route("/articles")
  .get(function(req,res){
    Article.find(function(err,foundArticles){
      if (!err){
        res.send(foundArticles);
      }
      else{
        res.send(err);
      }
    });
  })
  .post(function(req,res){
    console.log(req.query.month);
    console.log(req.query.festival);

    const article = new Article ({
      "month":req.query.month,
      "festival": req.query.festival
    });

    article.save(function(err){
      if (!err) {
        res.send("success");
      }else{
        res.send("error");
      }

    });
  })
  .delete(function(req,res){
    Article.deleteMany(function(err){
      if (!err){
        res.send("successfully deleted all the documents")
      }else{
        res.send("error",err);
      }
    });
  });

////request targeting specific articles///

app.route("/articles/:articleTitle")
  .get(function(req,res){
    Article.findOne({month: req.params.articleTitle}, function(err,foundArticle){
      if (foundArticle){
        res.send(foundArticle)
      }else{
        res.send("no articles matching that found article");
      }
    });
  })
  .put(function(req,res){
    Article.replaceOne(
      {month: req.params.articleTitle},
      {month: req.query.month, festival:req.query.festival},
      {overwrite:true},
      function(err){
        if(!err){
          res.send("successfully updated article")
        }
      })
  })
  .patch(function(req,res){
    Article.updateOne(
      {month:req.params.articleTitle},
      {$set: req.query},
      function(err){
        if (!err){
          res.send("successfully updated article");
        }else{
          res.send(err);
        }
      }
    );
  })
  .delete(function(req,res){
    Article.deleteOne()
  })



// app.post("/articles", function(req,res){
//   console.log(req.query.month);
//   console.log(req.query.festival);
//
//   const article = new Article ({
//     "month":req.query.month,
//     "festival": req.query.festival
//   });
//
//   article.save(function(err){
//     if (!err) {
//       res.send("success");
//     }else{
//       res.send("error");
//     }
//
//   });
// })
//
// app.delete("/articles",function(req,res){
//   Article.deleteMany(function(err){
//     if (!err){
//       res.send("successfully deleted all the documents")
//     }else{
//       res.send("error",err);
//     }
//   });
// });

//parse our request
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(3000,function() {
  console.log("server started on port 3000")
})
