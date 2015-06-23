function sendform(){
    var nombre, email, msg = "", flag = true;
    
    nombre = $("#name");
    email = $("#email");
    msg = $("#message");

    $(".alert-warning").text('');

    if(nombre.val() == ""){
        nombre.parent().children('span').text('Campo obligatorio');
        flag = false;
    }

    if(email.val() == ""){
        email.parent().children('span').text('Campo obligatorio');
        flag = false;   
    }

    if(msg.val() == ""){
        msg.parent().children('span').text('Campo obligatorio');
        flag = false;
    }

    if(flag){
        
        $(".alert-success").text('Gracias por su consulta');

        $.ajax({
            url: "//formspree.io/hellouxtart@gmail.com", 
            method: "POST",
            data: {message: nombre.val()+' '+email.val()+' '+msg.val()},
            dataType: "json"
        });

        setTimeout(function(){
            $(".alert-success").text('');
            nombre.val('');
            email.val('');
            msg.val('');
        }, 2000);
        
    }
}