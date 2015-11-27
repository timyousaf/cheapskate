// list of countries, defined with JavaScript object literals
console.log("Beginning the journey! This is the start of main.js")

require.config({
    paths: {
        react: '../../libs/react/react',
        jquery: '../../libs/jquery/dist/jquery.min'
    },

    shim: {
        react: {
            exports: 'React'
        },
        jquery: {
            exports: '$'
        }
    }
    
});

require([
    'react',
    'components/App'
],
function(React, App)  {

	React.render(
	  <App/>,
	  document.getElementById('main')
	);

});