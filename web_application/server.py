from flask import Flask, render_template, request, send_file
from flask_cors import CORS
from graphqlclient import GraphQLClient
from slippi import Game
import configparser
import glob
import json
import logging
import obswebsocket, obswebsocket.requests
import os
import requests
import sys
import threading
import time

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

config = configparser.ConfigParser()
config.read('config.ini')

host = config['GENERAL']['host']
server_port = config['GENERAL']['server_port']
obs_port = config['GENERAL']['obs_port']
obs_pass = config['GENERAL']['password']

api_key = config['SMASHGG']['api_key']
api_ver = config['SMASHGG']['api_ver']
phase_id = config['SMASHGG']['phase_id']
bracket_size = int(config['SMASHGG']['bracket_size'])

scene_changer = config['SLIPPI']['scene_changer']
slp_folder = config['SLIPPI']['slp_folder']
capture_card = config['SLIPPI']['capture_card']

client = GraphQLClient('https://api.smash.gg/gql/' + api_ver)
client.inject_token('Bearer ' + api_key)

last_request_timestamp = 0;
last_id = '0'

app = Flask(__name__)
CORS(app)

obs_client = None

try:
    obs_client = obswebsocket.obsws(host, int(obs_port), obs_pass)
    obs_client.connect()
except obswebsocket.exceptions.ConnectionFailure:
    print("OBS connection could not be made, websocket will not be used")
    obs_client = None

@app.route("/")
def index():
	data = readJSON()
	p1_tag = data["Player1"]["name"]
	p1d_tag = data["Player1"]["dubs_name"]
	p1_stock = data["Player1"]["character"]
	p1d_stock = data["Player1"]["dubs_character"]
	p1_char = p1_stock.replace("stock", "csp")
	p1d_char = p1d_stock.replace("stock", "csp")
	p1_score = data["Player1"]["score"]
	p2_tag = data["Player2"]["name"]
	p2d_tag = data["Player2"]["dubs_name"]
	p2_stock = data["Player2"]["character"]
	p2d_stock = data["Player2"]["dubs_character"]
	p2_char = p2_stock.replace("stock", "csp")
	p2d_char = p2d_stock.replace("stock", "csp")
	p2_score = data["Player2"]["score"]
	tournament_round = data["round"]
	caster1 = data["caster1"]
	caster2 = data["caster2"]
	is_doubles = data["is_doubles"]
	return render_template("updater.html", 
		p1_tag=p1_tag, 
		p1d_tag=p1d_tag, 
		p1_char=p1_char, 
		p1_stock=p1_stock,
		p1d_stock=p1d_stock,
		p1_score=p1_score, 
		p1d_char=p1d_char,
		p2_tag=p2_tag, 
		p2d_tag=p2d_tag, 
		p2_stock=p2_stock,
		p2d_stock=p2d_stock, 
		p2_char=p2_char,
		p2d_char=p2d_char,
		p2_score=p2_score,
		round=tournament_round,
		caster1=caster1,
		caster2=caster2,
		is_doubles=is_doubles
	)

@app.route("/update", methods=["POST"])
def update():
	writeJSON(request.form)
	return "OK"

@app.route("/database.json", methods=["POST", "GET"])
def databaseJSON():
	try:
		return send_file('static/database.json', as_attachment=True)
	except Exception as e:
		return str(e)

@app.route("/information.json", methods=["POST", "GET"])
def infoJSON():
	try:
		return send_file('static/info.json', as_attachment=True)
	except Exception as e:
		return str(e)

@app.route("/top8.json", methods=["POST", "GET"])
def top8JSON():
	try:
		return send_file('static/top8.json', as_attachment=True)
	except Exception as e:
		return str(e)

@app.route("/favicon.ico")
def favicon():
	try:
		return send_file('static/favicon.ico')
	except Exception as e:
		return str(e)

def writeJSON(information):
	data = {
		"Player1": {
			"name": information["p1_tag"],
			"dubs_name": information["p1d_tag"],
			"character": information["p1_char"],
			"dubs_character": information["p1d_char"],
			"score": information["p1_score"],
			"team_name": information["p1_tag"] + " & " + information["p1d_tag"]
		},
		"Player2": {
			"name": information["p2_tag"],
			"dubs_name": information["p2d_tag"],
			"character": information["p2_char"],
			"dubs_character": information["p2d_char"],
			"score": information["p2_score"],
			"team_name": information["p2_tag"] + " & " + information["p2d_tag"]
		},
		"round": information["round"],
		"caster1": information["caster1"],
		"caster2": information["caster2"],
		"is_doubles": information["is_doubles"]
	}
	with open("static/info.json", "w") as outfile:
		json.dump(data, outfile)

def readJSON():
	with open("static/info.json") as infile:
		data = json.load(infile)
		return data

# __    _  __    __ __
#(_ |V||_|(_ |_|/__/__
#__)| || |__)| |\_|\_|
#

