const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const cookieSession = require('cookie-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const fs = require('node-fs');
const multer = require('multer');
const User = require('./login')
const Audio = require('./audio');

// Initializing the packages 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession({ 
    secret: 'mine', 
    resave: 'false', 
    saveUninitialized: false
})); 

// Establish cross-origin relation
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
}));

// Initialize sessions 
app.use(cookieParser('mine'));
app.use(passport.initialize());
app.use(passport.session()); 
require("./passportConfig")(passport);

// DB connections
const dbstring = "mongodb://localhost:27017/Users";

const conn = mongoose.createConnection(dbstring).
asPromise();
conn.readyState; // 1, means Mongoose is connected

mongoose.connect( dbstring);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const check = await User.exists({ username: req.body.username})

        try {
            if (check) {
                res.send("User already exits")
                console.log(req.body)
            }
            else {
                console.log(req.body)
                 // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create a new user using the User model
                const newUser = new User({
                    username: username,
                    password: hashedPassword
                });

                // Save the new user to the database
                await newUser.save();
                res.send({ message: 'User created' });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'An error occurred during registration' });
        }
})

app.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.send("No user exists");
        }
        req.login(user, (err) => {
            if (err) {
                throw err;
            }
            res.send("User logged in");
            console.log(user);
        });
    })(req, res, next);
});


// Set up Multer for file upload
const upload = multer({ dest: 'uploads/' });


// Upload route
app.post('/upload', upload.single('audio'), async (req, res) => {
    try {
      // Read the uploaded audio file
      const audioData = fs.readFileSync(req.file.path);
  
      // Create a new audio document
      const newAudio = new Audio({
        title: req.body.title,
        audio: {
          data: audioData,
          contentType: req.file.mimetype
        }
      });
  
      // Save the audio document to the database
      await newAudio.save();
  
      // Send response
      res.send('Audio file uploaded successfully');
    } catch (error) {
      console.error('Error uploading audio file', error);
      res.status(500).send('An error occurred while uploading the audio file');
    }
  });

app.get("/getUser", (req, res) => {
    res.send(req.user)
})


app.listen(5000, () => {
    console.log('Server started on port 5000')
}); 

