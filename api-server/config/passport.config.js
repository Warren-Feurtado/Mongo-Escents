const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin.model')


passport.use(
    new localStrategy({usernameFiled: 'email'},
    (username, password, done) => {
        Admin.findOne({email: username},
            (err, admin) => {
                if (err) return done(err);

                // Unknown User
                else if (!admin)
                return done(null, false, {message: 'Email is not registered.'});

                //Wrong Password
                else if (!admin.verifyPassword(password))
                return done(null, false, {message: 'Incorrect Password.'});

                //Authentication Successfully
                else return done(null, admin);
            }
        );
    })
)