
define([
    'react',
    'components/TransactionTable',
    'components/Chart',
    'jquery'
], function (React, TransactionTable, Chart) {

        var App = React.createClass({

          loadHistogramTim: function () {
                    $.ajax({
                        url: "/api/histogram/stacked/tim",
                        dataType: 'json',
                        success: function (data) {  
                            this.setState({
                                tim_histogram: data
                            });
                        }.bind(this),
                        error: function (xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    });
          },

          loadHistogramLiana: function () {
                    $.ajax({
                        url: "/api/histogram/stacked/liana",
                        dataType: 'json',
                        success: function (data) {  
                            this.setState({
                                liana_histogram: data
                            });
                        }.bind(this),
                        error: function (xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    });
          },

          getInitialState: function () {
                    return {
                      transactions: [],
                      tim_histogram: [],
                      liana_histogram: [],
                      domain: {x: [0, 30], y: [0, 100]}
                    };
          },

          componentDidMount: function () {
                    this.loadHistogramTim();
                    this.loadHistogramLiana();
          },

          render: function() {
            return (

              <div className="chart">
                  <Chart
                    data={this.state.tim_histogram}
                    domain={this.state.domain} />
              
                  <Chart
                    data={this.state.liana_histogram}
                    domain={this.state.domain} />
              </div>

            )
          }

        });

        return App;

});