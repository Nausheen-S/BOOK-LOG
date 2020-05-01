var React = require('react');

class CompletedList extends React.Component {
  render() {

    const completedList = this.props.books.map((book)=>{
        //const url  = `/about/${book.id}`;
        console.log(book.completed);
        const completed = book.completed? "completed" : "not completed"
        if(completed){
        return (<li>{book.name}-{completed}</li>)
        }else{
            return(<div></div>)
        }

    })
    //console.log("completed",this.props.completed);
    return (
      <html>
        <body>
          <h1>My Completed List</h1>
          <ul>
            {completedList}
          </ul>
        </body>

      </html>
    );
  }
}

module.exports = CompletedList;