const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const PDF = require('pdfkit');     
const request = require('request');   

// constructor for Projects contains all pertinent data
const Project = function(){
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
  this.badge ='https://img.shields.io/github/status/contexts/pulls/MastadonRising/bs_portfolio/1110'
}

const Proj = new Project();
// takes in the project object and generates standard text
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
// Generate PDF
function generatePDF(text){
  doc = new PDF();                     //creating a new PDF object
  doc.pipe(fs.createWriteStream('.\ReadME_Maker\profile.pdf'));  
  //Now this is the code snippet to get the image using the url
  request({
  url: Proj.pic,
  encoding: null // Prevents Request from converting response to string
  }, function(err, response, body) {
  if (err) throw err;

  // Inject the image with the required attributes
  doc.text(text,50,50,{align:'left'})
  doc.image(body,50,250,{height:100,width:100});
  doc.end(); 
  return;
  });
}

promptUser()
  .then(function($answers) {
    let answers = $answers;
    Proj.username= answers.username;
    Proj.title = answers.title;
    Proj.use= answers.use;
    Proj.description = answers.description;
  })
    .then(function() {
      const queryUrl = `https://api.github.com/users/${Proj.username}`;
      return axios.get(`${queryUrl}`)  
    }).then(function(res) {
      let data = res.data;
      let {email, avatar_url} = data;
      Proj.pic = avatar_url;
      Proj.email= email;
    })
    .then(function()
    {
      var text = generateText(Proj);
      generatePDF(text);  
    })  
    .catch(function(err) {
    console.log(err);
    });