import { Expense } from '@prisma/client';

export interface INewExpenseEmailParams {
  email: string;
  expense: Expense;
}
