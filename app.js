const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  let firstName = req.body.fname
  let lastName = req.body.lname
  let email = req.body.email

  let data = {
    members: [
        {
          email_address: email,
          status:"subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
      }
    ]
  }

  app.post("/failure", function(req, res) {
    res.redirect("/")
  })

  const jsonData = JSON.stringify(data)
  const url = "https://us11.api.mailchimp.com/3.0/lists/4169ee5b8b"
  const options = {
    method: "post",
    auth: "ethan1:63u8d2bce88cf947d1df8fb71c71031ed-us11"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData)
  request.end()

})

app.listen(3000, function() {
  console.log("Running on port 3000.")
})

// API Key
// 638d2bce88cf947d1df8fb71c71031ed-us11
// Audience Id
// 4169ee5b8b