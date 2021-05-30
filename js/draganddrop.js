$(document).ready(function(){
    // create pokemon images
    var dropped = 0;
    var pokemons = ["pikachu.png", "weedle.png", "eevee.png", "jigglypuff.png",
                "oddish.png", "diglett.png", "slowpoke.png", "venonat.png", 
                "poliwag.png"];
    var url = "img/";
    // create function for shuffling the array
    function shuffle(array) {
        var index1 = array.length, temp, index2;
        while (index1 != 0) {
            index2 = Math.floor(Math.random() * index1);
            index1 -= 1;
            temp = array[index1];
            array[index1] = array[index2];
            array[index2] = temp;
        }
        return array;
    }
    shuffle(pokemons);
    // function for showing pokemon images
    var i = 0;
    function addPokemon(i) {
        $('<img class="pokemon" src="'+url+pokemons[i]+'"/>').data('pokemon-name', pokemons[i])
        .appendTo('#draggablePokemon').hide().fadeIn(1000).draggable({
            revert: true
        });
    }
    // show first pokemon
    addPokemon(i);
    // define pokemon names
    var pokemonNames = ["pikachu", "weedle", "eevee", "jigglypuff", "oddish", 
                        "diglett", "slowpoke", "venonat", "poliwag"];
    // shuffle pokemon names for slots
    shuffle(pokemonNames);
    // create slots
    for (var j = 0; j < pokemonNames.length; j++) {
        $('<div class="box" id="'+pokemonNames[j]+'"><img class="empty" src="img/questionmark.png"/><p class="name">'+pokemonNames[j]+'</p></div>').data('image-name', pokemonNames[j])
            .appendTo('#grid').droppable({accept: '.pokemon', drop: handleDrop});
    }
    // handle drop event
    function handleDrop(event, ui) {
        // create audio element
        var audioElement = document.createElement('audio');
        // get the name in the slot
        var pokemonImg = $(this).data('image-name');
        // take .png away -> get the name of the dragged pokemon
        var pokemonName = ui.draggable.data('pokemon-name').replace('.png', '');
        // if they match, pic is no longer draggable neither slot droppable
        // pic is placed directly on top of the slot
        if (pokemonName == pokemonImg) {
            ui.draggable.addClass('correct');
            ui.draggable.draggable('disable');
            $(this).droppable('disable').fadeTo(1, 0.0);
            ui.draggable.position({of: $(this), my: 'center top', at: 'center top'});
            ui.draggable.draggable('option', 'revert', 'false');
            // play sound for correct
            audioElement.setAttribute('src', 'audio/correct.wav');
            if ($('#sound').attr('src') === 'img/soundon.png') {
                audioElement.play();
            }
            dropped++;
            // victory
            if(dropped === pokemons.length) {
                audioElement.setAttribute('src', 'audio/victory.wav');
                if ($('#sound').attr('src') === 'img/soundon.png') {
                    audioElement.play();
                }
                $("#info").text("You knew every Pokémon, good job!");
                $("#victory").show(1);
                $("#again").delay(1000).show(1);
            }
            // tell the player about progress
            else {
                $("#info").text("You got already " + dropped + " pokémons correct");
                // show new pokemon image
                i++;
                addPokemon(i);
            }
        }
        // play sound for false
        else {
            audioElement.setAttribute('src', 'audio/false.mp3');
            if ($('#sound').attr('src') === 'img/soundon.png') {
                audioElement.play();
            }
        }
    }
});