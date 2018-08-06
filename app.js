const express = require("express");
var app = express();
const fs = require("fs");
var hbs = require("hbs");
app.set("view engine","hbs");
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper("current_month", ()=>{
    return new Date().getMonth();
} )
hbs.registerHelper("arg_helper",(text)=>{
  return   text.toUpperCase;
})

var port = process.env.PORT || 3000;
app.use((req,res,next)=>{
    console.log(`${req.method}`)
    var date= new Date().toString();
    console.log(date);
    var log = `${req.method} and time is ${date}`;
    fs.appendFile('logs.log',log,(err)=>{
        if(err)
        {
            console.log("cannot append logs");
        }
    })
    next();
})

app.use((req,res,next)=>{
    res.render('mainta');
})



app.get("/",(req,res)=>{
    // res.send("<h2>hi ther i am here</h2>");
    res.render("home",{
        aboutText:"welcome to the home page",
        todayDate :new Date().getDate(),
        dynamic:"yes this is dynamic this is loading from outside not inside",
        todayYear: new Date().getFullYear()
    });
});

app.get("/about",(req,res)=>{
    res.send("this is written by aSBJKANSJKNAJK");

})
app.get("/bad",(req,res)=>{
    res.send({
        errorMessage:"bad gateway"
    })
})

app.listen(port,()=>{
    console.log("server has started on port 3000");
});