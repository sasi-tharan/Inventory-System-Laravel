  
    function reloadPage()
    {
      location.reload();
    }

    $(document).ready(function(){



  /* insertion */
	$('.form').submit(function(e){
		e.preventDefault();
		$(this).find('.btn-submit').attr('disabled', 'disabled');
		var url = $(this).attr('cluster-url');
    if( typeof CKEDITOR !== "undefined" )
    {
        for (var i in CKEDITOR.instances) {
          CKEDITOR.instances[i].updateElement();
      };
    }
		var data = $(this).serializeArray();
		var current = $(this);

    var warning = $(this).attr('cluster-warning');
    if (typeof warning !== typeof undefined && warning !== false) {

    }
    else 
    {
      warning  = 'Please wait while we process your input....';
    }

		var redirect = $(this).attr('cluster-redirect');
    var after = $(this).attr('cluster-after');

		$(current).find('.error-main').html('<div class="alert alert-warning">' + warning + '</div>');
        window.location.href = '#body_part';
        var token = $(this).find('[name="_token"]').val();
        $.post(url, {data:data, _token:token}, function(res){
            $(current).find('.btn-submit').removeAttr('disabled');
        	   console.log(res);
            $(current).find('.error-main').html('<div class="alert alert-success">' + res.message + '</div>').show();
            $(current).find('.btn-submit').removeAttr('disabled');
            window.location.href = '#body_part';
            if (typeof after !== typeof undefined && after !== false) {
                eval(after);
            }

            if (res.hasOwnProperty('redirect')) {
               window.location.href = res.redirect;
               return;
            }

            if(redirect == 'edit')
            {
              window.location.href = 'edit.php?id=' + res.id;
              return;
            }
            else if (typeof redirect !== typeof undefined && redirect !== false) {
                window.location.href = redirect;
                return;
            }

        },'json')
      .fail(function(xhr) {

        $(current).find('.btn-submit').removeAttr('disabled');
        $(current).find('.error-main').html('<div class="alert alert-danger">Following errors are listed. Please check errors and resubmit the form.</div>').show();
        	$('.error-input').html('');
          var html = '';
          var res = xhr.responseJSON;
          console.log(xhr);
          if (typeof res === 'undefined') {
          	$(current).find('.error-main').html('<div class="alert alert-danger">Something went wrong</div>').show();
          }
          if (typeof res.error_description === 'undefined') {
          	if(typeof res.error_text === 'undefined')
          	{
            	$(current).find('.error-main').html('<div class="alert alert-danger">Something went wrong</div>').show();
            	window.location.href = '#body_part';
            	return;
            }
            else
            {
            	$(current).find('.error-main').html('<div class="alert alert-danger">' + res.error_text + '</div>').show();
            	window.location.href = '#body_part';
            	return;
            }
          }
        
        // var res1 = $.parseJSON('"' + res + '"');
         $.each(res.error_description, function(i, value) {
         		var parent = $(current).find("[name='" + i + "']").parents('.input-container').first();
         		$(parent).find('.error-input').append('<div class="alert alert-danger alert-flat">' + value + '</div>');
              
          });
          
          
          window.location.href = '#body_part';
      },'json');;
  });

if ($(".file_url").length > 0) {
  var url = $('.file_url').val();
    $('.fileupload').fileupload({
          url: url,
          dataType: 'json',
          submit: function(e,data){
            var parent = $(this).parents('.file_upload_container').first();
            $(parent).find('.files_area').html('');
            $(parent).find('.error_area').html('<div class="alert alert-warning">Upload in progress</div>');
            $(parent).find('.progress .progress-bar').removeAttr('style');


          },
          done: function (e, data) {
              /*$.each(data.result.files, function (index, file) {
                  console.log(file);
              });*/
             
              var parent = $(this).parents('.file_upload_container').first();
             
              
              $(parent).find('.error_area').html('<div class="alert alert-success">' + data.result.message + '</div>');
              $(parent).find('.file_url').val(data.result.file);
               $(parent).find('.files_area').html('<img src="' + data.result.link + '" style="max-width:40px" />');
          },
          fail: function (e, data) {
            var parent = $(this).parents('.file_upload_container').first();
            $(parent).find('.error_area').html('<div class="alert alert-danger">' + data.jqXHR.responseJSON.error_text + '</div>');
            $(parent).find('.progress .progress-bar').css(
                  'background-color',
                  'salmon'
              );
          },
          progressall: function (e, data) {
            var parent = $(this).parents('.file_upload_container').first();
              var progress = parseInt(data.loaded / data.total * 100, 10);
               $(parent).find('.progress .progress-bar').css(
                  'width',
                  progress + '%'
              );
          }
      }).prop('disabled', !$.support.fileInput)
          .parent().addClass($.support.fileInput ? undefined : 'disabled');
   
  }

});

  function checkStatus(id, obj)
  {
    $.get('/veikals/get_checkout?id=' + id, function(res){
      if(res.cl_status == 'Payment Received')
      {
        cardWindow.close();
        window.location.href = 'success?type=card&id=' + id;
      }
      else if(res.cl_transaction_result == 'cancelled' || res.cl_transaction_result == 'failed')
      {
        $(current).find('.error-main').html('<div class="alert alert-danger">We are sorry. We could not process your payment. Please try again later</div>').show();
      }
    },'json');
  }

