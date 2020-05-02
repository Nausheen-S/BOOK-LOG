const React = require("react");
class Register extends React.Component {
  render() {
    return (
      <html>
      <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            </link>
            <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Lobster&family=Pacifico&display=swap" rel="stylesheet"/>

            <link rel="stylesheet" type="text/css" href="register.css"/>
      </head>
        <div class = "container">
            <div><br/>
            <h1 id = "title">Readish</h1><br/>
                <h2 id = "sub-title">User Register</h2>
                <form className="mt-3" method = "POST" action = "/registered">
                    <div class = "input-names">
                        Username <br/><input type = "text" name = "name"/>
                    </div><br/>
                    <div class = "input-names">
                        Password <br/><input type = "text" name = "password"/>
                    </div><br/>
                    <div class = "input-names">
                        <button type = "submit">Submit</button>
                    </div>
                </form>

            </div>
        </div>
      </html>

    );
  }
}

module.exports = Register;