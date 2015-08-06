var mailer = require('nodemailer');

//MAILER CONFIG.
// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport('SMTP',{
    service: 'Gmail',
    auth: {
        user: 'uxtartbot@gmail.com',
        pass: 'alphayomega'
    }
});

var Mail = {
    from: 'uxtartbot <uxtartbot@gmail.com>',
    to: 'hellouxtart@gmail.com',
    subject: '',
    text: '',
    html: ''
};

module.exports = function(name, address, msg, callback){
    var mail = Object.create(Mail);
    var template = '<p>nombre : #{name}</p><p>email : #{email}</p><p>Mensaje : #{message}</p>';
    template = template
        .replace('#{name}', name)
        .replace('#{email}', address)
        .replace('#{message}', msg);

    mail.subject = '[Page] ' + name;
    mail.text = '[Page] ' + name;
    mail.html = template;

    smtpTransport.sendMail(mail, callback);
};
