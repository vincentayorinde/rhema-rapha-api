import { Injectable, HttpStatus } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET } from '../../configuration/config';
import { ResultException } from '../../configuration/exceptions/result';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async validate(req: any, _payload: any): Promise<any> {
    const isValid = await this.authenticationService.validateUser(req.email);

    if (!isValid) {
      return new ResultException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return isValid;
  }
}
