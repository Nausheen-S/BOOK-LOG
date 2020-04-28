const React = require("react");
class Register extends React.Component {
  render() {
    return (
      <html>
        <div>
            <h1>User Login</h1>
            <form method = "POST" action = "/register">
                <div>
                    Name <input type = "text" name = "name"/>
                </div>
                <div>
                    Password <input type = "text" name = "password"/>
                </div>
                <div>
                    <button type = "submit">Submit</button>
                </div>
            </form>

        </div>
      </html>

    );
  }
}

module.exports = Register;