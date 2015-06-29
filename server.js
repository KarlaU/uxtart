var http = require('http');
var express = require('express');
var swig = require('swig');
var app = express();

if(process.env === 'production'){
}else{
    swig.setDefaults({ cache: false });
}

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.use('/public', express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});

http.createServer(app).listen(1337, function(){
    console.log('corriendo el server');
});
