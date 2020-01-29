const express=require('express');
const path=require('path');
const mongoose=require('mongoose');

//connecting to database

mongoose.connect('mongodb://localhost/nodekb');

let db=mongoose.connection;

db.once('open',()=>{
    console.log('connected to mongo db');
})


//check for db errors
db.on('error',(err)=>{
    console.log(err)
});



// init app
const app=express();

//bring in articles

let article=require('./models/article');


// load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');




var PORT=3000;

// home route
app.get('/',(req,res)=>{
    article.find({},(err,res)=>{
        if(err){
            throw err;
        }
        else{
            res.render('index',{
                title:'hello world',
                articles:article
            });
        }

    });
    /*let articles=[{
        id:"1",
        title:"art-1",
        author:"Pranav"
    },
    {
        id:"2",
        title:"art-2",
        author:"john doe"
    },
    {
        id:"3",
        title:"art-3",
        author:"brad traversy"
    }];*/

});

// add route

app.get('/article/add',(req,res)=>{
    res.render('add',{
        title:'Add new article'
    });
});
/*
app.post('/article/add',(req,res)=>{
    console.log('gotta');
})
*/

app.listen(PORT);