define([
    'react',
    'components/d3StackedChart'
], function (React, d3StackedChart) {

  var Chart = React.createClass({
    propTypes: {
      data: React.PropTypes.array,
      domain: React.PropTypes.object
    },

    componentDidMount: function() {
      var el = this.getDOMNode();
      d3StackedChart.create(el, {
        width: '100%',
        height: '300px'
      }, this.getChartState());
    },

    componentDidUpdate: function() {
      var el = this.getDOMNode();
      d3StackedChart.update(el, this.getChartState());
    },

    getChartState: function() {
      return {
        data: this.props.data,
        domain: this.props.domain
      };
    },

    componentWillUnmount: function() {
      var el = this.getDOMNode();
      d3StackedChart.destroy(el);
    },

    render: function() {
      return (
        <div className="Chart"></div>
      );
    }
  });

  return Chart;

});