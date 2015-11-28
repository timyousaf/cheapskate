from flask import Flask, render_template
import json
import mintapi
import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/transactions")
def transactions():
	transactions = mint.get_transactions()
	uber_and_seamless_transactions = transactions[ transactions.description.str.contains("Uber|Seamless") ]
	return uber_and_seamless_transactions.to_json(orient='records')

@app.route("/api/transactions/histogram")
def histogram():
	# ULTRA HACK, blargh
	# TODO: figure out pandas histogram
	transactions = mint.get_transactions()
	uber_and_seamless_transactions = transactions[ transactions.description.str.contains("Uber|Seamless") ]
	actual = uber_and_seamless_transactions.to_json(orient='records')
	actual = json.loads(actual)
	histogram = {}
	key = 'date'
	for trans in actual:
		trans[key] = datetime.datetime.fromtimestamp(trans[key] / 1000 ).strftime('%Y-%m')
		if trans[key] in histogram:
			histogram[trans[key]] += int(trans['amount'])
		else:
			histogram[trans[key]] = int(trans['amount'])
	array = []
	for key in histogram:
		array.append( { 'date' : key, 'value' : histogram[key] } )
	return json.dumps(array)

if __name__ == "__main__":
    creds_file =  open("/Users/tyousaf/mint.txt")
    creds =  json.loads( creds_file.read() )
    mint = mintapi.Mint( creds['email'], creds['password'] )
    app.run(debug=True)
    