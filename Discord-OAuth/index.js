require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    discordStrategy = require('passport-discord').Strategy,
    cookieParser = require('cookie-parser'),
    app = express();

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}))

passport.use(new discordStrategy({
    clientID: process.env.id,
    clientSecret: process.env.secret,
    scope: ['identify', 'guilds'],
    callbackURL: 'http://localhost/auth/discord/callback'
}, async (acessToken, refreshToken, profile, cb) => {
    return cb("", profile)
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', async (req, res) => {
    res.send('<a href="/auth/discord">Login</a>')
})

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), async (req, res) => {
    res.redirect('/dashboard')
})
app.get('/dashboard', async (req, res) => {
    res.send(req.user)
})

app.listen('80', async () => console.log('site online'))
