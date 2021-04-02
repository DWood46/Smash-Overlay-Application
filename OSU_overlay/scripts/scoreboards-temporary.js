var pollingSpeed = 1000; //in ms

function updateInformation() {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://127.0.0.1:5000/information.json",
		success: function(json) {
			//player names
			swapText('#player1_tag', json.Player1.name);
			swapText('#player1d_tag', json.Player1.dubs_name);
			swapText('#player2_tag', json.Player2.name);
			swapText('#player2d_tag', json.Player2.dubs_name);
			//scores
			swapText('#player1_score', json.Player1.score);
			swapText('#player2_score', json.Player2.score);
			//topbar
			swapText('#round', json.round);
			//character images
			swapSrc('#player1_char', json.Player1.character);
			swapSrc('#player1d_char', json.Player1.dubs_character);
			swapSrc('#player2_char', json.Player2.character);
			swapSrc('#player2d_char', json.Player2.dubs_character);
			//casters
			swapText('#caster1', json.caster1);
			swapText('#caster2', json.caster2);
			if(json.is_doubles === "true") {
				swapText('#person1', json.Player1.name);
				swapText('#person2', json.Player1.dubs_name);
				swapText('#person3', json.Player2.name);
				swapText('#person4', json.Player2.dubs_name);
				if($('.background').attr('src') === 'static/img/intermission.png') {
					$('.background').attr('src', 'static/img/intermission-dubs.png');
				}
			}
			else {
				swapText('#person1', json.Player1.name);
				swapText('#person2', json.Player2.name);
				swapText('#person3', json.caster1);
				swapText('#person4', json.caster2);
				if($('.background').attr('src') === 'static/img/intermission-dubs.png') {
					$('.background').attr('src', 'static/img/intermission.png');
				}
			}
		}
	})
	setTimeout("updateInformation()", pollingSpeed);
}

function swapText(element, new_text) {
	if($(element).text() !== new_text) {
		$(element).fadeOut(100, function() {
			$(element).text(new_text);
			$(element).fadeIn(100);;
		});
	}
}

function swapSrc(element, new_src) {
	if($(element).attr('src') !== new_src) {
		$(element).fadeOut(100, function() {
			$(element).attr('src', new_src);
			$(element).fadeIn(100);;
		});
	}
}

$(document).ready(function() {
	updateInformation();
	setTimeout(function(){
		$('.background').fadeIn(500);
        setTimeout(function(){
			$('#ui').fadeIn(500);
			setTimeout(function(){
				$('#ui').fadeOut(500);
				setTimeout(function(){
					$('.background').fadeOut(500);
				}, 500);
			}, 6000);
		}, 500);
    }, 500);
});