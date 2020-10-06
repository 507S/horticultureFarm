const passport = require('passport');
const googleStrategy = require('passport-google-oauth');

passport.use(
    new googleStrategy({
        //options for google strategy
    }),()=>{
        //passport callback function
    }
)