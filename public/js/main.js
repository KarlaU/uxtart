function esEmailValido(text){
  return /^(([A-z]+\d*[\._]?)+)@\w+\.\w{2,4}$/.test(text);
}

function esValido(nombre, email, msg){
  var valido = true;
  var mensajes = {
    obligatorio: 'Debes completar este campo para poder enviar el mensaje',
    formatoInvalido: 'Formato no válido, prueba con un formato de email válido'
  };

  $('.alert-warning').text('');

  if(nombre.val() === ''){
    nombre.parent().children('strong').text(mensajes.obligatorio);
    valido = false;
  }

  if(email.val() === ''){
    email.parent().children('strong').text(mensajes.obligatorio);
    valido = false;
  }else if(!esEmailValido(email.val())){
    email.parent().children('strong').text(mensaje.formatoInvalido);
    valido = false;
  }

  if(msg.val() === ''){
    msg.parent().children('strong').text(mensajes.obligatorio);
    valido = false;
  }

  return valido;
}

function enviarData(nombre, email, msg){
  var alertSuccess = $('.success');
  var data = {};
  alertSuccess.text('Tu mensaje ha sido enviado, te responderemos lo antes posible');

  data.nombre = nombre.val();
  data.email = email.val();
  data.msg = msg.val();

  $.post('/send', data, function(mje){
    console.log(mje);

    setTimeout(function(){
      alertSuccess.text('');
      nombre.val('');
      email.val('');
      msg.val('');
    }, 3000);
  });
}

function sendform(){
  var nombre = $('#name');
  var email = $('#email');
  var msg = $('#message');

  if(!esValido(nombre, email, msg)){
    return;
  }

  enviarData(nombre, email, msg);
}

$(window).scroll(function() {
  $('.stages-img').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow + 400) {
      $(this).addClass('appear');
    }
  });
});

$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();

  var target = this.hash;
  var $target = $(target);
  var animateOptions = { scrollTop: $target.offset().top };
  var callback = function callback(){
    window.location.hash = target;
  };

  $('html, body').stop().animate(animateOptions, 900, 'swing', callback);
});
