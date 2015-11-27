console.log("Now we are in App.js!")

define([
    'react',
    'components/TransactionTable',
    'components/Chart',
    'jquery'
], function (React, TransactionTable, Chart) {

        var App = React.createClass({
          
          loadTransactions: function () {
                    console.log("hi! calling the API now");
                    $.ajax({
                        url: "/api/transactions",
                        dataType: 'json',
                        success: function (data) {  
                            console.log("Got " + data.length + " transactions!");
                            this.setState({
                                transactions: data
                            });
                        }.bind(this),
                        error: function (xhr, status, err) {
                            console.error(this.props.url, status, err.toString());
                        }.bind(this)
                    });
          },

          getInitialState: function () {
                    console.log('setting App.js initial state')
                    var sampleData = [
                        {date: '2015-01', value: 12},
                        {date: '2015-02', value: 20}
                      ];

                    return {
                      transactions: [],
                      data: sampleData,
                      domain: {x: [0, 30], y: [0, 100]}
                    };
          },

          componentDidMount: function () {
                    console.log('App.js component did mount.');
                    this.loadTransactions();
          },

          render: function() {
            console.log('Beginning of App.js render');
            var transactions = this.state.transactions;
            console.log('sending it these transactions:')
            console.log(transactions)
            
            return (

              // <div className="transactionTable">
              //           <TransactionTable data={transactions} />
              // </div>

              <div className="chart">
                  <Chart
                    data={this.state.data}
                    domain={this.state.domain} />
                </div>

            )
          }

        });

        return App;

});