const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
const bcrpyt = require('bcrypt');
const expressSession = require('express-session');
const cookieSession = require('cookie-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const db = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession({ 
    secret: 'mine', 
    resave: 'false', 
    saveUninitialized: false
})); 

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
}));

app.use(cookieParser('mine'));
app.use(passport.initialize());
app.use(passport.session()); 
require("./passportConfig")(passport);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = "INSERT INTO accounts (`username`, `password`) VALUES (?,?)";
    const query2 = "Select * from accounts where username = ?"; 

    db.query(query2, [username], (err, result) => {
        if(err) {throw err;}
        if(result.length > 0) {
            res.send({ message: "Username already exists"});
        }
        if(result.length === 0) {
            const hashedPassword = bcrpyt.hashSync(password, 10); // Enable for password encryption
            db.query(query, [username, hashedPassword], (err, result) => {
                if (err) {throw err;}
                res.send({message: 'User created'});
            });
        }
    })
})

app.post("/login", (req, res, next) => {
    passport.authenticate('local',(err, user, info) => {
        if(err) {throw err;}
        if(!user) { 
            res.send("No user exists")
        }
        if(user) {
            req.login(user, (err) => {
                if(err) {throw err;}
                res.send("User logged in")
                console.log(user)
            })
        }
    })(req, res, next);
})


app.get("/getUser", (req, res) => {
    res.send(req.user)
})


app.listen(5000, () => {
    console.log('Server started on port 5000')
}); 


