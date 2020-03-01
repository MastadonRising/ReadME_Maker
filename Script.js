const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const PDF = require('pdfkit');     
const request = require('request');   

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
       axios
      .get(`${queryUrl}`)
        .then(function(res) {
          let data = res.data;
          let {email, avatar_url} = data;
          Proj.pic = avatar_url;
          Proj.email= email;
          console.log(Proj);
        });
    })
    .then(function()
    {
      var text = generateText(Proj);
      console.log(text);
      generatePDF();  
    })  
    .catch(function(err) {
    console.log(err);
    });