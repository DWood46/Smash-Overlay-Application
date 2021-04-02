is_doubles = false;
var obs;

$(document).ready(function(){
	obs = new OBSWebSocket();
	url = window.location.href;
	var arr = url.split(":");
	var ip = arr[1].substr(2, this.length);
	obsurl = ip + ':4444';
	console.log(obsurl);
	obs.connect({
		address: obsurl, password: 'password'
		})
		.then(() => {
			$("#scenes").show();
			$("#update_scene").show();
			obs.send(
				'GetSceneList', {}
			)
			.then(function(value) {
				value["scenes"].forEach(function(scene) {
					$("#scenes").append(new Option(scene["name"], scene["name"]));
				})
				$("#scenes").val(value["current-scene"])
		  		//console.log(value);
		  	})
		})
		.catch(err => {
        	console.log(err);
    	});

	if($(".toggle_doubles").attr("value") === "true") {
		is_doubles = false;
	} else {
		is_doubles = true;
	}

	promise1 = obs.send('GetSceneList', {});
	promise1.then(function(value) {
	  	console.log(value);
	});

	$.getJSON("/database.json", function(data) {
		data["players"].forEach(function(player) {
			$("#p1_select").append(new Option(player["tag"], player["character"]));
			$("#p2_select").append(new Option(player["tag"], player["character"]));
		});
	});

	toggle_doubles();

	$("#bowser1").click(function(){
		set(1, 1, "bowser", "green");
		set(1, 2, "bowser", "red");
		set(1, 3, "bowser", "blue");
		set(1, 4, "bowser", "black");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#captainfalcon1").click(function(){
		set(1, 1, "captainfalcon", "original");
		set(1, 2, "captainfalcon", "dark");
		set(1, 3, "captainfalcon", "red");
		set(1, 4, "captainfalcon", "white");
		set(1, 5, "captainfalcon", "green");
		set(1, 6, "captainfalcon", "blue");
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#donkeykong1").click(function(){
		set(1, 1, "donkeykong", "original");
		set(1, 2, "donkeykong", "dark");
		set(1, 3, "donkeykong", "red");
		set(1, 4, "donkeykong", "blue");
		set(1, 5, "donkeykong", "green");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#drmario1").click(function(){
		set(1, 1, "drmario", "original");
		set(1, 2, "drmario", "red");
		set(1, 3, "drmario", "blue");
		set(1, 4, "drmario", "green");
		set(1, 5, "drmario", "black");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#falco1").click(function(){
		set(1, 1, "falco", "original");
		set(1, 2, "falco", "red");
		set(1, 3, "falco", "blue");
		set(1, 4, "falco", "green");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#fox1").click(function(){
		set(1, 1, "fox", "original");
		set(1, 2, "fox", "red");
		set(1, 3, "fox", "blue");
		set(1, 4, "fox", "green");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#ganondorf1").click(function(){
		set(1, 1, "ganondorf", "original");
		set(1, 2, "ganondorf", "red");
		set(1, 3, "ganondorf", "blue");
		set(1, 4, "ganondorf", "green");
		set(1, 5, "ganondorf", "purple");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#iceclimbers1").click(function(){
		set(1, 1, "iceclimbers", "blue");
		set(1, 2, "iceclimbers", "green");
		set(1, 3, "iceclimbers", "yellow");
		set(1, 4, "iceclimbers", "red");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#jigglypuff1").click(function(){
		set(1, 1, "jigglypuff", "original");
		set(1, 2, "jigglypuff", "red");
		set(1, 3, "jigglypuff", "blue");
		set(1, 4, "jigglypuff", "green");
		set(1, 5, "jigglypuff", "gold");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#kirby1").click(function(){
		set(1, 1, "kirby", "original");
		set(1, 2, "kirby", "yellow");
		set(1, 3, "kirby", "blue");
		set(1, 4, "kirby", "red");
		set(1, 5, "kirby", "green");
		set(1, 6, "kirby", "white");
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#link1").click(function(){
		set(1, 1, "link", "green");
		set(1, 2, "link", "red");
		set(1, 3, "link", "blue");
		set(1, 4, "link", "black");
		set(1, 5, "link", "white");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#luigi1").click(function(){
		set(1, 1, "luigi", "green");
		set(1, 2, "luigi", "white");
		set(1, 3, "luigi", "blue");
		set(1, 4, "luigi", "red");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#mario1").click(function(){
		set(1, 1, "mario", "red");
		set(1, 2, "mario", "yellow");
		set(1, 3, "mario", "black");
		set(1, 4, "mario", "blue");
		set(1, 5, "mario", "green");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#marth1").click(function(){
		set(1, 1, "marth", "blue");
		set(1, 2, "marth", "red");
		set(1, 3, "marth", "green");
		set(1, 4, "marth", "dark");
		set(1, 5, "marth", "white");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#mewtwo1").click(function(){
		set(1, 1, "mewtwo", "original");
		set(1, 2, "mewtwo", "red");
		set(1, 3, "mewtwo", "blue");
		set(1, 4, "mewtwo", "green");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#gameandwatch1").click(function(){
		set(1, 1, "gameandwatch", "original");
		set(1, 2, "gameandwatch", "red");
		set(1, 3, "gameandwatch", "blue");
		set(1, 4, "gameandwatch", "green");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#ness1").click(function(){
		set(1, 1, "ness", "red");
		set(1, 2, "ness", "gold");
		set(1, 3, "ness", "blue");
		set(1, 4, "ness", "green");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#peach1").click(function(){
		set(1, 1, "peach", "red");
		set(1, 2, "peach", "gold");
		set(1, 3, "peach", "white");
		set(1, 4, "peach", "blue");
		set(1, 5, "peach", "green");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#pichu1").click(function(){
		set(1, 1, "pichu", "original");
		set(1, 2, "pichu", "red");
		set(1, 3, "pichu", "blue");
		set(1, 4, "pichu", "green");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#pikachu1").click(function(){
		set(1, 1, "pikachu", "original");
		set(1, 2, "pikachu", "red");
		set(1, 3, "pikachu", "blue");
		set(1, 4, "pikachu", "green");
		hide(1, 5);
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#roy1").click(function(){
		set(1, 1, "roy", "original");
		set(1, 2, "roy", "red");
		set(1, 3, "roy", "blue");
		set(1, 4, "roy", "green");
		set(1, 5, "roy", "gold");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#samus1").click(function(){
		set(1, 1, "samus", "red");
		set(1, 2, "samus", "pink");
		set(1, 3, "samus", "dark");
		set(1, 4, "samus", "green");
		set(1, 5, "samus", "blue");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#sheik1").click(function(){
		set(1, 1, "sheik", "original");
		set(1, 2, "sheik", "red");
		set(1, 3, "sheik", "blue");
		set(1, 4, "sheik", "green");
		set(1, 5, "sheik", "white");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#yoshi1").click(function(){
		set(1, 1, "yoshi", "green");
		set(1, 2, "yoshi", "red");
		set(1, 3, "yoshi", "blue");
		set(1, 4, "yoshi", "yellow");
		set(1, 5, "yoshi", "pink");
		set(1, 6, "yoshi", "cyan");
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#younglink1").click(function(){
		set(1, 1, "younglink", "green");
		set(1, 2, "younglink", "red");
		set(1, 3, "younglink", "blue");
		set(1, 4, "younglink", "black");
		set(1, 5, "younglink", "white");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#zelda1").click(function(){
		set(1, 1, "zelda", "original");
		set(1, 2, "zelda", "red");
		set(1, 3, "zelda", "blue");
		set(1, 4, "zelda", "green");
		set(1, 5, "zelda", "white");
		hide(1, 6);
		reset_background(1);
		$(this).css("background-color", "white");
	});
	
	$("#p1_colour1").click(function(){
		get(1, 1);
	});
	
	$("#p1_colour2").click(function(){
		get(1, 2);
	});
	
	$("#p1_colour3").click(function(){
		get(1, 3);
	});
	
	$("#p1_colour4").click(function(){
		get(1, 4);
	});
	
	$("#p1_colour5").click(function(){
		get(1, 5);

	});
	
	$("#p1_colour6").click(function(){
		get(1, 6);
	});


	$("#bowser2").click(function(){
		set(2, 1, "bowser", "green");
		set(2, 2, "bowser", "red");
		set(2, 3, "bowser", "blue");
		set(2, 4, "bowser", "black");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#captainfalcon2").click(function(){
		set(2, 1, "captainfalcon", "original");
		set(2, 2, "captainfalcon", "dark");
		set(2, 3, "captainfalcon", "red");
		set(2, 4, "captainfalcon", "white");
		set(2, 5, "captainfalcon", "green");
		set(2, 6, "captainfalcon", "blue");
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#donkeykong2").click(function(){
		set(2, 1, "donkeykong", "original");
		set(2, 2, "donkeykong", "dark");
		set(2, 3, "donkeykong", "red");
		set(2, 4, "donkeykong", "blue");
		set(2, 5, "donkeykong", "green");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#drmario2").click(function(){
		set(2, 1, "drmario", "original");
		set(2, 2, "drmario", "red");
		set(2, 3, "drmario", "blue");
		set(2, 4, "drmario", "green");
		set(2, 5, "drmario", "black");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#falco2").click(function(){
		set(2, 1, "falco", "original");
		set(2, 2, "falco", "red");
		set(2, 3, "falco", "blue");
		set(2, 4, "falco", "green");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#fox2").click(function(){
		set(2, 1, "fox", "original");
		set(2, 2, "fox", "red");
		set(2, 3, "fox", "blue");
		set(2, 4, "fox", "green");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#ganondorf2").click(function(){
		set(2, 1, "ganondorf", "original");
		set(2, 2, "ganondorf", "red");
		set(2, 3, "ganondorf", "blue");
		set(2, 4, "ganondorf", "green");
		set(2, 5, "ganondorf", "purple");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#iceclimbers2").click(function(){
		set(2, 1, "iceclimbers", "blue");
		set(2, 2, "iceclimbers", "green");
		set(2, 3, "iceclimbers", "yellow");
		set(2, 4, "iceclimbers", "red");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#jigglypuff2").click(function(){
		set(2, 1, "jigglypuff", "original");
		set(2, 2, "jigglypuff", "red");
		set(2, 3, "jigglypuff", "blue");
		set(2, 4, "jigglypuff", "green");
		set(2, 5, "jigglypuff", "gold");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#kirby2").click(function(){
		set(2, 1, "kirby", "original");
		set(2, 2, "kirby", "yellow");
		set(2, 3, "kirby", "blue");
		set(2, 4, "kirby", "red");
		set(2, 5, "kirby", "green");
		set(2, 6, "kirby", "white");
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#link2").click(function(){
		set(2, 1, "link", "green");
		set(2, 2, "link", "red");
		set(2, 3, "link", "blue");
		set(2, 4, "link", "black");
		set(2, 5, "link", "white");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#luigi2").click(function(){
		set(2, 1, "luigi", "green");
		set(2, 2, "luigi", "white");
		set(2, 3, "luigi", "blue");
		set(2, 4, "luigi", "red");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#mario2").click(function(){
		set(2, 1, "mario", "red");
		set(2, 2, "mario", "yellow");
		set(2, 3, "mario", "black");
		set(2, 4, "mario", "blue");
		set(2, 5, "mario", "green");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#marth2").click(function(){
		set(2, 1, "marth", "blue");
		set(2, 2, "marth", "red");
		set(2, 3, "marth", "green");
		set(2, 4, "marth", "dark");
		set(2, 5, "marth", "white");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#mewtwo2").click(function(){
		set(2, 1, "mewtwo", "original");
		set(2, 2, "mewtwo", "red");
		set(2, 3, "mewtwo", "blue");
		set(2, 4, "mewtwo", "green");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#gameandwatch2").click(function(){
		set(2, 1, "gameandwatch", "original");
		set(2, 2, "gameandwatch", "red");
		set(2, 3, "gameandwatch", "blue");
		set(2, 4, "gameandwatch", "green");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#ness2").click(function(){
		set(2, 1, "ness", "red");
		set(2, 2, "ness", "gold");
		set(2, 3, "ness", "blue");
		set(2, 4, "ness", "green");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#peach2").click(function(){
		set(2, 1, "peach", "red");
		set(2, 2, "peach", "gold");
		set(2, 3, "peach", "white");
		set(2, 4, "peach", "blue");
		set(2, 5, "peach", "green");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#pichu2").click(function(){
		set(2, 1, "pichu", "original");
		set(2, 2, "pichu", "red");
		set(2, 3, "pichu", "blue");
		set(2, 4, "pichu", "green");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#pikachu2").click(function(){
		set(2, 1, "pikachu", "original");
		set(2, 2, "pikachu", "red");
		set(2, 3, "pikachu", "blue");
		set(2, 4, "pikachu", "green");
		hide(2, 5);
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#roy2").click(function(){
		set(2, 1, "roy", "original");
		set(2, 2, "roy", "red");
		set(2, 3, "roy", "blue");
		set(2, 4, "roy", "green");
		set(2, 5, "roy", "gold");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#samus2").click(function(){
		set(2, 1, "samus", "red");
		set(2, 2, "samus", "pink");
		set(2, 3, "samus", "dark");
		set(2, 4, "samus", "green");
		set(2, 5, "samus", "blue");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#sheik2").click(function(){
		set(2, 1, "sheik", "original");
		set(2, 2, "sheik", "red");
		set(2, 3, "sheik", "blue");
		set(2, 4, "sheik", "green");
		set(2, 5, "sheik", "white");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#yoshi2").click(function(){
		set(2, 1, "yoshi", "green");
		set(2, 2, "yoshi", "red");
		set(2, 3, "yoshi", "blue");
		set(2, 4, "yoshi", "yellow");
		set(2, 5, "yoshi", "pink");
		set(2, 6, "yoshi", "cyan");
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#younglink2").click(function(){
		set(2, 1, "younglink", "green");
		set(2, 2, "younglink", "red");
		set(2, 3, "younglink", "blue");
		set(2, 4, "younglink", "black");
		set(2, 5, "younglink", "white");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#zelda2").click(function(){
		set(2, 1, "zelda", "original");
		set(2, 2, "zelda", "red");
		set(2, 3, "zelda", "blue");
		set(2, 4, "zelda", "green");
		set(2, 5, "zelda", "white");
		hide(2, 6);
		reset_background(2);
		$(this).css("background-color", "white");
	});
	
	$("#p2_colour1").click(function(){
		get(2, 1);
	});
	
	$("#p2_colour2").click(function(){
		get(2, 2);
	});
	
	$("#p2_colour3").click(function(){
		get(2, 3);
	});
	
	$("#p2_colour4").click(function(){
		get(2, 4);
	});
	
	$("#p2_colour5").click(function(){
		get(2, 5);
	});
	
	$("#p2_colour6").click(function(){
		get(2, 6);
	});
});

