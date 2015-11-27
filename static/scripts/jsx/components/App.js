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
                        {transactions}
      </div>

    )
  }

});