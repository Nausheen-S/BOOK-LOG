var React = require('react');

class About extends React.Component {
  render() {
        /*const readingList = false;
        const readingListButton = readingList ? (<div></div>) : (<button type="submit" id = "list">Add to my reading list</button>);
        {readingListButton}
        */
    return (
      <html>
      <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            </link>
            <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Lobster&family=Nunito+Sans:ital,wght@1,600&family=Pacifico&display=swap" rel="stylesheet"/>

            <link rel="stylesheet" type="text/css" href="books.css"/>
      </head>
        <body>
          <h1>About the Book</h1>
          <div>
            <p><span id = "bookId" hidden>{this.props.id}</span></p>
            <p>Title:<span id = "bookTitle">{this.props.name}</span></p>
            <p>Author:<span>{this.props.author}</span></p>
            <p>Genre:<span>{this.props.genre}</span></p>
            <p> About:<span>{this.props.about}</span></p>
          </div>
          <div>

          </div>

            <button type="submit" id = "list">Add to my reading list</button>
            <button type="submit" id = "completed">Mark as completed</button>
            <script src = "/script.js"></script>
            <script src = "/complete.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = About;