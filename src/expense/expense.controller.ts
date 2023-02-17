import { AuthService } from 'src/auth/auth.service';
import { ExpenseService } from './expense.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt/jwt-auth.guard';
import { TokenGuard } from 'src/guards/token/token.guard';
import {
  ExpenseCreateDto,
  ExpenseUpdateDto,
  IExpenseCreateResponse,
} from './expense.dto';
import { Request } from 'express';
import { AccessPermissionGuard } from 'src/guards/access-permission/access-permission.guard';
import { IFilterQuery } from 'src/interfaces/filter/filter.interface';

@ApiTags('Despesas (Relacionadas ao usuário logado)')
@UseGuards(JwtAuthGuard, TokenGuard)
@Controller('expense')
@ApiBearerAuth()
export class ExpenseController {
  private logger = new Logger(ExpenseController.name);

  constructor(
    private expenseService: ExpenseService,
    private authService: AuthService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Registrar despesas' })
  async create(
    @Body(ValidationPipe) expense: ExpenseCreateDto,
    @Req() request: Request,
  ): Promise<IExpenseCreateResponse> {
    const user = this.getRequestUser(request);
    this.logger.verbose(`User ${user.email} is trying to create expense`);
    return await this.expenseService.create(expense, request);
  }

  @UseGuards(AccessPermissionGuard)
  @Get('id/:id')
  @ApiOperation({ summary: 'Busca despesa por id' })
  async getById(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<IExpenseCreateResponse> {
    const user = this.getRequestUser(request);
    this.logger.verbose(`User ${user.email} is trying to get expense by id`);
    return await this.expenseService.getById(id);
  }

  @Get('list')
  @ApiOperation({ summary: 'Lista despesas' })
  @ApiParam({
    name: 'page',
    description: 'Número da página',
    required: false,
    type: Number,
  })
  @ApiParam({
    name: 'limit',
    description: 'Limite de itens por página',
    required: false,
    type: Number,
  })
  @ApiParam({
    name: 'filterBy',
    description: 'Filtrar por',
    required: false,
    type: String,
  })
  @ApiParam({
    name: 'filterValue',
    description: 'Valor do filtro',
    required: false,
    type: String,
  })
  @ApiParam({
    name: 'sortBy',
    description: 'Ordenar por',
    required: false,
    type: String,
  })
  @ApiParam({
    name: 'sortOrder',
    description: 'Ordem de ordenação',
    required: false,
    type: String,
  })
  async list(@Query() query: IFilterQuery, @Req() request: Request) {
    const user = this.getRequestUser(request);
    this.logger.verbose(`User ${user.email} is trying to list expenses`);
    return await this.expenseService.list(query, user);
  }

  @UseGuards(AccessPermissionGuard)
  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualizar despesa' })
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) expense: ExpenseUpdateDto,
    @Req() request: Request,
  ): Promise<IExpenseCreateResponse> {
    const user = this.getRequestUser(request);
    this.logger.verbose(`User ${user.email} is trying to update expense`);
    return await this.expenseService.update(id, expense, user, request);
  }

  private getRequestUser(request: Request) {
    const accessToken = request.headers.authorization;
    const decryptedToken = this.authService.decryptJwt(accessToken);
    return decryptedToken;
  }

  @UseGuards(AccessPermissionGuard)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deletar despesa' })
  async delete(@Param('id') id: string) {
    this.logger.verbose(`User is trying to delete expense`);
    return await this.expenseService.delete(id);
  }
}
