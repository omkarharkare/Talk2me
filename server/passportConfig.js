const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./login'); // Import the Mongoose user model

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            // Find the user by username in the database
            User.findOne({ username: username }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'No user exists' });
                }
                
                // Compare passwords
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return done(err);
                    }
                    if (result) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect password' });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        // Find the user by id in the database
        User.findById(id, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            // If user is found, return user info
            const userinfo = {
                id: user.id,
                username: user.username
            };
            done(null, userinfo);
        });
    });
};