def get_score(id):
	result = client.execute('''
	query set($setId: ID!){
	  set(id:$setId){
	    id
	    slots{
	      standing{
	        placement
	        stats{
	          score {
	            label
	            value
	          }
	        }
	      }
	    }
	  }
	}
	''',
	{
	  "setId": id
	})
	response = json.loads(result)

	p1info = response['data']['set']['slots'][0]['standing']
	p2info = response['data']['set']['slots'][1]['standing']

	p1 = ''
	p2 = ''

	if p1info is not None:
		p1 = p1info['stats']['score']['value']

	if p2info is not None:
		p2 = p2info['stats']['score']['value']

	return {
		"p1": p1,
		"p2": p2
	}

#Get set information
def get_set_object(x, bracket):
	global last_id
	global skip_set2
	
	#just in case of overflow
	if len(bracket) <= (x):
		return

	#if grand finals set 2 wasn't played
	if last_id != '0':
		if int(bracket[x]['id']) != int(last_id)+1:
			skip_set2 = True
			return {
				"p1": {
					"tag": '',
					"score": ''
				},
				"p2": {
					"tag": '',
					"score": ''
				}
			}
	last_id = bracket[x]['id']

	name1 = ''
	name2 = ''

	scores = get_score(bracket[x]['id'])
	score1 = scores['p1']
	score2 = scores['p2']

	entrant1 = bracket[x]['slots'][0]['entrant']
	entrant2 = bracket[x]['slots'][1]['entrant']

	if entrant1 is not None:
		name1_split = entrant1['name'].split("|")
		name1 = name1_split[len(name1_split)-1].strip()

	if entrant2 is not None:
		name2_split = entrant2['name'].split("|")
		name2 = name2_split[len(name2_split)-1].strip()

	return {
		"p1": {
			"tag": name1,
			"score": score1
		},
		"p2": {
			"tag": name2,
			"score": score2
		}
	}

#Sort by ID
def sort_id(json):
	return(int(json['id']))

def smashgg_loop():
	global last_request_timestamp
	while True:
		current_time = time.perf_counter()
		if (current_time-10 > last_request_timestamp) or (last_request_timestamp == 0):
			json_out = get_top8_info();
			with open("static/top8.json", "w") as outfile:
				json.dump(json_out, outfile)
			last_request_timestamp = time.perf_counter()
		time.sleep(1)


##MAIN METHOD
def get_top8_info():
	global last_id
	#Get response from smash.gg
	result = client.execute('''
		query PhaseSets($phaseId: ID!, $page:Int!, $perPage:Int!){
		  phase(id:$phaseId){
		    id
		    name
		    sets(
		      page: $page
		      perPage: $perPage
		      sortType: STANDARD
		    ){
		      pageInfo{
		        total
		      }
		      nodes{
		        id
		        slots{
		          id
		          entrant{
		            id
		            name
		          }
		        }
		      }
		    }
		  }
		}
		''',
		{
		    "phaseId": phase_id,
		    "page": 1,
		    "perPage": 100
		})
	json_response = json.loads(result)

	#Extract and sort the bracket
	bracket = json_response['data']['phase']['sets']['nodes']
	bracket.sort(key=sort_id, reverse=False)

	json_out = {
		"winners": [],
		"losers": []
	}

	skip_set2 = False

	#Winners Bracket
	for x in range (bracket_size-4, bracket_size+1):
		json_out['winners'].append(get_set_object(x, bracket))

	last_id = '0'

	for x in range (len(bracket)-6, len(bracket)):
		json_out['losers'].append(get_set_object(x, bracket))

	last_id = '0'

	return json_out

# __   ___ _  _ ___
#(_ |   | |_)|_) | 
#__)|___|_|  |  _|_
#
def get_latest_file():
	#Get latest file
	directory_list = glob.glob(slp_folder + '\*')
	latest_file = max(directory_list, key=os.path.getctime)
	return latest_file

def swap_scene():
    global obs_client
    if obs_client is not None:
        try:
            obs_client.call(obswebsocket.requests.SetCurrentScene("Players"))
        except KeyboardInterrupt:
            pass

def get_game_finished():
	#Check if game in progress
	file = get_latest_file()
	try:
		game = Game(file)
		return
	except:
		#game in progress
		print("Game found")
		pass

	#Loop till game has ended
	running = True
	while running:
		try:
			game = Game(file)
			running = False
			#on normal end, pause for 0.5s
			if game.end.lras_initiator is None:
				print("Game ended")
				time.sleep(0.5)
				swap_scene()
			#on lrastart, swap instantly
			else:
				print("Game ended - LRAS")
				swap_scene()
		except Exception as e:
			print(e)
			pass
	
	

def slippi_loop():
	try:
		while True:
			get_game_finished()
			time.sleep(5)
	except KeyboardInterrupt:
		pass




if __name__ == "__main__":
	if phase_id != 0:
		top8 = threading.Thread(target=smashgg_loop, name="smashgg loop")
		top8.daemon = True
		top8.start()
	if scene_changer == "true":
		slippi_checker = threading.Thread(target=slippi_loop, name="slippi loop")
		slippi_checker.daemon = True
		slippi_checker.start()
	app.run(host=host, port=server_port)