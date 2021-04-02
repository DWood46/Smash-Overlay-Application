var pollingSpeed = 1000; //in ms

function updateInformation() {
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://127.0.0.1:5000/top8.json",
		success: function(json) {
			//winners semis
			swapText('.winners .semis #set1 #p1 #tag', json.winners[0].p1.tag);
			swapText('.winners .semis #set1 #p1 #score', json.winners[0].p1.score);
			swapText('.winners .semis #set1 #p2 #tag', json.winners[0].p2.tag);
			swapText('.winners .semis #set1 #p2 #score', json.winners[0].p2.score);

			swapText('.winners .semis #set2 #p1 #tag', json.winners[1].p1.tag);
			swapText('.winners .semis #set2 #p1 #score', json.winners[1].p1.score);
			swapText('.winners .semis #set2 #p2 #tag', json.winners[1].p2.tag);
			swapText('.winners .semis #set2 #p2 #score', json.winners[1].p2.score);

			//winners final
			swapText('.winners .final #set1 #p1 #tag', json.winners[2].p1.tag);
			swapText('.winners .final #set1 #p1 #score', json.winners[2].p1.score);
			swapText('.winners .final #set1 #p2 #tag', json.winners[2].p2.tag);
			swapText('.winners .final #set1 #p2 #score', json.winners[2].p2.score);

			//grand final
			swapText('.winners .grands #set1 #p1 #tag', json.winners[3].p1.tag);
			swapText('.winners .grands #set1 #p1 #score', json.winners[3].p1.score);
			swapText('.winners .grands #set1 #p2 #tag', json.winners[3].p2.tag);
			swapText('.winners .grands #set1 #p2 #score', json.winners[3].p2.score);

			//loser gets 7th
			swapText('.losers .seventh #set1 #p1 #tag', json.losers[0].p1.tag);
			swapText('.losers .seventh #set1 #p1 #score', json.losers[0].p1.score);
			swapText('.losers .seventh #set1 #p2 #tag', json.losers[0].p2.tag);
			swapText('.losers .seventh #set1 #p2 #score', json.losers[0].p2.score);

			swapText('.losers .seventh #set2 #p1 #tag', json.losers[1].p1.tag);
			swapText('.losers .seventh #set2 #p1 #score', json.losers[1].p1.score);
			swapText('.losers .seventh #set2 #p2 #tag', json.losers[1].p2.tag);
			swapText('.losers .seventh #set2 #p2 #score', json.losers[1].p2.score);

			//losers quarters
			swapText('.losers .quarters #set1 #p1 #tag', json.losers[2].p1.tag);
			swapText('.losers .quarters #set1 #p1 #score', json.losers[2].p1.score);
			swapText('.losers .quarters #set1 #p2 #tag', json.losers[2].p2.tag);
			swapText('.losers .quarters #set1 #p2 #score', json.losers[2].p2.score);

			swapText('.losers .quarters #set2 #p1 #tag', json.losers[3].p1.tag);
			swapText('.losers .quarters #set2 #p1 #score', json.losers[3].p1.score);
			swapText('.losers .quarters #set2 #p2 #tag', json.losers[3].p2.tag);
			swapText('.losers .quarters #set2 #p2 #score', json.losers[3].p2.score);

			//losers semis
			swapText('.losers .semis #set1 #p1 #tag', json.losers[4].p1.tag);
			swapText('.losers .semis #set1 #p1 #score', json.losers[4].p1.score);
			swapText('.losers .semis #set1 #p2 #tag', json.losers[4].p2.tag);
			swapText('.losers .semis #set1 #p2 #score', json.losers[4].p2.score);

			//losers final
			swapText('.losers .final #set1 #p1 #tag', json.losers[5].p1.tag);
			swapText('.losers .final #set1 #p1 #score', json.losers[5].p1.score);
			swapText('.losers .final #set1 #p2 #tag', json.losers[5].p2.tag);
			swapText('.losers .final #set1 #p2 #score', json.losers[5].p2.score);
		}
	})
	setTimeout("updateInformation()", pollingSpeed);
}

function swapText(element, new_text) {
	if($(element).text() != new_text || ($(element).text() == '' && new_text == "0")) {
		$(element).fadeOut(100, function() {
			$(element).text(new_text);
			$(element).fadeIn(100);;
		});
	}
}

$(document).ready(function() {
	updateInformation();
	setTimeout(function(){
		$('#winners-bg').fadeIn(400);
        setTimeout(function(){
        	$('#losers-bg').fadeIn(400);
        	setTimeout(function(){
        		$('#ui').fadeIn(400);
        		$('.losers').hide();
        		setTimeout(function(){
        			$('.losers').fadeIn(400);
				}, 200);
			}, 200);
		}, 200);
    }, 500);
	$('.winners').fadeIn(500);
});