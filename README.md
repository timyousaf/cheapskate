# cheapskate

Web app that pulls data from Mint and charts our weekly Seamless & Uber spending. We'll run it on a Raspberry Pi and view on an iPad.

Currently uses:

- https://github.com/mrooney/mintapi/ to pull Mint data
- Flask/Pandas backend
- Bower/React/D3 frontend

# notes

Dependencies:

Needs valid Mint credentials

pip install -r requirements.txt
bower install
npm install -g babel-cli
npm install babel-preset-es2015 babel-preset-react

Run the JSX transform when writing new JSX:
babel --presets es2015,react --watch static/scripts/jsx/ --out-dir static/scripts/js/ 