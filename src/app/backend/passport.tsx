// backend/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import User, { IUser } from './models/User';

passport.use(
  new GoogleStrategy(
    {
      clientID: 'GOOGLE_CLIENT_ID',
      clientSecret: 'GOOGLE_CLIENT_SECRET',
      callbackURL: '/auth/google/callback',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ): Promise<void> => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName || '',
          email: profile.emails ? profile.emails[0].value : '',
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
