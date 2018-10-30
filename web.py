# -*- coding: utf-8 -*-
"""
Created on Thu Aug 30 14:51:13 2018

@author: raw

set FLASK_APP=<name of py programme>
set FLASK_DEBUG=1
"""

from flask import Flask, request, render_template, jsonify
import os,socket,json
import hashlib

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return render_template("main.html")

@app.route("/hashing")
def hashing():
    return render_template("blockchain.html")

@app.route("/blockchain")
def blockchain():
    return render_template("index.html")

@app.route('/json', methods=['POST','GET'])
def my_form_post():
    print("Received input")
    print(request.data)
    #return jsonify({"message":"Hello back. You message was '%s'" %"message"})
    jsonobj = json.loads(request.data.decode())
    print(jsonobj)
    return jsonify({"message":"Hello back. You message was '%s'" %jsonobj["message"]})
    
@app.route('/sha256', methods=['POST','GET'])
def hashit():
    print("Received input")
    #print(request.data)
    #return jsonify({"message":"Hello back. You message was '%s'" %"message"})
    jsonobj = json.loads(request.data.decode())
    print(jsonobj)
    cleartext = jsonobj["message"].encode("utf-8")
    # print("you inserted arg {}".format(sys.argv[1]))
    hashbin = hashlib.sha1(cleartext).digest()
    hexCode = "".join("{:02x}".format(a) for a in hashbin)
    print("Hash: {}".format(hexCode.upper()))

    return jsonify({"message":"Hello back","hashkey":hexCode.upper()})

if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0',debug=True,port=80)
    