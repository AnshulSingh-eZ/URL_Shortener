const express = require("express");
const mysql = require("mysql");

const app = express();

const con = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"Anshul@2006",
    database:"shorturls",
    port:3306
});
con.connect(function(error){
    if(error){
        console.log("Database Connection Failed!!  ", error);
    }
})

app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", function(request, response){
    response.sendFile(__dirname + "/public/index.html");
});

app.post("/api/createshorturl", function(request,response){
    let id = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
    let q =  `INSERT INTO links(longurl, shorturl) VALUES('${request.body.longurl}','${id}')`;
    con.query(q, function(error, result){
        if(error){
            response.status(500).json({
                status:"notok",
                message:"Something went Wrong!!"
            });
        }
        else{
            response.status(200).json({
                status:"ok",
                shorturl:id
            });
        }
    })
})
app.get("/api/getallshorturl", function(request, response){
    let q2 = `SELECT * FROM links`;
    con.query(q2, function(error, result){
        if(error){
            console.error("Error fetching data from DB:", error);
            response.status(500).json({
                status:"notok",
                message:"Something went wrong!!"
            });
        }
        else {
            console.log("Fetched data:", result);
            response.status(200).json(result);
        }
    });
});

app.listen(5000, () => {
    console.log('success!!');
});