/* insertion */
  $(document).on('submit', '.form_checkout_old', function(e){
    e.preventDefault();
    $(this).find('.btn-submit').attr('disabled', 'disabled');
    var url = $(this).attr('cluster-url');
    if( typeof CKEDITOR !== "undefined" )
    {
        for (var i in CKEDITOR.instances) {
          CKEDITOR.instances[i].updateElement();
      };
    }
    var data = $(this).serializeArray();
    var current = $(this);

    var warning = $(this).attr('cluster-warning');
    if (typeof warning !== typeof undefined && warning !== false) {

    }
    else 
    {
      warning  = 'Please wait while we process your input....';
    }

    var redirect = $(this).attr('cluster-redirect');
    var after = $(this).attr('cluster-after');

    $(current).find('.error-main').html('<div class="alert alert-warning col-xs-12">' + warning + '</div>');
        window.location.href = '#body_part';
        $.post(url, {data:data}, function(res){
            $(current).find('.btn-submit').removeAttr('disabled');
            $(current).find('.error-main').html('<div class="alert alert-success col-xs-12">' + res.message + '</div>').show();
            $(current).find('.btn-submit').removeAttr('disabled');
            window.location.href = '#body_part';
            var id = res.id;
            if(res.payment_type == 'Card')
            {
              // window.location.href = '/swedbank_pay?id=' + id;
              cardWindow = window.open(res.url, 'Credit Card Pop Up', 'width=400, height=640');

              window.setInterval(function(){
                checkStatus(id, current);
              }, 10000);
              
             // window.location.href = 'success';
            /*  $('#iframePaymentModal').modal('show');
              $('#iframe_payment').append('<iframe  frameBorder="0" style="height: 470px;width: 100%;" src="payment.php?reference=' + id + '"></iframe>');
              $('#close_btn_payment').attr('href', 'success?reference=' + id);
              //window.location.href = 'payment?reference=' + id; */
            }
            else
            {
              window.location.href = 'success?type=' + res.payment_type;
            }
            

        },'json')
      .fail(function(xhr) {

        $(current).find('.btn-submit').removeAttr('disabled');
        $(current).find('.error-main').html('<div class="alert alert-danger col-xs-12">Following errors are listed. Please check errors and resubmit the form.</div>').show();
          $('.error-input').html('');
          var html = '';
          var res = xhr.responseJSON;
          console.log(xhr);
          if (typeof res === 'undefined') {
            $(current).find('.error-main').html('<div class="alert alert-danger col-xs-12">Something went wrong</div>').show();
          }
          if (typeof res.error_description === 'undefined') {
            if(typeof res.error_text === 'undefined')
            {
              $(current).find('.error-main').html('<div class="alert alert-danger col-xs-12">Something went wrong</div>').show();
              window.location.href = '#body_part';
              return;
            }
            else
            {
              $(current).find('.error-main').html('<div class="alert alert-danger col-xs-12">' + res.error_text + '</div>').show();
              window.location.href = '#body_part';
              return;
            }
          }
        
        // var res1 = $.parseJSON('"' + res + '"');
         $.each(res.error_description, function(i, value) {
            var parent = $(current).find("[name='" + i + "']").parents('.input-container').first();
            $(parent).find('.error-input').append('<div class="alert alert-danger alert-flat">' + value + '</div>');
              
          });
          
          
          window.location.href = '#body_part';
      },'json');
    });



