var React = require('react');

class CompletedList extends React.Component {
  render() {
    const logout = `/logout/${this.props.userId}`;
    const booksLink = `/books`;
    const completedList = this.props.books.map((book)=>{
        //const url  = `/about/${book.id}`;
        console.log(book.completed);
        const completed = book.completed? "completed" : "not completed"
        if(completed){
        return (<li>{book.name}</li>)
        }else{
            return(<div></div>)
        }

    })
    //console.log("completed",this.props.completed);
    return (
    <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            </link>
            <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Lobster&family=Nunito+Sans:ital,wght@1,600&family=Pacifico&display=swap" rel="stylesheet"/>

            <link rel="stylesheet" type="text/css" href="/completed.css"/>
        </head>
        <body style = {{ 'background-color': '#cc0066'}}>
        <ul class="nav justify-content-end">

            <li class="nav-item">
                <a  class="nav-link" href = {booksLink}><button type ="submit" id = "readinglist">All Books</button>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href = {logout}><button type ="submit" id = "readinglist">Logout</button>
                </a>
            </li>
          </ul>
            <h1>My Completed List</h1><br/><br/>
            <ul>
                {completedList}
            </ul>
        </body>

    </html>
    );
  }
}

module.exports = CompletedList;