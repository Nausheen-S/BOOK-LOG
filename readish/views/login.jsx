const React = require("react");
class Login extends React.Component {
  render() {
    return (
      <html>
        <div>
            <h1>User Login</h1>
            <form method = "POST" action = "/login">
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
            <p>Don't Have an account?<a href = "/register">Register</a></p>
        </div>
      </html>

    );
  }
}

module.exports = Login;