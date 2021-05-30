// change sound on/off
$(document).ready(function(){
    $('#sound').click(function(){
            if ($(this).attr('src') === 'img/soundoff.png') {
               $(this).attr('src', 'img/soundon.png');
            }
            else {
                $(this).attr('src', 'img/soundoff.png');
            }
    });
});