define([
    'react',
    'd3'
], function (React) {

      var d3StackedChart = {};

      d3StackedChart.create = function(el, props, state) {
        
        var margin = {top: 20, right: 20, bottom: 70, left: 40},
              width = 700 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

        var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        console.log('updating a chart...')
        console.log(state)
        this.svg = svg
        this.update(el, state);
        console.log('updated a chart.')

      };

      d3StackedChart.update = function(el, state) {
        var svg = this.svg

        var margin = {top: 20, right: 20, bottom: 70, left: 40},
              width = 700 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

        var categories = ["seamless", "uber"]

        var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse;

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

        var y = d3.scale.linear().range([height, 0]);
        
        var colors = ['#529ECD', '#7DB6DA']

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(d3.time.format("%Y-%m-%d"));

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10);

        var data = state.data

        data.forEach(function(d) {
          d.date = parseDate(d.date);
          categories.forEach( function(c) { d[c] = +d[c]; });
        });

        var layers = d3.layout.stack() ( categories.map(function(c) {
          return data.map(function(d) {
              return {x: d.date, y: d[c]};
          });
            }));


        x.domain(layers[0].map(function(d) { return d.x; }));
        y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })]).nice();
        
        d3.selectAll(".layer").remove();
        console.log(state)

        var layer = svg.selectAll(".layer")
          .data(layers)
          .enter().append("g")
            .attr("class", "layer")
            .style("fill", function(d, i) { return colors[i]; });

        layer.selectAll("rect")
            .data(function(d) { return d; })
          .enter().append("rect")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y + d.y0); })
            .attr("height", function(d) { return y(d.y0) - y(d.y + d.y0); })
            .attr("width", x.rangeBand() - 1);
              
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );

      svg.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);
            
      };

      d3StackedChart.destroy = function(el) {
        // Any clean-up would go here
        // in this example there is nothing to do
      };

      d3StackedChart._drawPoints = function(el, scales, data) {
        var g = d3.select(el).selectAll('.d3-points');

      };

      return d3StackedChart;

});