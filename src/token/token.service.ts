/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from './token.model';
import { response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Token } from '@prisma/client';
import { PrismaHelpers } from 'src/utils/helper-classes/prisma-extends';

@Injectable()
export class TokenService extends PrismaHelpers {
  private logger = new Logger(TokenService.name);

  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {
    super(prisma);
  }

  async saveToken(token: string, id: string): Promise<Token | any> {
    try {
      const decodedJwtAccessToken: JwtPayload = this.jwtService.decode(token);

      const expiresAt = new Date(Number(decodedJwtAccessToken.exp) * 1000);
      const createdAt = new Date(Number(decodedJwtAccessToken.iat) * 1000);

      // INFO: Fix UTC timezone for GMT-0300
      createdAt.setHours(createdAt.getHours() - 3);
      expiresAt.setHours(expiresAt.getHours() - 3);

      const newToken: Prisma.TokenCreateInput = {
        token,
        user: this.getConnectionObject(id),
        createdAt,
        expiresAt,
      };

      const tokenDoc = await this.prisma.token.findFirst({
        where: { userId: id },
      });

      if (!tokenDoc) {
        return await this.prisma.token.create({
          data: { ...newToken },
        });
      }

      return await this.prisma.token.update({
        where: { id: tokenDoc.id },
        data: { ...newToken },
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Ocurred an error on trying to save token',
      });
    }
  }

  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const parsedToken = accessToken.replace('Bearer ', '');
      const foundedToken = await this.prisma.token.findFirst({
        where: { token: parsedToken },
      });

      if (!foundedToken) {
        return false;
      }
      return foundedToken !== null ? true : false;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }

  async verifyTokenById(userId: string): Promise<any> {
    try {
      return await this.prisma.token.findFirst({
        where: { userId },
      });
    } catch (error) {
      this.logger.error(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Ocurred an error on trying to verify token',
      });
    }
  }

  async deleteTokenByAccessToken(accessToken: string): Promise<any> {
    try {
      return await this.prisma.token.delete({
        where: { token: accessToken },
      });
    } catch (error) {
      if (error.meta.cause == 'Record to delete does not exist.') {
        throw new Error('User not logged');
      }
      this.logger.error(error);
      throw new Error('Something goes wrong, please try again later.');
    }
  }

  async getUserIdFromToken(token: string) {
    const extractedToken = token.replace('Bearer ', '');
    const { sub } = this.jwtService.decode(extractedToken);
    return sub;
  }
}
