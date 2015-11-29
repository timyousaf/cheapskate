
require.config({
    paths: {
        react: '../../libs/react/react',
        jquery: '../../libs/jquery/dist/jquery.min',
        d3: '../../libs/d3/d3'
    },

    shim: {
        react: {
            exports: 'React'
        },
        jquery: {
            exports: '$'
        },
        d3: {
            exports: 'd3'
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