var React = require('react');

class About extends React.Component {
  render() {
    return (
      <html>
        <body>
          <h1>Book Information</h1>
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