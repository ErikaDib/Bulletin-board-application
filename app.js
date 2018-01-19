var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var fs=require('fs');
var counter=0;


app.use(express.static(__dirname + '/views'));
/* Using the sessions */
app.use(session({secret: 'todotopsecret'}))


/* If there is no to do list in the session, 
we create an empty one in the form of an array before continuing */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* The to do list and the form are displayed */
.get('/index', function(req, res) { 
    
    res.render('index.ejs', {todolist: req.session.todolist});
})

/* Adding an item to the to do list */


.post('/index/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        
       var word=req.body.newtodo;
      
var keyValuePair="name: "+word[0]+", "+ "title: " + word[1]+", "+"message: "+word[2];
       counter++;
       fs.appendFile('board.json',"Key:"+counter+" "+keyValuePair+"\n");
        
        //req.session.todolist.push(req.body.newtodo);
        
        req.session.todolist.push(keyValuePair); 
    }
    res.redirect('/index');
})




/* Deletes an item from the to do list */
.get('/index/delete/:id', function(req, res) {
    if (req.params.id != '') {
        fs.truncate('board.json',0,function(){
            
            console.log('done')
                                             
                                             
                                             
                                             });
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/index');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/index');
})

.listen(3000);  





//console.log("starting app");
//
//var express=require('express');
//var app=express();
//
//var
//
//
//
//var server=app.listen(3000, listening);
//function listening(){
//    console.log("listening");
//}
//
//
//
//
//
//
//
//var name="";
//var title="";
//var message="";
//
//
//function getValues(){
//    name=document.getElementById("name").value;
//    title=document.getElementById("title").value;
//    message=document.getElementById("message").value;  
//    response.send(name);
//    
//}
//// console.log(name);
////console.log(title);
////console.log(message);
