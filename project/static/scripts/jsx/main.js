/** @jsx React.DOM */
var TransactionTable = React.createClass({

        componentDidMount: function(){
            //$(this.getDOMNode()).sortable({start: this.handleStart, stop: this.handleDrop});
            console.log('omg we mounted the TransactionTable')
        },

        render: function () {
            console.log('rendering the list');
            var table = this.props.data.map(function (transaction, i) {
                return (
                    <li className="list-group-item">
                        {transaction.date}
                        {transaction.description}
                        {transaction.amount}
                    </li>
                );
            }.bind(this));

            return (
                <ul className="transactionTable list-group">
                    {table}
                </ul>
            );
        }
    });

var App = React.createClass({

  loadTransactions: function () {
            console.log("hi! calling the API now");
            $.ajax({
                url: "/api/transactions",
                dataType: 'json',
                success: function (data) {
                    console.log("Got " + data.length + " transactions!");
                    this.setState({
                        data: data
                    });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
  },

  getInitialState: function () {
            return {data: []};
  },

  componentDidMount: function () {
            console.log('the app mounted.');
            this.loadTransactions();
            //setInterval(this.loadTaskList, this.props.pollInterval);
        },

  render: function() {
    console.log('trying to render the App');
    var transactions = this.props.transactions;
    return (

      <div className="transactionTable">
                        <TransactionTable data={this.state.data} />
      </div>

    )
  }

});

// list of countries, defined with JavaScript object literals
var transactions = [
  {"name": "Sweden"}, {"name": "China"}
];

React.render(
  <App items={ transactions } />,
  document.getElementById('main')
);