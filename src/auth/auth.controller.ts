import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    // Handles the Google OAuth callback
    const jwt: string = req.user.jwt;
    // Redirect user with the JWT token, or send it however you prefer
    //Responder con esta wea para luego manejarla en el frontend 
    res.redirect(`http://localhost:3001/login/success?jwt=${jwt}`);
  }
}
