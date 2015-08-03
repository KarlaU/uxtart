var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");
var swig = require('swig');
var mailer = require("nodemailer");
var db = require('lowdb')('./db.json');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

if(process.env === 'production'){
    swig.setDefaults({ cache: true });
}else{
    swig.setDefaults({ cache: false });
}

//MAILER CONFIG.
// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "uxtartbot@gmail.com",
        pass: "alphayomega"
    }
});

var mail = {
    from: "uxtartbot <uxtartbot@gmail.com>",
    to: "hellouxtart@gmail.com",
    subject: "",
    text: "",
    html: ""
};

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

    mail.subject = "[Page] " + nombre;
    mail.text = "[Page] " + nombre;
    mail.html = "<p> nombre : " + nombre + "</p>" + "<p> email : " + email + "</p>" + "<p> Mensaje : " + msg + "</p>";

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });

    res.end("yes");
});

http.createServer(app).listen(1337, function(){
    console.log('corriendo el server');
});
