from flask import Flask, render_template
import json
import mintapi
import datetime

app = Flask(__name__)

def loadMintAPIs():
	apis = {}
	creds_file =  open("/Users/tyousaf/mint.txt")
	for line in creds_file:
		creds = json.loads(line)
		print "Loading Mint API for: " + creds['email']
    		apis[creds['email']] = mintapi.Mint( creds['email'], creds['password'] )	
	return apis

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/transactions")
def transactions():
	transactions = mint.get_transactions()
	uber_and_seamless_transactions = transactions[ transactions.description.str.contains("Uber|Seamless") ]
	return uber_and_seamless_transactions.to_json(orient='records')

@app.route("/api/histogram/tim")
def histogram():
	# TODO: inject 0-count buckets for empty days.
	# TODO: clean up redundant summing when i figure out more about Pandas.
	df = apis['timyousaf@gmail.com'].get_transactions()
	df = df[ df.description.str.contains("Uber|Seamless") ]
	df = df[['date', 'amount']]
	df = df.groupby('date').sum().sort_index() # sums by day and sorts by date
	df = df['amount'].resample('W', how='sum') # re-groups & sums by week
	return df.reset_index().to_json(orient='records', date_format='iso')

if __name__ == "__main__":
    apis = loadMintAPIs()
    app.run(debug=True)