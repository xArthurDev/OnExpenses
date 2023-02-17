import { IJwtRecoveryDecode } from 'src/interfaces/jwt/jwt-recovery-decode.interface';
import { AuthService } from 'src/auth/auth.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  ExpenseCreateDto,
  ExpenseUpdateDto,
  IExpenseCreateResponse,
} from './expense.dto';
import { Request } from 'express';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PrismaHelpers } from 'src/utils/helper-classes/prisma-extends';
import {
  getCreateMeta,
  getUpdateMeta,
} from 'src/utils/helper-classes/prisma-utils';
import {
  IFilterData,
  IFilterQuery,
} from 'src/interfaces/filter/filter.interface';
import { SortOrder } from 'src/interfaces/filter/sorting.interface';
import { IQuery } from 'src/interfaces/filter/query.interface';
import { MessagingService } from 'src/messaging/messaging.service';

@Injectable()
export class ExpenseService extends PrismaHelpers {
  private logger = new Logger(ExpenseService.name);

  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
    private messagingService: MessagingService,
  ) {
    super(prisma);
  }

  async create(
    expenseData: ExpenseCreateDto,
    request: Request,
  ): Promise<IExpenseCreateResponse> {
    const decryptedToken = this.authService.decryptJwt(
      request.headers.authorization,
    );
    const user = await this.authService.findUserById(decryptedToken.sub);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const parsedDate = new Date(expenseData.date);
    const today = new Date();
    if (parsedDate.getTime() > today.getTime()) {
      throw new BadRequestException('Date cannot be in the future');
    }

    try {
      const meta = getCreateMeta(decryptedToken.sub, request);
      const { description, amount } = expenseData;
      const newExpense: Prisma.ExpenseCreateInput = {
        description,
        user: this.getConnectionObject(decryptedToken.sub),
        meta,
        date: parsedDate,
        amount,
      };
      const expense = await this.prisma.expense.create({ data: newExpense });
      this.logger.verbose(`Expense ${expense.id} has been created`);
      const params = {
        email: user.email,
        expense,
      };
      this.messagingService.sendNewExpenseEmail(params);
      return {
        status: 'success',
        expense,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error creating expense');
    }
  }

  async getById(id: string): Promise<IExpenseCreateResponse> {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: {
          id,
        },
      });
      this.logger.verbose(`Expense ${id} has been retrieved`);
      return {
        status: 'success',
        expense,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error getting expense');
    }
  }

  async list(filterQuery: IFilterQuery, decryptedToken: IJwtRecoveryDecode) {
    try {
      const filterData = this.createFilterData(filterQuery);
      const query = filterData.query;
      const pagination = filterData.pagination;
      const sorting = filterData.sorting;

      const where = this.buildQuery(query, decryptedToken);
      const count = this.getCount(where);

      const result = await this.prisma.$transaction([
        count,
        this.prisma.expense.findMany({
          skip: pagination.limit * (pagination.page - 1),
          take: +pagination.limit,
          where,
          orderBy: {
            [sorting.sortBy]: sorting.sortOrder,
          },
        }),
      ]);

      this.logger.verbose(`Expenses has been retrieved`);
      return {
        total: result[0],
        elements: result[1],
        limit: pagination.limit,
        page: pagination.page,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error retrieving expenses');
    }
  }

  getCount(where: any) {
    return this.prisma.expense.count({
      where,
    });
  }

  buildQuery(query: IQuery, decryptedToken: IJwtRecoveryDecode) {
    const filterAllowedContent = {
      userId: {
        equals: decryptedToken.sub,
      },
    };
    if (!query.filterBy || !query.filterValue) {
      return filterAllowedContent;
    }
    if (query.filterBy === 'ALL') {
      return this.fullQuery(query.filterValue, filterAllowedContent);
    } else {
      return {
        [query.filterBy]: {
          contains: query.filterValue,
          mode: 'insensitive',
        },
        ...filterAllowedContent,
      };
    }
  }

  fullQuery(value: string, filterAllowedContent: any) {
    const queryProperties = ['description', 'amount'];
    const finalQuery = queryProperties.map((property) => {
      return {
        [property]: {
          contains: value,
          mode: 'insensitive',
        },
        ...filterAllowedContent,
      };
    });
    return {
      OR: finalQuery,
    };
  }

  createFilterData(query: IFilterQuery): IFilterData {
    const {
      page = 1,
      limit = 10,
      filterBy,
      filterValue,
      sortBy = 'description',
      sortOrder,
    } = query;
    const sorting = {
      sortBy,
      sortOrder: sortOrder === 'desc' ? SortOrder.DESC : SortOrder.ASC,
    };
    return {
      pagination: { page, limit },
      query: { filterBy, filterValue },
      sorting,
    };
  }

  async update(
    id: string,
    expenseData: ExpenseUpdateDto,
    decryptedToken: IJwtRecoveryDecode,
    request: Request,
  ) {
    try {
      const updatedData = { ...expenseData } as any;
      if (expenseData.date) {
        const parsedDate = new Date(expenseData.date);
        const today = new Date();
        if (parsedDate.getTime() > today.getTime()) {
          throw new BadRequestException('Date cannot be in the future');
        }
        updatedData.date = parsedDate;
      }
      const foundExpense = await this.prisma.expense.findUnique({
        where: {
          id,
        },
      });
      const oldMeta = foundExpense.meta;
      const meta = getUpdateMeta(decryptedToken.sub, request, oldMeta);
      updatedData.meta = meta;
      const expense = await this.prisma.expense.update({
        where: {
          id,
        },
        data: {
          ...updatedData,
        },
      });
      this.logger.verbose(`Expense ${id} has been updated`);
      return {
        status: 'success',
        expense,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error updating expense');
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.expense.delete({
        where: {
          id,
        },
      });
      this.logger.verbose(`Expense ${id} has been deleted`);
      return {
        status: 'success',
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error deleting expense');
    }
  }
}
