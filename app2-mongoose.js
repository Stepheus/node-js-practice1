const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Blog = require("./models/blog");
const Contact = require("./models/contact");

//Connect to MongoDB
const dbURI = "mongodb+srv://stepheniboudah:FTPOr3FTP@cluster0.ejxfuqg.mongodb.net/fenn-database?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
    .then((result)=> {
        console.log("connected to db database");
        app.listen(3000);
    })
    .catch((err) => console.log(err));
app.set("view engine", "ejs");

//CSS, javascript
app.use(express.static("public"));

//convert forms submissions into database blog
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    const page = "home";
    res.render("index.ejs", {page});    
})

app.get("/bathroom-services", (req, res)=>{
    const page = "bathroom-services";
    res.render("bathroom-services.ejs", {page});    
})

app.get("/flooring-services", (req, res)=>{
    const page = "flooring-services";
    res.render("flooring-services.ejs", {page});    
})

app.get("/kitchen-services", (req, res)=>{
    const page ="kitchen-services";
    res.render("kitchen-services.ejs", {page});    
})

app.get("/patio-services", (req, res)=>{
    const page ="patio-services";
    res.render("patio-services.ejs", {page});    
})

app.post("/contact-form", (req, res)=>{
    const contact = new Contact(req.body);
    contact.save()
        .then((result)=>{
            console.log("contact form sent to database");
            res.redirect("/");
            alert("Your message was sent");
        })
        .catch((err)=> console.log(err));
})


app.use((req, res)=>{
    const page ="404-page";
    res.status(404).render("404.ejs"), {page};
})

