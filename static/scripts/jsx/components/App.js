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
                        {id: '5fbmzmtc', x: 7, y: 41, z: 6},
                        {id: 's4f8phwm', x: 11, y: 45, z: 9},
                        {id: 's4wef8phwm', x: 21, y: 35, z: 9},
                        {id: 's4f8sdfsdfhwm', x: 50, y: 45, z: 9}
                        // ...
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
                    //setInterval(this.loadTaskList, this.props.pollInterval);
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