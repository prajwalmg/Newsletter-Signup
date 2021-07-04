
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/82175dbe56";

  const options = {
    method: "POST",
    auth: "MGprajwal:bf795bc20c031ee11ac5e5c5216f503a-us6"
  }

  const request1 = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request1.write(jsonData);
  request1.end();

})

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is listening to port 3000");
})


// API Key - bf795bc20c031ee11ac5e5c5216f503a-us6

// List ID - 82175dbe56
