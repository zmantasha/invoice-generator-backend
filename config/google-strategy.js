const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")
const bcrypt = require('bcrypt')
const UserServices= require("../services/userServices");
const generateToken = require('../utils/generateTokens');
const userModel = require('../models/userModel');
const UserServicesInstance= new UserServices()


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, done) =>{
    try {
        let user = await UserServicesInstance.findByEmail(profile._json.email)
        if(!user){
            const lastSixDigitsID = profile.id.substring(profile.id.length - 6);
            const lastTwoDigitsName = profile._json.name.substring(profile._json.name.length - 2);
            const newPass = lastTwoDigitsName + lastSixDigitsID
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt.hash(newPass, salt);
            console.log(profile)
            user = await userModel.create({
                firstName: profile._json.name,
                lastName:'',
                email: profile._json.email,
                is_verified: true,
                password: hashedPassword,
              })
        }

         // Generate JWT tokens
      const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateToken(user);
      return done(null, { user, accessToken, refreshToken, accessTokenExp, refreshTokenExp });

    } catch (error) {
      return done(error)  
    }

   
  }
));
