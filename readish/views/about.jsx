var React = require('react');

class About extends React.Component {
  render() {
        const logout = `/logout/${this.props.userId}`;
        const booksLink = `/books`;
    return (
      <html>
      <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            </link>
            <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Lobster&family=Nunito+Sans:ital,wght@1,600&family=Pacifico&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap" rel="stylesheet"/>

            <link rel="stylesheet" type="text/css" href="/aboutbook.css"/>
      </head>
        <body>
        <div class = "container">
        <div class = "sub-container">
        <a  href = {logout}><button type ="submit" id = "readinglist" class= "nav">Logout</button>
            </a>
        <a href = {booksLink}><button type ="submit" id = "readinglist" class= "nav">All Books |</button>
            </a>
            <button type="submit" id = "list" class= "nav">Add to my reading list |</button>
            <button type="submit" id = "completed" class= "nav">Mark as completed |</button>

        </div>
          <h1>About the Book</h1>
          <div>
            <p><span id = "bookId" hidden>{this.props.id}</span></p>
            <p><span class = "heading">Title:  </span> <span id = "bookTitle" class = "text">{this.props.name}</span></p>
            <p><span class = "heading">Author:  </span><span class = "text">{this.props.author}</span></p>
            <p><span class = "heading">Genre:  </span><span class = "text">{this.props.genre}</span></p>
            <p><span class = "heading"> About:  </span><span class = "text">{this.props.about}</span></p>
          </div>
          <div>

          </div>


            <script src = "/script.js"></script>
            <script src = "/complete.js"></script>
        </div>
        </body>
      </html>
    );
  }
}

module.exports = About;