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
const path = require('path');
const fileUpload = require("express-fileupload");
const multer = require('multer');
const {User, File} = require('./login');

// Initializing the packages 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession({ 
    secret: 'mine', 
    resave: 'false', 
    saveUninitialized: false
})); 
app.use(fileUpload());

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

/*
// Endpoint to handle file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Directory where audio files will be uploaded
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  
  // File filter for webm and mp3 files
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/webm' || file.mimetype === 'audio/mp3') {
      cb(null, true);
    } else {
      cb(new Error('Only webm and mp3 files are allowed'));
    }
  };
  
  const upload = multer({
    storage: "./uploads/",
    limits: {
        fileSize: 10 * 1024 * 1024, // No larger than 10mb
        fieldSize: 10 * 1024 * 1024, // No larger than 10mb
    },
  })

  const audioSchema = new mongoose.Schema({
    audio: Buffer
  });
  
  const Audio = mongoose.model('Audio', audioSchema);
  
app.post('/upload', upload.single('audio'), (req, res) => {
    const audio = new Audio({
      audio: req.file
    });
  
    audio.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error uploading audio' });
      } else {
        res.send({ message: 'Audio uploaded successfully' });
      }
    });
  });
  
app.get("/upload", async (req, res) => {
    try {
        const items = await Audio.find();
        res.status(200).json({ items });
      } catch (error) {
        console.log(error);
      }
})
*/

app.get("/getUser", (req, res) => {
    res.send(req.user)
})


app.listen(5000, () => {
    console.log('Server started on port 5000')
}); 

