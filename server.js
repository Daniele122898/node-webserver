const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

//HEROKU PORT
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine", "hbs");

app.use((req,res,next)=>{
    res.render("maintenance.hbs",{
        pageTitle:"Maintenance",
        message: "We'll be back shorty."
    })
});

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err)=>{
        if (err){
            console.log("Unable to append to server.log")
        }
    });
    next();
});

app.use(express.static(__dirname+"/public"));


hbs.registerHelper("getCurrentYear", ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text)=>{
    return text.toUpperCase();
});

app.get("/", (req, res)=>{
    //res.send("<h1>Hello Express!</h1>");
    /*res.send({
       name: "Andrew",
       Likes: [
           "Biking",
           "Fitness"
       ]
    });*/
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Hei there. Welcome to express!"
    });
});

app.get("/about", (req,res)=>{
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.listen(port, ()=>{
    console.log("Server is Up on port "+port)
});