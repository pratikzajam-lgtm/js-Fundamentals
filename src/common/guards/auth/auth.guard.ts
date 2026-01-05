import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { AuthJwtPayload } from '../../types/jwt.interface'


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException({
          statusCode: 409,
          message: "Authorization Header Is Missing",
          data: null
        })
      }

      let token = authHeader.split(" ")[1];


      if (!token) {
        throw new UnauthorizedException({
          statusCode: 409,
          message: "Token Not Found",
          data: null
        })
      }


      if (!process.env.JWT_SECRET) {
        throw new InternalServerErrorException({
          statusCode: 500,
          message: "Something Went Wrong",
          data: null
        });

      }

      const user = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as AuthJwtPayload;


      if (!user.isActive) {
        throw new InternalServerErrorException({
          statusCode: 500,
          message: "User Is Not Active",
          data: null
        });
      }

      if (!user) {
        throw new InternalServerErrorException({
          statusCode: 500,
          message: "JWT Token Not Found",
          data: null
        });
      }


      request.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      };
      return true
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: error.message,
        data: null
      });
    }
  }
}
