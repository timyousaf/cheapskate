from flask import Flask, render_template
import json
import mintapi
import datetime
import pandas

app = Flask(__name__)
state = {}

# API endpoints

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/transactions/tim")
def transactions():
	return getTransactions('timyousaf@gmail.com')

@app.route("/api/histogram/tim")
def histogram():
	return getHistogram('timyousaf@gmail.com')

# internal server functions
def loadMintAPIs(filename):
	apis = {}
	creds_file =  open(filename)
	for line in creds_file:
		creds = json.loads(line)
		print "Loading Mint API for: " + creds['email']
    		apis[creds['email']] = mintapi.Mint( creds['email'], creds['password'] )
	return apis

def loadAllTransactions():
	apis = state['apis']
	state['data'] = {}
	for api in apis:
		df = apis[api].get_transactions()
		state['data'][api] = df

def getTransactions(mint_email):
	df = state['data'][mint_email]
	df = df[ df.description.str.contains("Uber|Seamless") ]
	return df.reset_index().to_json(orient='records', date_format='iso')

def getHistogram(mint_email):
	# TODO: clean up redundant summing & index rename
	df = state['data'][mint_email]
	df = df[ df.description.str.contains("Uber|Seamless") ]
	df = df[['date', 'amount']]
	df = df.groupby('date').sum().sort_index() # sums by day and sorts by date
	idx = pandas.date_range('01-01-2015', '01-01-2016')
	df = df.reindex(idx, fill_value=0)
	df = df['amount'].resample('W', how='sum') # re-groups & sums by week
	df.index.names = ['date']
	return df.reset_index().to_json(orient='records', date_format='iso')

if __name__ == "__main__":
    state['apis'] = loadMintAPIs("/Users/tyousaf/mint.txt")
    loadAllTransactions()
    app.run(debug=True)