// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async validateOAuthLogin(thirdPartyId: string, provider: string, email: string): Promise<string> {
    const payload = {
      sub: thirdPartyId,
      provider,
      email,
      rol: "admin"
    };
    const jwt = this.jwtService.sign(payload);
    return jwt;
  }
}
