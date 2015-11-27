define([
    'react',
    'd3'
], function (React) {

      var d3Chart = {};

      d3Chart.create = function(el, props, state) {
        console.log('trying to create the D3 chart')
        // var svg = d3.select(el).append('svg')
        //     .attr('class', 'd3')
        //     .attr('width', props.width)
        //     .attr('height', props.height);

        // svg.append('g')
        //     .attr('class', 'd3-points');
        
        console.log('created the chart. now updating it.')
        
        this.update(el, state);
        
        console.log("successfuly created and updated the D3 chart")

      };

      d3Chart.update = function(el, state) {
        console.log('trying to update the chart')
        console.log(this);
        // Re-compute the scales, and render the data points
        
        console.log('time to draw the chart:')

        var margin = {top: 20, right: 20, bottom: 70, left: 40},
              width = 600 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

          // Parse the date / time
          var parseDate = d3.time.format("%Y-%m").parse;

          var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

          var y = d3.scale.linear().range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .tickFormat(d3.time.format("%Y-%m"));

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .ticks(10);

          var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

        var data = state.data

        data.forEach(function(d) {
          d.date = parseDate(d.date);
          d.value = +d.value;
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
            .attr("height", function(d) { return height - y(d.value); });
            
        console.log('Finished drawing the chart!');
      };

      d3Chart.destroy = function(el) {
        // Any clean-up would go here
        // in this example there is nothing to do
      };

      d3Chart._drawPoints = function(el, scales, data) {
        var g = d3.select(el).selectAll('.d3-points');

        var point = g.selectAll('.d3-point')
          .data(data, function(d) { return d.id; });

        // ENTER
        point.enter().append('circle')
            .attr('class', 'd3-point');

        // ENTER & UPDATE
        point.attr('cx', function(d) { return scales.x(d.x); })
            .attr('cy', function(d) { return scales.y(d.y); })
            .attr('r', function(d) { return scales.z(d.z); });

        // EXIT
        point.exit()
            .remove();
      };

      return d3Chart;

});