console.log("Now we are in TransactionTable.js!")

define([
    'react',
    'fixeddatatable'
], function (React) {

    var TransactionTable = React.createClass({

            componentDidMount: function(){
                //$(this.getDOMNode()).sortable({start: this.handleStart, stop: this.handleDrop});
            },

            render: function () {
                console.log('rendering the list. It is:');
                console.log(this.props.data)

                const rows = [
                  ['a1', 'b1', 'c1'],
                  ['a2', 'b2', 'c2'],
                  ['a3', 'b3', 'c3'],
                  // .... and more
                ];

                // var table = this.props.data.map(function (transaction, i) {
                //     var date = new Date(transaction.date);
                //     var formattedDate = date.toString();
                //     return (
                //         <li className="list-group-item">
                //             {formattedDate}
                //             {transaction.description}
                //             {transaction.amount}
                //         </li>
                //     );

                // }.bind(this));

                // return (
                //     <ul className="transactionTable list-group">
                //         {table}
                //     </ul>
                // );

                return (
                    <Table
                        rowHeight={50}
                        rowsCount={rows.length}
                        width={5000}
                        height={5000}
                        headerHeight={50}>
                        <Column
                          header={<Cell>Col 1</Cell>}
                          cell={<Cell>Column 1 static content</Cell>}
                          width={2000}
                        />
                    />
                );

            }
        });

    return TransactionTable;

});