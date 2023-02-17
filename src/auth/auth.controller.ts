import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Logger,
  Post,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import {
  SignUpCredentialsDto,
  ISignUpResponse,
  SignInCredentialsDto,
  ISignOutResponse,
} from './auth.dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common/decorators';
import { TokenGuard } from 'src/guards/token/token.guard';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Fazer cadastro' })
  async signUp(
    @Body(ValidationPipe) credentials: SignUpCredentialsDto,
    @Req() request: Request,
  ): Promise<ISignUpResponse> {
    this.logger.verbose(`User ${credentials.email} is trying to sign up`);
    return await this.authService.signUp(credentials, request);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Fazer login' })
  async signIn(
    @Body(ValidationPipe) credentials: SignInCredentialsDto,
  ): Promise<ISignUpResponse> {
    this.logger.verbose(`User ${credentials.email} is trying to sign in`);
    return await this.authService.signIn(credentials);
  }

  @UseGuards(JwtAuthGuard, TokenGuard)
  @Post('signout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fazer logout' })
  async signOut(@Req() request: Request): Promise<ISignOutResponse> {
    const accessToken = request.headers.authorization;
    const decryptedToken = this.authService.decryptJwt(accessToken);
    this.logger.verbose(`User ${decryptedToken.email} is trying to sign out`);
    return await this.authService.signOut(request, decryptedToken.email);
  }
}
