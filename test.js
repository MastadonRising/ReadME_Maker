var PDF = require('pdfkit');            //including the pdfkit module
var fs = require('fs');                 //including the file system module
var text = 'ANY_TEXT_YOU_WANT_TO_WRITE_IN_PDF_DOC';        //define a dummy text to be written in the file
var request = require('request');

const Project = {
    title: 'fas',
    description: 'fa',
    email: null,
    contents: 'Installation || Usage || License || Contributing || Tests  || Questions',
    pic: 'https://avatars3.githubusercontent.com/u/56978914?v=4',
    use: 'ga',
    license: '',
    test: '',
    questions: '',
    username: 'MastadonRising'
  }

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
  var text = generateText(Project)
doc = new PDF();                     //creating a new PDF object
doc.pipe(fs.createWriteStream('.\ReadME_Maker\profile.pdf'));  
//Now this is the code snippet to get the image using the url
request({
    url: Project.pic,
    encoding: null // Prevents Request from converting response to string
    }, function(err, response, body) {
    if (err) throw err;
// Inject the image with the required attributes
     doc.image(body,260, 50,{height:100,width:100});
    doc.text(text,80,165,{align:'center'})
    // Close document and, by extension, response
    doc.end(); 
    return;
});