function set(player, slot, character, colour) {
	$("#p" + player + "_colour" + slot).attr("src", "static/img/csp_icons/" + character + "/" + colour + ".png");
	$("#p" + player + "_colour" + slot).show();
	$("#p" + player + "_stock" + slot).attr("src", "static/img/stock_icons/" + character + "/" + colour + ".png");
	$("#p" + player + "_stock" + slot).show();
};

function hide(player, slot) {
		$("#p" + player + "_colour" + slot).attr("src", "");
		$("#p" + player + "_colour" + slot).hide();
		$("#p" + player + "_stock" + slot).attr("src", "");
		$("#p" + player + "_stock" + slot).hide();
};

function get(player, slot) {
	$("#p" + player + "_character").attr("src",	$("#p" + player + "_colour" + slot).attr("src"))
	$("#p" + player + "_stock").attr("src",	$("#p" + player + "_colour" + slot).attr("src").replace("csp", "stock"))
}

function reset_background(player) {
	$(".css" + player).css("background-color", "transparent");
}

function update() {
	player1tag = $("#p1_tag").val();
	player1dtag = $("#p1d_tag").val();
	player1char = $("#p1_stock").attr("src");
	player1dchar = $("#p1d_stock").attr("src");
	player1score = $("#p1_score").val();
	player2tag = $("#p2_tag").val();
	player2dtag = $("#p2d_tag").val();
	player2char = $("#p2_stock").attr("src");
	player2dchar = $("#p2d_stock").attr("src");
	player2score = $("#p2_score").val();
	round = $("#round").val();
	caster1 = $("#caster1").val();
	caster2 = $("#caster2").val();

	$.ajax({
		type: 'POST',
		url: "/update",
		data: {
				p1_tag: player1tag,
				p1d_tag: player1dtag,
				p1_char: player1char,
				p1d_char : player1dchar,
				p1_score: player1score,
				p2_tag: player2tag,
				p2d_tag: player2dtag,
				p2_char: player2char,
				p2d_char : player2dchar,
				p2_score: player2score,
				round: round,
				caster1: caster1,
				caster2: caster2,
				is_doubles: is_doubles
			},
		success: function() {
			$("#update_status").css("color", "#CBFFC7");
			$("#update_status").text("Updated");
			$("#update_status").css("opacity", "1");
			setTimeout(function(){
				$("#update_status").css("opacity", "0");
			}, 2000);
		},
		error: function() {
			$("#update_status").css("color", "#F56262");
			$("#update_status").text("Error");
			$("#update_status").css("opacity", "1");
			setTimeout(function(){
				$("#update_status").css("opacity", "0");
			}, 2000);
		},
		timeout: 5000
	})
}

