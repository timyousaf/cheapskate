from flask import Flask
import json
import mintapi

app = Flask(__name__)

@app.route("/api/transactions")
def transactions():
	transactions = mint.get_transactions()
	return transactions.to_json()

if __name__ == "__main__":
    creds_file =  open("/Users/tyousaf/mint.txt")
    creds =  json.loads( creds_file.read() )
    mint = mintapi.Mint( creds['email'], creds['password'] )
    app.run()