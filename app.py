from flask import Flask, render_template
import json
import mintapi
import datetime
import pandas
import cPickle as pickle
import numpy as np
from flask import request

app = Flask(__name__)
state = {}

# API endpoints

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/transactions/")
def transactions():
	mint_email = request.args.get('mint_email')
	return getTransactions(mint_email)

@app.route("/api/histogram/stacked")
def stackedHistogram():
	mint_email = request.args.get('mint_email')
	filter_keywords = request.args.get('filter_keywords')
	return getStackedHistogram(mint_email, filter_keywords)

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

def saveStateToDisk(filename):
	with open(filename, 'wb') as output:
		pickle.dump(state, output, -1)

def loadStateFromDisk(filename):
	with open(filename, 'rb') as input:
		state = pickle.load(input)
	return state

def getTransactions(mint_email, filter_keywords):
	df = state['data'][mint_email]
	df = df[ df.description.str.contains(filter_keywords) ]
	return df.reset_index().to_json(orient='records', date_format='iso')

def getStackedHistogram(mint_email, filter_keywords):
	start_days_ago = 180
	end_days_from = 10
	# TODO: probably a LOT. but this produces correct results when checked vs. Excel.
	df = state['data'][mint_email]
	df = df[ df.description.str.contains(filter_keywords) ]
	df['category'] = map(lambda x: "uber" if x.find("Uber") > -1 else  "seamless", df['description'])
	df = df[['date', 'category', 'amount']]
	df = pandas.pivot_table(df,index=["date"], columns=["category"], values=["amount"], aggfunc=[np.sum])
	now = datetime.datetime.now()
	start = now - datetime.timedelta(days=start_days_ago)
	end = now + datetime.timedelta(days=end_days_from)
	idx = pandas.date_range(start.strftime("%m-%d-%Y"), end.strftime("%m-%d-%Y"))
	df = df.reindex(idx, fill_value=0)	
	df = df.resample('W', how='sum', axis=0) # re-groups & sums by week
	df.index.names = ['date']
	df = df['sum']['amount']
	return df.reset_index().to_json(orient='records', date_format='iso')

if __name__ == "__main__":
    # production
    # state['apis'] = loadMintAPIs("/Users/tyousaf/mint.txt")
    # loadAllTransactions()
    # saveStateToDisk('/Users/tyousaf/state.pk1')
    # app.run(host= '0.0.0.0')

    # dev
    state = loadStateFromDisk('/Users/tyousaf/state.pk1')
    app.run(debug=True)