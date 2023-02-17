import { MessagingModule } from './messaging/messaging.module';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenModule } from './token/token.module';

@Module({
  imports: [ExpenseModule, AuthModule, TokenModule, MessagingModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService],
})
export class AppModule {}
