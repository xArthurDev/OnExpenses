import { AccessPermissionService } from './../guards/access-permission/access-permission.service';
import { JwtService } from '@nestjs/jwt';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/token/token.service';
import { MessagingService } from 'src/messaging/messaging.service';

@Module({
  imports: [],
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    AuthService,
    PrismaService,
    JwtService,
    TokenService,
    AccessPermissionService,
    MessagingService,
  ],
})
export class ExpenseModule {}
