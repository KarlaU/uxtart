var mailer = require('nodemailer');

var smtpTransport = mailer.createTransport('SMTP',{
  service: 'Gmail',
  auth: {
    user: 'uxtartbot@gmail.com',
    pass: 'alphayomega'
  }
});

function mailFactory(name, template){
  return {
    from: 'uxtartbot <uxtartbot@gmail.com>',
    to: 'hellouxtart@gmail.com',
    subject: '[Page]' + name,
    text: '[Page]' + name,
    html: template
  };
}

module.exports = function(name, address, msg, callback){
  var mail = mailFactory(name, template);
  var template = '<p>nombre : #{name}</p><p>email : #{email}</p><p>Mensaje : #{message}</p>';

  template = template
    .replace('#{name}', name)
    .replace('#{email}', address)
    .replace('#{message}', msg);

  smtpTransport.sendMail(mail, function(error, response){
    if(error){
      console.log(error);
      return;
    }

    callback(response);
  });
};
