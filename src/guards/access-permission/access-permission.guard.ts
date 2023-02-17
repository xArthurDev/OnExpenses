import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtRecoveryDecode } from 'src/interfaces/jwt/jwt-recovery-decode.interface';
import { AccessPermissionService } from './access-permission.service';

@Injectable()
export class AccessPermissionGuard implements CanActivate {
  constructor(
    private accessPermissionService: AccessPermissionService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const id = context.switchToHttp().getRequest().params.id;
    if (id.length !== 24 || !isNaN(id)) {
      throw new BadRequestException('Please provide a valid id');
    }
    const routeUrl = context.switchToHttp().getRequest().url;
    const collection = routeUrl.split('/')[1];

    if (!collection) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest();
    const token = headers.authorization.replace('Bearer ', '');

    const payloadDecoded: IJwtRecoveryDecode | any =
      this.jwtService.decode(token);
    const userId = payloadDecoded.sub;

    const params = {
      collection,
      id,
      userId,
    };

    return await this.accessPermissionService.ownsTheContent(params);
  }
}
