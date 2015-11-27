var TransactionTable = React.createClass({

        componentDidMount: function(){
            //$(this.getDOMNode()).sortable({start: this.handleStart, stop: this.handleDrop});
            console.log('omg we mounted the TransactionTable')
        },

        render: function () {
            console.log('rendering the list');

            var table = this.props.data.map(function (transaction, i) {
                //var date = new Date(transaction.date);
                //var formattedDate = date.toString();
                return (
                    <li className="list-group-item">
                        //{formattedDate}
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