function swap_sides() {
	player1tag = $("#p1_tag").val();
	player1dtag = $("#p1d_tag").val();
	player1char = $("#p1_character").attr("src");
	player1dchar = $("#p1d_character").attr("src");
	player1score = $("#p1_score").val();
	player2tag = $("#p2_tag").val();
	player2dtag = $("#p2d_tag").val();
	player2char = $("#p2_character").attr("src");
	player2dchar = $("#p2d_character").attr("src");
	player2score = $("#p2_score").val();

	$("#p1_tag").val(player2tag);
	$("#p1d_tag").val(player2dtag);
	$("#p1_score").val(player2score);
	$("#p2_tag").val(player1tag);
	$("#p2d_tag").val(player1dtag);
	$("#p2_score").val(player1score);

	$("#p1_character").attr("src", player2char);
	$("#p1_stock").attr("src", player2char.replace("csp", "stock"));
	$("#p1d_character").attr("src", player2dchar);
	$("#p1d_stock").attr("src", player2dchar.replace("csp", "stock"));
	$("#p2_character").attr("src", player1char);
	$("#p2_stock").attr("src", player1char.replace("csp", "stock"));
	$("#p2d_character").attr("src", player1dchar);
	$("#p2d_stock").attr("src", player1dchar.replace("csp", "stock"));
}

