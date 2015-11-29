define([
    'react',
    'd3'
], function (React) {

      var d3Chart = {};

      d3Chart.create = function(el, props, state) {
        
        var margin = {top: 20, right: 20, bottom: 70, left: 40},
              width = 700 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

        var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.svg = svg        
        this.update(el, state);

      };

      d3Chart.update = function(el, state) {
        var svg = this.svg

        var margin = {top: 20, right: 20, bottom: 70, left: 40},
              width = 700 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse;

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

        var y = d3.scale.linear().range([height, 0]);

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
          d.value = +d.amount;
        });

        x.domain(data.map(function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

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
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Value ($)");

        svg.selectAll("bar")
            .data(data)
          .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return x(d.date); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })

      svg.selectAll("bar")
            .data(data)
          .enter().append("text")
            .attr("class", "label")
            .attr("x", function(d) { return x(d.date) + 1 })
            .attr("y", function(d) { return y(d.value) - 5; })
            .attr("dy", ".35em")
            .text(function(d) { return Math.round(d.value); });
            
      };

      d3Chart.destroy = function(el) {
        // Any clean-up would go here
        // in this example there is nothing to do
      };

      d3Chart._drawPoints = function(el, scales, data) {
        var g = d3.select(el).selectAll('.d3-points');

      };

      return d3Chart;

});