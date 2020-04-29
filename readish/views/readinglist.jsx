var React = require('react');

class ReadingList extends React.Component {
  render() {

    const readingList = this.props.books.map((book)=>{
        //const url  = `/about/${book.id}`;
        return (<li>{book.book_id}</li>)

    })
    console.log(this.props.id);
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