function toggle_doubles() {
	if(is_doubles) {
		$(".toggle_doubles").text("Singles ");
		$(".toggle_doubles").append("<i class='fa fa-user'></i>");
		$("#p1d_chosen").hide();
		$("#p2d_chosen").hide();
		$(".doubles_red").hide();
		$(".doubles_green").hide();
		$(".doubles_blue").hide();
		$(".text_flex").css("margin-top", "0px");
		$(".text_flex").css("width", "403px");
		$(".tag").css("height", "");
		$("#p2_tag").attr("placeholder", "Player 2 Tag")

		$("#p1_load").text("Load info");
		$("#p1d_load").hide();
		$("#p2_load").text("Load info");
		$("#p2d_load").hide();
		$("#p1d_tag").hide();
		$("#p2d_tag").hide();

		is_doubles = false;
	}
	else {
		$(".toggle_doubles").text("Doubles ");
		$(".toggle_doubles").append("<i class='fa fa-user-friends'></i>");
		$("#p1d_chosen").show();
		$("#p2d_chosen").show();
		$(".doubles_red").show();
		$(".doubles_green").show();
		$(".doubles_blue").show();
		$(".text_flex").css("margin-top", "40px");
		$(".text_flex").css("width", "301px");
		$(".tag").css("height", "16px");
		$("#p2_tag").attr("placeholder", "Player 1 Tag")

		$("#p1_load").text("Load P1");
		$("#p1d_load").show();
		$("#p2_load").text("Load P1");
		$("#p2d_load").show();
		$("#p1d_tag").show();
		$("#p2d_tag").show();

		$("#doubles_info").text("Right-click for 2nd character");
		$("#doubles_info").css("opacity", "1");
		setTimeout(function(){
			$("#doubles_info").css("opacity", "0");
		}, 5000);

		is_doubles = true;
	}
}

