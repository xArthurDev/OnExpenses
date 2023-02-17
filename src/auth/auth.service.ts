import { TokenService } from './../token/token.service';
import {
  ConflictException,
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  SignUpCredentialsDto,
  SignInCredentialsDto,
  ISignUpResponse,
  ISignOutResponse,
} from './auth.dto';
import { getCreateMeta } from 'src/utils/helper-classes/prisma-utils';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.findUserByEmail(email);
    const hashResult = this.compareHashPassword(password, user.password);
    if (user && hashResult) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(
    credentials: SignUpCredentialsDto,
    request: Request,
  ): Promise<ISignUpResponse> {
    const { email, password } = credentials;
    const user = await this.findUserByEmail(email);
    if (user) {
      throw new ConflictException('Email already exists');
    }
    try {
      const hashedPassword = (await bcrypt.hash(password, 10)) as string;
      const meta = getCreateMeta(process.env.SUPER_USER_ID, request);
      const newUser = await this.prisma.user.create({
        data: { ...credentials, password: hashedPassword, meta },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      const accessToken = await this.signJwt(newUser);
      await this.tokenService.saveToken(accessToken, newUser.id);
      this.logger.verbose(
        `User ${newUser.email} has been successfully signed up`,
      );
      return {
        status: 'success',
        accessToken,
        expiresIn: '24h',
        user: newUser,
      };
    } catch (error) {
      this.logger.error(`Failed to sign up user ${email}`, error.stack);
      throw new BadRequestException('Error signing up user');
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async signJwt(userData: Partial<User>): Promise<string> {
    const payload = {
      email: userData.email,
      sub: userData.id,
    };
    return this.jwtService.sign(payload, {
      secret: `${process.env.SECRET_JWT}`,
      expiresIn: '24h',
    });
  }

  async signIn(credentials: SignInCredentialsDto): Promise<ISignUpResponse> {
    const foundUser = await this.findUserByEmail(credentials.email);
    const { password, ...user } = foundUser;
    if (!user) {
      throw new Error('Invalid credentials');
    }
    try {
      const accessToken = await this.signJwt(user);
      await this.tokenService.saveToken(accessToken, user.id);
      this.logger.verbose(`User ${user.email} has been successfully signed in`);
      return {
        status: 'success',
        accessToken,
        expiresIn: '24h',
        user,
      };
    } catch (error) {
      this.logger.error(
        `Failed to sign in user ${credentials.email}`,
        error.stack,
      );
      throw new BadRequestException('Error signing in user');
    }
  }

  async signOut(request: Request, email: string): Promise<ISignOutResponse> {
    try {
      const accessToken = request.headers.authorization;
      const parsedToken = accessToken.replace('Bearer ', '');
      await this.tokenService.deleteTokenByAccessToken(parsedToken);
      this.logger.verbose(`User ${email} has been successfully signed out`);
      return {
        status: 'success',
        message: 'User has been successfully signed out',
      };
    } catch (error) {
      this.logger.error(`Failed to sign out user ${email}`, error.stack);
      throw new BadRequestException('Error signing out user');
    }
  }

  decryptJwt(token: string): any {
    if (!token) {
      return null;
    }
    const parsedToken = token.replace('Bearer ', '');
    return this.jwtService.verify(parsedToken, {
      secret: `${process.env.SECRET_JWT}`,
    });
  }

  private compareHashPassword(
    password: string,
    passwordHashed: string,
  ): boolean {
    const result = bcrypt.compareSync(password, passwordHashed);
    return result;
  }
}
