// list of countries, defined with JavaScript object literals
console.log("Beginning the journey! This is the start of main.js")

require.config({
    paths: {
        react: '../../libs/react/react',
        jquery: '../../libs/jquery/dist/jquery.min',
        fixeddatatable: '../../libs/fixed-data-table/dist/fixed-data-table'
    },

    shim: {
        react: {
            exports: 'React'
        },
        jquery: {
            exports: '$'
        },
        fixeddatatable: {
            exports: [ 'Table', 'Column', 'Cell' ]
        }
    }
    
});

require([
    'react',
    'components/App',
    'fixeddatatable'
],
function(React, App)  {

	React.render(
	  <App/>,
	  document.getElementById('main')
	);

});