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
        return (<li class = "items"><p id= "userId" hidden>{book.user_id}</p><a href = {url}>{book.name}</a></li>)

    })

    return (
      <html>
      <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            </link>
            <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Lobster&family=Nunito+Sans:ital,wght@1,600&family=Pacifico&display=swap" rel="stylesheet"/>

            <link rel="stylesheet" type="text/css" href="books.css"/>
      </head>
      <body>
      <div class = "container">


          <ul class="nav justify-content-end">
            <li class="nav-item">
                <a  class="nav-link" href = {link}><button type ="submit" id = "readinglist">View My Reading List</button>
                </a>
            </li>
            <li class="nav-item">
                <a  class="nav-link" href = {completedLink}><button type ="submit" id = "readinglist">View My Completed List</button>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href = {logout}><button type ="submit" id = "readinglist">Logout</button>
                </a>
            </li>
          </ul>
          <h2 id ="sub-title">Books On App</h2>
          <ul>
            {bookList}
          </ul>
          </div>
        </body>

      </html>
    );
  }
}

module.exports = BookList;