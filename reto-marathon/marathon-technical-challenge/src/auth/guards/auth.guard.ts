import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService
  ) { }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      await this.jwtService.verifyAsync(
        token,
        {
          secret: this.config.get('security').jwtSecret
        }
      );
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  public extractTokenFromHeader(request: Request): string | undefined {
    const auth = request.headers['authorization'];
    if (auth) {
      const [type, token] = auth.split(' ') ?? [];
      if (type === 'Bearer') return token;
    }
    return undefined;
  }

}
