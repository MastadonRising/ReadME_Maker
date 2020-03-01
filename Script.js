const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util")
var PDF = require('pdfkit');     
var request = require('request');   

// constructor for Projects contains all pertinent data
Project = function(){
this.title= '',
this.description= '',
this.email='',
this.contents = "Installation || Usage || License || Contributing || Tests  || Questions",
this.pic ='',
this.use= '',
this.license= '',
this.test='',
this.questions='',
this.username= ''
}
const Proj = new Project();
// takes in the project object and generates standard text.

function generateText(Proj){
  const {title, description, email, contents, use, license} = Proj
  let text = ` 
  ***********************************
  *Title: ${title}           
  *Description: ${description}       
  *Email: ${email}                                                                
  *********************************** 
  * Table of Contents: ${contents}
  * Installation: Run npm Install
  * Usage: ${use}
  * License: ${license}
  * Contributing:  
  * Tests: 
  * Questions:
  `
return text;
}
// Asks the questions
function promptUser(){
  return inquirer.prompt([
    {
      type:'input',
      message: "What is your GitHub username?",
      name: "username"
    },
    {
      type:'input',
      message: "What is your Project's title?",
      name: "title"
    },
    {
      type:'input',
      message: "Please describe your project",
      name: "description"
    },
    {
      type:'list',
      message: "Please choose a license",
      name: "license",
      choices:[
        'MIT',
        'The Unlicense',
        'Mozilla Public License 2.0'
      ]
    },
    {
      type:'input',
      message: "Please describe your project's usage",
      name: "use"
    }
  ])};


promptUser()
  .then(function($answers) {
    let answers = $answers;
    // console.log(answers);
   Proj.username= answers.username;
   Proj.title = answers.title;
  })
  .then(function() {
    const queryUrl = `https://api.github.com/users/${Proj.username}`;
     axios
    .get(`${queryUrl}`)
    .then(function(res) {
      console.log(res);
      let data = res.data
      let {email, avatar_url} = data;
      Proj.pic = avatar_url
      console.log(Proj)
     });
    
    })
    .then(function(){
      var text = generateText(Proj);
      console.log(text);
    })
    .catch(function(err) {
    console.log(err);
    });
  //.then{ 
    //   doc = new PDF(); 
    //   doc.pipe(fs.createWriteStream('.\ReadME_Maker\profile.pdf'));  
    //   request({
    //     url: `${Project.pic}`,
    //     encoding: null // Prevents Request from converting response to string
    //     }, function(err, response, body) {
    //   if (err) throw err;
      
    //   doc.image(body,260, 50,{height:100,width:100});
    //   doc.text()
    //   doc.text('Hello this is a demo file',100,200)
    //   // Close document and, by extension, response
    //   doc.end(); 
    //   return;
    //   });
    // }


