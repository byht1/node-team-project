import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'email', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { name, emails, id } = profile;
    const user = {
      id,
      firstName: name.givenName,
      lastName: name.familyName,
      email: emails[0].value,
      accessToken,
    };
    done(null, user);
  }
}
