
define([
    'react',
    'components/TransactionTable',
    'components/Chart',
    'jquery'
], function (React, TransactionTable, Chart) {

        var App = React.createClass({

          getInitialState: function () {
                    return {
                      transactions: [],
                      filter_keywords: "Uber|Seamless",
                      mints: {
                        "timyousaf@gmail.com" : [],
                        "lianaparis@gmail.com" : [],
                      },
                      domain: {x: [0, 30], y: [0, 100]}
                    };
          },
          
          componentDidMount: function () {
                    for (var mint_email in this.state.mints) {
                      console.log("Loading histogram for " + mint_email);
                      this.loadHistogram(mint_email, this.state.filter_keywords);  
                    }
          },

          loadHistogram: function (mint_email, filter_keywords) {
                    $.ajax({
                        url: "/api/histogram/stacked",
                        dataType: 'json',
                        data: { "mint_email" : mint_email, "filter_keywords" : filter_keywords },
                        success: function (data) {  
                            console.log("Received histogram of length " + data.length + " for " + mint_email)
                            var mints = {}
                            mints[mint_email] = data
                            this.setState({
                              mints : mints
                            });
                        }.bind(this),
                        error: function (xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    });
          },  

          render: function() {
            return (

              <div>

              <div className="chart">
                <div className="tim-chart">
                    <Chart
                      name="tim-chart"
                      data={ this.state.mints["timyousaf@gmail.com"] }
                      domain={this.state.domain} />
                </div>
              </div>

              </div>

            )
          }

        });

        return App;

});