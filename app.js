const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');








// init app
const app=express();

//connecting to database

mongoose.connect('mongodb://localhost/nodekb');

var db=mongoose.connection;

db.once('open',()=>{
    console.log('connected to mongo db');
})


//check for db errors
db.on('error',(err)=>{
    console.log(err)
});



//bring in articles

let article=require('./models/article');


// load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




var PORT=3000;

// home route
app.get('/',(req,res)=>{
    article.find({},(err,articles)=>{
        if(err){
            throw err;
        }
        else{
            res.render('index',{
                title:'hello world',
                articles:articles
            });
        }

    });


});

// add route

app.get('/article/add',(req,res)=>{
    res.render('add_article',{
        title:'Add new article'
    });



});

app.post('/article/add',(req,res)=>{

    article=new article();
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;
    article.save((err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/');
        }
    });

    console.log(req.body.author);


});


app.listen(PORT);