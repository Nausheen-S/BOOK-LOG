var React = require('react');

class ReadingList extends React.Component {
  render() {

    const readingList = this.props.books.map((book)=>{
        //const url  = `/about/${book.id}`;
        //console.log(book.completed);
        //const completed = book.completed? "completed" : "not completed"
        return (<li>{book.name}</li>)

    })
    /*const completedList = this.props.complete.map((book)=>{
        //const url  = `/about/${book.id}`;
        return (<li>{complete.completed}</li>)

    })*/
    //console.log("completed",this.props.completed);
    return (
      <html>
        <body>
          <h1>My Reading List</h1>
          <ul>
          {readingList}

          </ul>
        </body>

      </html>
    );
  }
}

module.exports = ReadingList;