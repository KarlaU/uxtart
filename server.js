var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");
var swig = require('swig');
var db = require('lowdb')('./db.json');
var app = express();
var emailer = require(__dirname + '/emailer.js');

app.use(bodyParser.urlencoded({ extended: false }));

if(process.env === 'production'){
    swig.setDefaults({ cache: true });
}else{
    swig.setDefaults({ cache: false });
}

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.use('/public', express.static('public'));

app.get('/', function(req, res){
    var servicios = db('servicios').value();
    var etapas = db('etapas').value();

    res.render('index',{
        servicios: servicios,
        etapas: etapas
    });
});

app.post('/send', function(req, res){
    var nombre = req.body.nombre;
    var email = req.body.email;
    var msg = req.body.msg;

    emailer(nombre, email, msg, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + response.message);
        }
    });

    res.end('yes');
});

http.createServer(app).listen(1337, function(){
    console.log('corriendo el server');
});
