import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { configs } from './envConfigs';

const GOOGLE_CLIENT_ID = 'your id';
const GOOGLE_CLIENT_SECRET = 'your id';

passport.use(
  new GoogleStrategy(
    {
      clientID: configs.googleClientId as string,
      clientSecret: configs.googleClientSecret as string,
      callbackURL: configs.googleLoginCallback,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    },
    (accessToken, refreshToken, profile, cb) => {
      const userObj = {
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        profile: profile._json.picture,
        verified: profile._json.email_verified,
        signInMethod: profile.provider,
        googleId: profile.id,
        email: profile._json.email,
        accessToken,
        refreshToken,
      };
      try {
        //     const existingUser = await User.findOne({ googleId: profile.id });

        //     if (existingUser) {
        //       return cb(null, existingUser);
        //     }

        //     const newUser = new User({ googleId: profile.id });

        //     await newUser.save();
        return cb(null, userObj);
      } catch (error) {
        return cb(error as Error, undefined);
      }
    }
  )
);
