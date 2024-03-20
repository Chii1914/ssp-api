import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Add your custom authentication logic here
    // For example, you can call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    if (err || !user) {
      // Customize the response message and still return a 401 status
      throw new UnauthorizedException({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Your custom message here, e.g., token invalid or expired.',
      });
    }
    return user;
  }
}
