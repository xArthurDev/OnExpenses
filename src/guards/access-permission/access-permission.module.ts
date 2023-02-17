import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AccessPermissionService } from './access-permission.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AccessPermissionService, PrismaService],
  exports: [AccessPermissionService],
})
export class AccessPermissionModule {}
