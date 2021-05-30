$(document).ready(function(){
    // fade in the title
    $('#title').show('puff', 1000);
    // animate some pokemons in the start TO DO
    $('#a').delay(1300).show('drop',{direction: 'left'}, 1000);
    $('#b').delay(2300).show('drop', {direction: 'right'}, 1000);
    // button clicking sound
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/click.wav');
        if ($('#sound').attr('src') == 'img/soundon.png') {
            audioElement.play();
        }
    $('#play').delay(3500).show('blind', 500);
    // play
    $('#play').click(function(){
        // redirect
        window.location.replace('game.html');
        });
    // play again
    $('#again').click(function(){
        window.location.reload('game.html');
    });
});