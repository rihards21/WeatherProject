const express = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
 
const app = express();
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
 
client.setConfig({
  apiKey:  "73a8097901f6abe4a3e6784c8cea874b-us20",
  server: "us20",
});
 
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
 
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
 
  //funkcija ar var sanjemt informaciju no ievaditajiem datiem
  const run = async () => {
    const response = await client.lists.addListMember("f77f80954c", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,

        
      },
      
    });

    // pec darbibas brauzeri izdod shiis atbilde vienu no 2
    // ja sakriit ar 200 tad serveris iet
    if (response.statusCode === 200, 201, 202, 203, 204, 205){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure");
    }
   
  };
  run();
});
 
app.post("/failure", function(req, res){
    res.redirect("/");
})
// process.env.Port tas ir priek';s heroku, lai viņi izvēlās,kur hostot
//|| ir lai mees varam arii localhaustaa paarbaudiit wbsite
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

// apikey =     73a8097901f6abe4a3e6784c8cea874b-us20

// id =    f77f80954c