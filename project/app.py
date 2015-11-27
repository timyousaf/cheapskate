from flask import Flask, render_template
import json
import mintapi

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/transactions")
def transactions():
	transactions = mint.get_transactions()
	uber_and_seamless_transactions = transactions[ transactions.description.str.contains("Uber|Seamless") ]
	return uber_and_seamless_transactions.to_json(orient='records')

if __name__ == "__main__":
    creds_file =  open("/Users/tyousaf/mint.txt")
    creds =  json.loads( creds_file.read() )
    mint = mintapi.Mint( creds['email'], creds['password'] )
    app.run(debug=True)