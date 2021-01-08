require('dotenv').config()
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.set("view engine","ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/",function(req,res){
    //console.log(req.body.city);

    const query=req.body.city;
    const apiKey=process.env.API_KEY;
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units="+ unit;
    https.get(url,function(response){
       // console.log(response);

        response.on("data",function(data){
          const weatherData= JSON.parse(data)
          const temp=weatherData.main.temp
          const weatherDesc=weatherData.weather[0].description
          const icon=weatherData.weather[0].icon
          const imgUrl="http://openweathermap.org/img/wn/"  + icon + "@2x.png";
            // console.log(temp);
            // console.log(weatherDesc);
            res.render("condition",{city:query, temperature:temp, weather:weatherDesc, image:imgUrl});

        })
    })
})

app.listen(3000,function(){
    console.log("Server Started at 3000");
});