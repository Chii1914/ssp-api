import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    const user = await this.authService.findOrCreateUser(email);
    if (!user) {
      return null
    }
    const jwt = await this.authService.validateOAuthLogin(profile.id, 'google', email, user.rol);
    done(null, { jwt });
  }
}
