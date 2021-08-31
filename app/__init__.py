from flask import Flask, jsonify, json
from flask.templating import render_template
import requests
from flask_cors import CORS
from flask_jsglue import JSGlue


CSRF_ENABLED = True

app = Flask(__name__) 
jsglue = JSGlue(app)
CORS(app)

wsgi_app = app.wsgi_app
from app.controller import default


@app.route('/api/pokemon/<string:name>', methods=['GET'])
def get_poke(name):
    uri = f"https://pokeapi.co/api/v2/pokemon/{name}" 
    json_return_value = []    

    res = requests.get(uri)    
    pokemon = res.json()
    
    json_return_value.append(pokemon['name'])      
    for i in sorted(pokemon['abilities'], key=lambda k:k['ability']['name'] ):      
        json_return_value.append(i)
    size = len(json_return_value)    
    
    return render_template('sort.html', dados = json_return_value, size=size)
