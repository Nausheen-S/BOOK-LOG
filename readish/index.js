const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

if( process.env.DATABASE_URL ){

  //we need to take apart the url so we can set the appropriate configs

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{
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
app.use(express.static('public'));
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
app.post('/loggedin',(request,response)=>{
    var values = [request.body.name];
    var query = 'SELECT * FROM users WHERE name = $1';
    console.log(values);
    pool.query(query, values, (error, result)=>{
            console.log(result.rows);
        if( error ){
            response.send("error");
            console.log(error);
        }else if(result.rows.length === 0){
            response.redirect('/register');
            return;
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
          response.send("No matching result");
        }

    })
    //response.send("working");
});

//REGISTER FORM
app.get('/register',(request, response)=>{
    response.render('register');
});

//REGISTER POST TO DB
app.post('/registered',(request,response)=>{
    const query1 = 'SELECT * FROM users WHERE name= $1';
    var values = [request.body.name];
    console.log(values);
    pool.query(query1, values, (error, result)=>{
         //console.log(result.rows);
        if( error ){
            response.send("Something went wrong. Please refresh and try again");
            console.log(error);
        }else{
            if(result.rows.length === 0){
                const query = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
                var hashedPassword = sha256(request.body.password);

                const values = [request.body.name, hashedPassword];
                pool.query(query, values, (error, result)=>{
                    if( error ){
                        response.send("Something went wrong. Please refresh and try again");
                        console.log(error);
                    }else{
                        //response.send("registered");
                        let user_id = result.rows[0].id;
                        var hashedCookie = sha256(SALT + user_id);

                        response.cookie('logged in', hashedCookie);
                        response.cookie('user_id', user_id);
                        response.redirect('/books');
                    }
                })
            }else{
                response.redirect('/login');
            }
        }
    })
});

//LOGOUT
app.get('/logout/:id', (request, response) => {

    response.clearCookie('logged in');
    response.clearCookie('user_id');
    response.redirect('/');
});

//BOOK LIST DISPLAY
app.get('/books',(request,response)=>{
    const query = 'SELECT * FROM books';

    pool.query(query,  (error,result)=>{
        if( error ){
            response.send("Some error occurred.Cannot display books.");
            console.log(error);
        }else{
            var data = {
                books: result.rows,
                userId: request.cookies['user_id']
            }
            response.render('booklist',data);
            }

    })

});

//INFORMATION ON EACH BOOK
app.get('/about/:id',(request,response)=>{
    //console.log(this.body.name);
    const query = 'SELECT * FROM books WHERE id = $1';
    let values = [request.params.id];
    pool.query(query, values,(error,result)=>{
        if( error ){
            response.send("Some error occurred.Cannot display books.");
            console.log(error);
        }else{
            var data = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                author: result.rows[0].author,
                genre:result.rows[0].genre,
                about: result.rows[0].about
            }
            //console.log(result.rows[0])
            response.render('about',data);
        }
    })

});

// POST READING LIST FOR USER
app.post('/readinglist', (request, response)=>{
  let query = "INSERT INTO readinglist (user_id,book_id,completed) VALUES ($1, $2, $3)";

  const values = [request.cookies['user_id'],request.body.book_id,request.body.completed];

  pool.query(query, values, (error, result)=>{
    if( error ){
      console.log("Some error occurred");
      console.log( error );
    }else{
      response.send('worked')
       //response.redirect('/readinglist/:id');
    }
  })
});

//CREATE READING LIST FOR PARTICULAR USER
app.get('/readinglist/:id',(request,response)=>{
    //const query = 'SELECT * FROM readinglist WHERE user_id ='+request.params.id;
    //const query = 'SELECT DISTINCT books.name, readinglist.user_id,readinglist.book_id, readinglist.completed FROM readinglist INNER JOIN books ON (books.id = readinglist.book_id) WHERE user_id = $1';
    //+ request.params.id;
    const query = 'SELECT DISTINCT books.name FROM readinglist INNER JOIN books ON (books.id = readinglist.book_id) WHERE user_id = $1';
    const values = [request.cookies['user_id']];
    pool.query(query,values, (error, result)=>{

    if( error ){
      console.log("Some error occurred");
      console.log( error );
    }else{
        var data = {
            books: result.rows,
            userId: request.cookies['user_id']
        }
        //response.send(data);
       response.render('readinglist',data);
    }
  })

});

//CREATE COMPLETED LIST FOR EACH USER
app.get('/completed/:id',(request,response)=>{
    //const query = 'SELECT * FROM readinglist WHERE user_id ='+request.params.id;
    const query = 'SELECT DISTINCT books.name, readinglist.completed FROM readinglist INNER JOIN books ON (books.id = readinglist.book_id) WHERE user_id = $1 AND readinglist.completed = "completed"';
    const values = [request.cookies['user_id']];
    pool.query(query, values,(error, result)=>{
        //console.log(readinglist.completed)
    if( error ){
      console.log("Some error occurred");
      console.log( error );
    }else{
        var data = {
            books:result.rows,
            userId: request.cookies['user_id']
        }
        //console.log(result.rows[0].completed)
        //response.send(data);
       response.render('completedlist',data);
    }
  })

});



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