const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "What is your username",
    name: "username"
  })
  .then(function({username}) {
    const queryUrl = `https://api.github.com/users/${username}`;
    
    axios
    .get(`${queryUrl}`)
    .then(function(res) {
      let data= res.data
      let {avatar_url, email } = data
      console.log(avatar_url)
      console.log(email)
        // console.log(res)

     });
     
    });