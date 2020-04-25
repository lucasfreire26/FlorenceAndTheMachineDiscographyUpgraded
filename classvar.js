//this code was adapted from Mikhail's code at: https://github.com/mikhail-cct/CA1-In-class-Demo

var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xml2js = require('xml2js'),
    xmlParse = require('xslt-processor').xmlParse,
    // Sanitization
    expAutoSan = require('express-autosanitizer'),
    bodyParser = require("body-parser"),
    Album = require('./models/album'),
    convert = require('xml-js'),
    xsltProcess = require('xslt-processor').xsltProcess;


var router = express();
var server = http.createServer(router);
var albumCtrl = require('./album-controller')

//db 
mongoose = require( 'mongoose'),
require('dotenv').config;


router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.use(expAutoSan.all);


// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
};
//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
};



//defining routes for methods
router.post('/albums',albumCtrl.createAlbum);

router.post('/albums_submit', function(req, res) {
    albumCtrl.createAlbum(req,res);

    res.redirect('back');
})

router.get('/albums', albumCtrl.getAlbums);

router.get('/albums/:id', albumCtrl.getAlbum);

router.delete('/albums/:id', albumCtrl.deleteAlbum);
// update
router.put('/albums/:id', albumCtrl.updateAlbum);

router.get('/', function(req, res) {
     const index = fs.readFileSync('./views/Florence_Discography.html', 'utf-8');
     res.end(index);
})

router.get('/get/html', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

   var result = xsltProcess(doc, stylesheet);

   res.end(result.toString());
   

});

router.post('/post/json', function(req, res) {
    //console.log(req.body);



  // Call appendJSON function and pass in body of the current POST request

  appendJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');
 
});


// POST request to add to JSON & XML files
router.post('/post/delete', function(req, res) {
    console.log('deleting')


  // Call appendJSON function and pass in body of the current POST request
  deleteJSON(req.body);

});

//This is where the server is going to be listening to the user with a specified IP and Port

server.listen(process.env.PORT || 3000, process.env.IP, function(){
var addr = server.address();
console.log("Server is listening at", addr.address + ":" + addr.port)
});

//Using dotenv to hide db credentials
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URL);


//mongoose connector from class
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});