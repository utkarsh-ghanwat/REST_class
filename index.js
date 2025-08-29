const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

const posts = [
    {
        id:uuidv4(),
        username:"prem",
        content:"zxcvbnm"
    },
    {
        id:uuidv4(),
        username:"nachi",
        content:"qwertyuioop"
    },
    {
        id:uuidv4(),
        username:"sam",
        content:"asdfghjkl"
    },
]; 

app.get("/posts",(req, res) =>{            ///INDEX
    res.render("index.ejs",{ posts });
});

app.get("/posts/new",(req, res) => {     ///ADD NEW POST
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{          ///CREATE ID 
    let { username , content }=req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");               /// REDIRECT
});

app.get("/posts/:id", (req, res)=>{       ///  DETAIL OF 1 POST
    let { id }=req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" , {post});
});

app.patch("/posts/:id", (req, res)=>{            /// UPDATE
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id ===p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
}) 

app.get("/posts/:id/edit", (req, res)=>{            /// EDIT
    let {id} = req.params;
    let post = posts.find((p) => id ===p.id);
    res.render("edit.ejs", {post});
}) 


app.listen (port, () => {                             /// GEN
    console.log("listening to port : 8080");
}); 