function doubles(player, slot) {
	if(is_doubles) {
		$("#p" + player + "d_character").attr("src", $("#p" + player + "_colour" + slot).attr("src"));
		$("#p" + player + "d_character").show();
		$("#p" + player + "d_stock").attr("src", $("#p" + player + "_stock" + slot).attr("src"));
		$("#p" + player + "d_stock").show();
	}
}

function doubles_colour(player, colour_id) {
	colour = "";
	switch(colour_id) {
		case 1:
			colour = "red";
			break;
		case 2:
			colour = "green";
			break;
		case 3:
			colour = "blue";
			break;
	}

	char1 = $("#p" + player + "_character").attr("src").split("/")[3];
	char2 = $("#p" + player + "d_character").attr("src").split("/")[3];
	$("#p" + player + "_character").attr("src", "static/img/csp_icons/" + char1 + "/" + colour + ".png")
	$("#p" + player + "d_character").attr("src", "static/img/csp_icons/" + char2 + "/" + colour + ".png")
	$("#p" + player + "_stock").attr("src", "static/img/stock_icons/" + char1 + "/" + colour + ".png")
	$("#p" + player + "d_stock").attr("src", "static/img/stock_icons/" + char2 + "/" + colour + ".png")
}

function load(player, slot) {
	$("#p" + player + slot + "_tag").attr("value", $("#p" + player + "_select :selected").text());
	$("#p" + player + slot + "_tag").val($("#p" + player + "_select :selected").text());
	$("#p" + player + slot + "_character").attr("src", "static/img/csp_icons/" + $("#p" + player + "_select :selected").attr("value"));
	$("#p" + player + slot + "_stock").attr("src", "static/img/stock_icons/" + $("#p" + player + "_select :selected").attr("value"));
}

function update_scene() {
	newScene = $("#scenes :selected").text();
	obs.send(
		'SetCurrentScene', {'scene-name': newScene}
	)
	.then(function(value) {
		console.log("Changed scene to '" + newScene + "'");
	})
}