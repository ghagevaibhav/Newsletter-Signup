const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
 
 
const mailchimp = require('@mailchimp/mailchimp_marketing');
 
mailchimp.setConfig({
  apiKey: '9f2b6b04bc25b3dba8c7a6c6d84d57e4-us9',
  server: 'us9',
});
 
  
const app = express()
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
  })
 
app.post("/", function(req, res) {
 
  var firstName = req.body.fName
  var lastName = req.body.lName
  var email =req.body.email
 
  
  const run = async () => {
    const response = await mailchimp.lists.batchListMembers("47e4d220c0", {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
 
      }],
    });
    console.log(response);
  };
  
  run();
  
 
})

app.listen(3000, function() {
    console.log("server started")    
})


// API Key
// 9f2b6b04bc25b3dba8c7a6c6d84d57e4-us9

//List ID
// 47e4d220c0