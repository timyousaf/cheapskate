console.log("Now we are in App.js!")

define([
    'react',
    'components/TransactionTable',
    'jquery'
], function (React, TransactionTable) {

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
                    return {transactions: []};
          },

          componentDidMount: function () {
                    this.loadTransactions();
                    //setInterval(this.loadTaskList, this.props.pollInterval);
                },

          render: function() {
            var transactions = this.state.transactions;
            return (

              <div className="transactionTable">
                        <TransactionTable data={transactions} />
              </div>

            )
          }

        });

        return App;

});