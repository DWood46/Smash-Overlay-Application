0. OPTIONAL: setup python virtual env using

	py -m venv venv
	venv\Scripts\activate.bat

1. Install requirements

	pip3 install -r requirements.txt

2. Check config.ini for configuration options

3. Run application using

	py server.py

   or if using venv...

	python server.py

   Then connect to the server host/port described in the config.ini

Notes: 

To control OBS from the webpage you must install obswebsocket into OBS

	https://github.com/Palakis/obs-websocket

Overlays in OBS must be set to the local file directories, the web application wont serve the created overlays

To add player presets, add to static/database.json