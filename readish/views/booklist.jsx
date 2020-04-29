var React = require('react');

class BookList extends React.Component {
  render() {

    const bookList = this.props.books.map((book)=>{
        const url  = `/about/${book.id}`;
        return (<li><a href = {url}>{book.name}</a></li>)

    })

    return (
      <html>
        <body>
          <h1>Books</h1>
          <ul>
            {bookList}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = BookList;