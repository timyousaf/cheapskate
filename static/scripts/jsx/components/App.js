
define([
    'react',
    'components/TransactionTable',
    'components/Chart',
    'jquery'
], function (React, TransactionTable, Chart) {

        var App = React.createClass({
          
          loadTransactions: function () {
                    $.ajax({
                        url: "/api/transactions",
                        dataType: 'json',
                        success: function (data) {  
                            this.setState({
                                transactions: data
                            });
                        }.bind(this),
                        error: function (xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    });
          },

          loadTransactionsHistogram: function () {
                    $.ajax({
                        url: "/api/histogram/stacked/tim",
                        dataType: 'json',
                        success: function (data) {  
                            this.setState({
                                histogram: data
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
                      histogram: [],
                      domain: {x: [0, 30], y: [0, 100]}
                    };
          },

          componentDidMount: function () {
                    //this.loadTransactions();
                    this.loadTransactionsHistogram();
          },

          render: function() {
            var transactions = this.state.transactions;
            var histogram = this.state.histogram;
            
            return (

              // <div className="transactionTable">
              //           <TransactionTable data={transactions} />
              // </div>

              <div className="chart">
                  <Chart
                    data={this.state.histogram}
                    domain={this.state.domain} />
                </div>

            )
          }

        });

        return App;

});