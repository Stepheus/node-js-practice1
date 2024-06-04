const express = require("express");
const app = express();
const Blog = require("./models/blog");
const mongoose = require("mongoose");

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

//database blog

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

app.get("/add-blog", (req, res)=> {
    const blog = new Blog({
        name: "Ruth",
        about: "Outdoor patio",
        contact: {
            email: "ruth@gmail.com",
            phone: null
        }
    });

    blog.save()
        .then((result)=>{
            console.log("data sent to database");
            res.send(result);
        })
        .catch((err)=> console.log(err));
})


//to retrieve blogs from database
app.get("/all-blogs", (req, res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
})

//to retrieve a single blog
app.get("/single-blog", (req, res)=>{
    Blog.findById("6643a7c7759a342b1567335a") //id is given by Mongodb database
        .then((result)=> {
            console.log("Blog successfully retrieved")
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.use((req, res)=>{
    const page ="404-page";
    res.status(404).render("404.ejs"), {page};
})

