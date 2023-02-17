import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

interface IPermissionGuardParams {
  collection: string;
  id: string;
  userId: string;
}

@Injectable()
export class AccessPermissionService {
  constructor(private prisma: PrismaService) {}
  async ownsTheContent(params: IPermissionGuardParams): Promise<boolean> {
    const { collection, id, userId } = params;
    const document = await this.prisma[collection].findFirst({
      where: {
        id,
      },
    });
    if (!document) {
      throw new BadRequestException('Document not found');
    }
    if (document.meta.createdBy !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    } else {
      return true;
    }
  }
}
