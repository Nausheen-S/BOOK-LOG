const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'nausheen',
  host: '127.0.0.1',
  database: 'readish',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
 //Configurations and set up

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);
//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//authenticate
var sha256 = require('js-sha256');
var SALT = "secure";


// ------------------Routes-----------------

//REDIRECT TO LOGIN PAGE
app.get ('/',(request,response)=>{
    response.redirect('/login');

});

//LOGIN USER FORM
app.get('/login',(request, response)=>{
    response.render('login');
});

// LOGIN POST TO DB
app.post('/login',(request,response)=>{
    var values = [request.body.name,request.body.password];
    var query = 'SELECT * FROM users WHERE name = '+request.body.name;
    console.log(values);
    pool.query(query, values, (error, result)=>{
    if( error ){
        response.send("error");
        console.log(error);
    }else if(result.rows.length === 0){
        const message ={
            message:"Looks like you haven't registered yet. Please register here"
        }
        response.render('/register', message);
    }
    // if there is a result in the array
    if( result.rows.length > 0 ){
      // we have a match with the name
      let requestPassword = request.body.password;

        if(sha256( requestPassword) === result.rows[0].password){

            let user_id = result.rows[0].id;

        // set a secret code in the cookie that we can verify
            var hashedCookie = sha256(SALT + user_id);

            response.cookie('logged in', hashedCookie);
            response.cookie('user_id', user_id);
            response.redirect('/books');
        }else{
            response.status(403);
            response.send("Wrong password");
        }

    }else{
      // nothing matched
      response.status(403);
      response.send("sorry! Something is wrong");
    }

    })
    //response.send("working");
});

//REGISTER FORM
app.get('/register',(request, response)=>{
    response.render('register');
});

//REGISTER POST TO DB


// Listen to requests on port 3000

const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);