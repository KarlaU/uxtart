function esEmailValido(text){
    return /^(([A-z]+\d*[\._]?)+)@\w+\.\w{2,4}$/.test(text);
}

function esValido(nombre, email, msg){
    var valido = true;
    $(".alert-warning").text('');

    if(nombre.val() == ""){
        nombre.parent().children('strong').text('Debes completar este campo para poder enviar el mensaje');
        valido = false;
    }

    if(email.val() == ""){
        email.parent().children('strong').text('Debes completar este campo para poder enviar el mensaje');
        valido = false;   
    }else if(!esEmailValido(email.val())){
        email.parent().children('strong').text('Formato no válido, prueba con un formato de email válido');
        valido = false;  
    }

    if(msg.val() == ""){
        msg.parent().children('strong').text('Debes completar este campo para poder enviar el mensaje');
        valido = false;
    }

    return valido;
}

function enviarData(nombre, email, msg){
    var alertSuccess = $(".success");
    alertSuccess.text('Tu mensaje ha sido enviado, te responderemos lo antes posible');


    $.post( "/send", {"nombre": nombre.val(), "email": email.val(), "msg":msg.val()}, function( data ) {
        nombre.val('');
        email.val('');
        msg.val('');
        setTimeout(function(){
            alertSuccess.text('');
        }, 5000);
    });

}

function sendform(){
    var nombre = $("#name");
    var email = $("#email");
    var msg = $("#message");

    if(!esValido(nombre, email, msg)){
        return;
    }

    enviarData(nombre, email, msg);
}
/*animated shit*/

$(window).scroll(function() {
    $('.stages-img').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+400) {
            $(this).addClass("appear");
        }
    });
});

$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});