$(document).on('submit', '.form_checkout', function(e){
    e.preventDefault();
   /* if(!$('#terms_of_use').is(':checked'))
    {
      alert('Please check terms');
      return;
    }*/

    var text = $('#mobile').val();
    var length = text.length;
    var country = $('#country').val();
   
    if(country == 'Latvija')
    {
        if(length != 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Latvija Phone Numbers should have 8 digits</div>');
            return;
        }
    }
    else if(country == 'Austria')
    {
        if(length > 13 || length < 4)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Austria Phone Numbers should be between 4 & 13 digits</div>');
            return;
        }
    }
    else if(country == 'Italu')
    {
        if(length > 12 || length < 6)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Italu Phone Numbers should be between 6 & 12 digits</div>');
            return;
        }
    }
    else if(country == 'Belgium')
    {
        if(length > 10 || length < 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Belgium Phone Numbers should be between 8 & 10 digits</div>');
            return;
        }
    }
    else if(country == 'Bulgaria')
    {
        if(length > 9 || length < 7)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Bulgaria Phone Numbers should be between 7 & 9 digits</div>');
            return;
        }
    }
    else if(country == 'Lithuania')
    {
        if(length > 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Lithuania Phone Numbers should be 8 digits</div>');
            return;
        }
    }
    else if(country == 'Croati')
    {
        if(length > 9 || length < 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Croati Phone Numbers should be between 8 & 9 digits</div>');
            return;
        }
    }
    else if(country == 'Luxembourg')
    {
        if(length != 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Luxembourg Phone Numbers should be 8 digits</div>');
            return;
        }
    }
    else if(country == 'Cyprus')
    {
        if(length != 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Cyprus Phone Numbers should be 8 digits</div>');
            return;
        }
    }
    else if(country == 'Malta')
    {
        if(length != 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Malta Phone Numbers should be 8 digits</div>');
            return;
        }
    }
    else if(country == 'Czechia')
    {
        if(length != 9)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Czechia Phone Numbers should be 9 digits</div>');
            return;
        }
    }
    else if(country == 'Netherlands')
    {
        if(length != 9)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Netherlands Phone Numbers should be 9 digits</div>');
            return;
        }
    }
    else if(country == 'Denmark')
    {
        if(length != 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Denmark Phone Numbers should be 8 digits</div>');
            return;
        }
    }
    else if(country == 'Poland')
    {
        if(length != 9)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Poland Phone Numbers should be 9 digits</div>');
            return;
        }
    }
    else if(country == 'Estonia')
    {
        if(length > 8 || length < 7)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Estonia Phone Numbers should be between 7 & 8 digits</div>');
            return;
        }
    }
    else if(country == 'Portugal')
    {
        if(length != 9)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Portugal Phone Numbers should be 9 digits</div>');
            return;
        }
    }
    else if(country == 'Finland')
    {
        if(length > 12 || length < 5)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Finland Phone Numbers should be between 5 & 12 digits</div>');
            return;
        }
    }
    else if(country == 'Romania')
    {
        if(length != 9)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Romania Phone Numbers should be 9 digits</div>');
            return;
        }
    }
    else if(country == 'France')
    {
        if(length != 9)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">France Phone Numbers should be 9 digits</div>');
            return;
        }
    }
    else if(country == 'Slovakia')
    {
        if(length != 9)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Slovakia Phone Numbers should be 9 digits</div>');
            return;
        }
    }
    else if(country == 'Germany')
    {
        if(length > 12 || length < 3)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Germany Phone Numbers should be between 3 & 12 digits</div>');
            return;
        }
    }
    else if(country == 'Slovenia')
    {
        if(length != 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Slovenia Phone Numbers should be 8 digits</div>');
            return;
        }
    }
    else if(country == 'Greece')
    {
        if(length != 10)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Greece Phone Numbers should be 10 digits</div>');
            return;
        }
    }
    else if(country == 'Spain')
    {
        if(length != 9)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Spain Phone Numbers should be 9 digits</div>');
            return;
        }
    }
    else if(country == 'Hungary')
    {
        if(length > 9 || length < 8)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Hungary Phone Numbers should be between 8 & 9 digits</div>');
            return;
        }
    }
    else if(country == 'Sweden')
    {
        if(length > 9 || length < 6)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Sweden Phone Numbers should be between 6 & 9 digits</div>');
            return;
        }
    }
    else if(country == 'Ireland')
    {
        if(length > 10 || length < 7)  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">Ireland Phone Numbers should be between 7 & 10 digits</div>');
            return;
        }
    }
    else if(country == 'United Kingdom')
    {
        if(length > 10 || (length < 9 && length != 7))  
        {
          window.location.href = '#body_part';
            $(this).find('.error-main').html('<div class="alert alert-danger">United Kingdom Phone Numbers should be between 9 & 10 digits or 7 digit</div>');
            return;
        }
    }
    else if(country == 'India')
    {
        if(length != 10)  
        {
          window.location.href = '#body_part';
             $(this).find('.error-main').html('<div class="alert alert-danger">Indian Phone Numbers should be 10 digits</div>');
            return;
        }
    }
    else
    {
        return;
    }


    $(this).find('.btn-submit').attr('disabled', 'disabled');
    var url = $(this).attr('cluster-url');
    if( typeof CKEDITOR !== "undefined" )
    {
        for (var i in CKEDITOR.instances) {
          CKEDITOR.instances[i].updateElement();
      };
    }
    var data = $(this).serializeArray();
    var current = $(this);

    var warning = $(this).attr('cluster-warning');
    if (typeof warning !== typeof undefined && warning !== false) {

    }
    else 
    {
      warning  = 'Please wait while we process your input....';
    }

    var redirect = $(this).attr('cluster-redirect');
    var after = $(this).attr('cluster-after');

    $(current).find('.error-main').html('<div class="alert alert-warning col-xs-12">' + warning + '</div>');
        window.location.href = '#body_part';
        $.post(url, {data:data}, function(res){
            $(current).find('.btn-submit').removeAttr('disabled');
            $(current).find('.error-main').html('<div class="alert alert-success col-xs-12">' + res.message + '</div>').show();
            $(current).find('.btn-submit').removeAttr('disabled');
            window.location.href = '#body_part';
            var id = res.id;
            if(res.payment_type == 'Card' || res.payment_type == 'Online Banking')
            {
              $(current).find('.error-main').html('<div class="alert alert-warning col-xs-12">' + res.message + '.</div>');
              window.location.href = res.redirect;
            }
            else
            {
              window.location.href = 'success?type=' + res.payment_type;
            }
            

        },'json')
      .fail(function(xhr) {

        $(current).find('.btn-submit').removeAttr('disabled');
        $(current).find('.error-main').html('<div class="alert alert-danger col-xs-12">Following errors are listed. Please check errors and resubmit the form.</div>').show();
          $('.error-input').html('');
          var html = '';
          var res = xhr.responseJSON;
          console.log(xhr);
          if (typeof res === 'undefined') {
            $(current).find('.error-main').html('<div class="alert alert-danger col-xs-12">Something went wrong</div>').show();
          }
          if (typeof res.error_description === 'undefined') {
            if(typeof res.error_text === 'undefined')
            {
              $(current).find('.error-main').html('<div class="alert alert-danger col-xs-12">Something went wrong</div>').show();
              window.location.href = '#body_part';
              return;
            }
            else
            {
              $(current).find('.error-main').html('<div class="alert alert-danger col-xs-12">' + res.error_text + '</div>').show();
              window.location.href = '#body_part';
              return;
            }
          }
        
        // var res1 = $.parseJSON('"' + res + '"');
         $.each(res.error_description, function(i, value) {
            var parent = $(current).find("[name='" + i + "']").parents('.input-container').first();
            $(parent).find('.error-input').append('<div class="alert alert-danger alert-flat">' + value + '</div>');
              
          });
          
          
          window.location.href = '#body_part';
      },'json');
    });


 $(document).on('click','.btn-delete', function(){
      var conf = confirm("Are you sure you want to delete this?");
    if(!conf)
    {
      return;
    }
    var current = $(this);
    $(current).attr('disabled', 'disabled');
    var mainParent = $(this).parents('tr').first();
    var url = $(this).attr('cluster-href');
    if (typeof url === 'undefined') {
      $(mainParent).remove();
      return;
    }
    var parent = $(this).parents('.action-container').first();
    
    var id = $(current).attr('cluster-id');

    $(parent).find('.error-input').html('<div class="alert alert-warning">Please wait while we delete data....</div>');
          $.post(url, {id:id}, function(res){
          
              $(mainParent).remove();
          },'json')
        .fail(function(xhr) {

          $(current).removeAttr('disabled');
            
            var html = '';
            var res = xhr.responseJSON;

            if (typeof res === 'undefined') {
              $(parent).find('.error-input').html('<div class="alert alert-danger">Something went wrong</div>').show();
              return;
            }
            if (typeof res.error_description === 'undefined') {
              if(typeof res.error_text === 'undefined')
              {
                $(parent).find('.error-input').html('<div class="alert alert-danger">Something went wrong</div>').show();
               
                return;
              }
              else
              {
                $(parent).find('.error-input').html('<div class="alert alert-danger">' + res.error_text + '</div>').show();
                return;
              }
            }
          
        },'json');;
    });


 $(document).on('click','.btn-link', function(){
    
      var confirmMessage = $(this).attr('cluster-confirm');
      if (typeof confirmMessage !== typeof undefined && confirmMessage !== false) {
        var conf = confirm(confirmMessage);
        if(!conf)
        {
          return;
        }
      }
      
      var table = $(current).attr('data-table');
      if (typeof table !== typeof undefined && table !== false) {
        var parent = $(this).parents('tr').first();
      }
      else
      {
        var parent = $(this).parents('.btn-container').first();
      }        
      
      
      var current = $(this);
      $(this).attr('disabled', 'disabled');
      var href = $(this).attr('cluster-url');
      var current = $(this);
      var message = $(this).attr('cluster-message');
      $(parent).find('.error-area').html('<div class="alert alert-warning">' + message + '</div>');
      $.post(href, function(res){
        $(current).removeAttr('disabled');
        $(parent).find('.error-area').html('<div class="alert alert-success">' + res.message + '</div>');

      },'json').fail(function(xhr){
        $(current).removeAttr('disabled');
        $(parent).find('.error-area').html('<div class="alert alert-danger">' + xhr.responseJSON.error_text + '</div>');
        
      },'json');
      
  });


 $(document).on('click','.btn-link-new', function(e){
      e.preventDefault();
      var confirmMessage = $(this).attr('cluster-confirm');
      if (typeof confirmMessage !== typeof undefined && confirmMessage !== false) {
        var conf = confirm(confirmMessage);
        if(!conf)
        {
          return;
        }
      }

      var current = $(this);
      
      var table = $(current).attr('cluster-table');
      if (typeof table !== typeof undefined && table !== false && table == 1) {
        var parent = $(this).parents('td').first();
      }
      else
      {
        var parent = $(this).parents('.btn-container').first();
      }        
      
      
      
      $(this).attr('disabled', 'disabled');
      var href = $(this).attr('cluster-url');
      var current = $(this);
      var message = $(this).attr('cluster-message');
      var redirect = $(this).attr('cluster-redirect');
      var after = $(this).attr('cluster-after');
      $(parent).find('.error-area').html('<div class="alert alert-warning">' + message + '</div>');
      $.post(href, function(res){
        $(current).removeAttr('disabled');
       
        $(parent).find('.error-area').html('<div class="alert alert-success">' + res.message + '</div>');
         if (typeof after !== typeof undefined && after !== false) {
              eval(after);
          }

        var clusterChangeTr = $(current).attr('cluster-change-tr');
        if(typeof clusterChangeTr !== typeof undefined && clusterChangeTr !== false)
        {
          var mainParent = $(current).parents('tr').first();
          $(mainParent).find('.' + clusterChangeTr).html(res.change);
        }

         if (typeof table !== typeof undefined && table !== false && table == 1) {
          var clear = $(current).attr('cluster-clear');
          if(typeof clear !== typeof undefined && clear !== false && clear == 1)
          {
            $(parent).html('');
          }
          
        }



        if (typeof redirect !== typeof undefined && redirect !== false) {
                window.location.href = redirect;
            }


      },'json').fail(function(xhr){
        $(current).removeAttr('disabled');
        $(parent).find('.error-area').html('<div class="alert alert-danger">' + xhr.responseJSON.error_text + '</div>');
        
      },'json');
      
  });



 