var PDF = require('pdfkit');            //including the pdfkit module
var fs = require('fs');                 //including the file system module

var text = 'ANY_TEXT_YOU_WANT_TO_WRITE_IN_PDF_DOC';        //define a dummy text to be written in the file
var request = require('request');
doc = new PDF();                        //creating a new PDF object
doc.pipe(fs.createWriteStream('.\ReadME_Maker\profile.pdf'));  
 request({
         url: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
         encoding: null // Prevents Request from converting response to string
         }, function(err, response, body) {
        if (err) throw err;
// Inject the image with the required attributes
        doc.image(body,260, 50,{height:100,width:100});
        doc.text('HOLIDAYS - 125 Fortime',80,165,{align:'center'})
        doc.text('Hello this is a demo file',100,200)
// Close document and, by extension, response
        doc.end(); 
        return;
    });