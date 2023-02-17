import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrismaHelpers {
  constructor(public prismaService: PrismaService) {}

  protected getConnectionObject(itemId: string) {
    return itemId
      ? {
          connect: { id: itemId },
        }
      : undefined;
  }
}
