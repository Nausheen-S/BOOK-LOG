var React = require('react');

class BookList extends React.Component {
  render() {
    console.log("props id",this.props.userId);
    const link = `/readinglist/${this.props.userId}`;
    const completedLink = `/completed/${this.props.userId}`;
     //const link = `/readinglist/1`;
    const logout = `/logout/${this.props.userId}`;
    const bookList = this.props.books.map((book)=>{
        const url  = `/about/${book.id}`;
        console.log(book.user_id);
        return (<li><p id= "userId" hidden>{book.user_id}</p><a href = {url}>{book.name}</a></li>)

    })

    return (
      <html>
        <body>
          <h1>Books</h1>
          <ul>
            {bookList}
          </ul>
          <a href = {link}><button type ="submit" id = "readinglist">View My Reading List</button></a>
          <a href = {completedLink}><button type ="submit" id = "readinglist">View My Completed List</button></a>
          <a href = {logout}><button type ="submit" id = "readinglist">Logout</button></a>
        </body>

      </html>
    );
  }
}

module.exports = BookList;