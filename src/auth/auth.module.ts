import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/guards/jwt/constants';
import { PrismaService } from 'src/prisma.service';
import { TokenModule } from 'src/token/token.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/guards/jwt/jwt.strategy';
import { LocalStrategy } from 'src/guards/local/local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      privateKey: `${jwtConstants.secret}`,
      signOptions: { expiresIn: '24h' },
    }),
    TokenModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
