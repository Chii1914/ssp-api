import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Roles } from 'src/common/roles/roles.decorator';

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
    const redirectUri = process.env.FRONTEND_URL;
    // Redirect user with the JWT token, or send it however you prefer
    //Responder con esta wea para luego manejarla en el frontend 
    res.redirect(`${redirectUri}/success?token=${jwt}`);
  }

  @Get('alumno')
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  myFunction_a(){
    return "hola, soy ruta protegida de alumno";
    
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  myFunction_ad(){
    return "hola, soy ruta protegida de admin";
    
  }
  /*
  fetch('http://localhost:3000/api/auth/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('yourTokenKey')}`
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error)); 
  */
}
