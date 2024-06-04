const express = require("express");
const app = express();
const nodemailer = require("nodemailer");


app.listen(3000, ()=>{
    console.log("Server listening on port 3000")
});


app.set("view engine", "ejs");

//CSS, javascript
app.use(express.static("public"));

//convert forms submissions into database blog
app.use(express.json());
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

app.post("/email-contact", (req, res)=>{
    console.log("Trying to post");
    console.log(req.body);
    //send form to email
    const transporter = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: "api",
            pass:"4652b51e8e53ab9888f8a2a93e8ce69f"
        }  
    });

   

    const mailOptions = {
        from: "richiefenn@fenn-construction.com",
        to: "richiefenn@fenn-construction.com",
        subject: `${req.body.usersubject} for ${req.body.username}`,
        text: `${req.body.usermessage}\n\nfrom${req.body.username}\n${req.body.usermail}`
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.error("On the server, Error:" + error);
            res.json({sent: false});
        }else{
            console.log("On the server, email sent:" + info.response);
            res.json({sent: true});
        }
    });
})


app.use((req, res)=>{
    const page ="404-page";
    res.status(404).render("404.ejs"), {page};
})

