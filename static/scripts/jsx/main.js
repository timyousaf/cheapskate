// list of countries, defined with JavaScript object literals
var transactions = [
  {"name": "Sweden"}, {"name": "China"}
];

React.render(
  <App items={ transactions } />,
  document.getElementById('main')
);