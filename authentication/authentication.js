const btnLogIn = $("#btn-log-in");
$("#login-form").submit(function(e){
  e.preventDefault();
  if( $("#btn-log-in").hasClass("button-loading") ) return;

  var form_url = $(this).attr("action"); //retrieve the form url
  var form_method = $(this).attr("method"); //retrieve the GET / POST method of the form
  var form_data = $(this).serialize(); //Encode the form elements for submission
  if($('#login_form input[type=text]').val()=="" || $('#login-form input[type=password]').val()==""){
    shake();
  }
  else{
    loading();
    $.ajax({
      url : form_url,
      type: form_method,
      data : form_data
    }).done(function(response){
        if(response!='') 
          window.location.href = "index.php";
        else{
          del_loading();
          shake();
        }
    });
  }
});

$("#register").dblclick(function(e){
  var form_url = $("#login-form").attr("action"); //retrieve the form url
  var form_method = "POST";
  var form_data = "username=Guest&password=Guest";
  loading();
  $.ajax({
    url : form_url,
    type: form_method,
    data : form_data
  }).done(function(response){
      if(response!='') 
        window.location.href = "index.php";
      else{
        del_loading();
        shake();
      }
  });
});

function loading(){
  $("span", btnLogIn).css("visibility", "hidden");
  btnLogIn.addClass("button-loading");
}

function del_loading(){
  btnLogIn.removeClass("button-loading", 2000);
  $("span", btnLogIn).css("visibility", "visible");
}

function shake(){
  btnLogIn.addClass("shake");
  setTimeout(del_shake, 1000);
}

function del_shake() {
  btnLogIn.removeClass("shake");
}