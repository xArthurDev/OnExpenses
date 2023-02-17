import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [TokenService, AuthService, PrismaService],
  exports: [TokenService],
})
export class TokenModule {}
