function esEmailValido(text){
    return /^(([A-z]+\d*[\._]?)+)@\w+\.\w{2,4}$/.test(text);
}

function esValido(nombre, email, msg){
    var valido = true;
    $(".alert-warning").text('');

    if(nombre.val() == ""){
        nombre.parent().children('span').text('Debes completar este campo para poder enviar el mensaje');
        valido = false;
    }

    if(email.val() == ""){
        email.parent().children('span').text('Debes completar este campo para poder enviar el mensaje');
        valido = false;   
    }else if(!esEmailValido(email.val())){
        email.parent().children('span').text('Este formato no es válido, prueba con un formato de email válido');
        valido = false;  
    }

    if(msg.val() == ""){
        msg.parent().children('span').text('Debes completar este campo para poder enviar el mensaje');
        valido = false;
    }

    return valido;
}

function enviarData(nombre, email, msg){
    var alertSuccess = $(".alert-success");
    alertSuccess.text('Gracias por su consulta');

    $.ajax({
        url: "//formspree.io/hellouxtart@gmail.com", 
        method: "POST",
        data: {message: nombre.val()+' '+email.val()+' '+msg.val()},
        dataType: "json"
    })
    .success(function(){
        alertSuccess.text('');
        nombre.val('');
        email.val('');
        msg.val('');
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
