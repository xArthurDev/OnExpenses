import { MockContext, Context, createMockContext } from '../../context';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPositiveNumber', async: false })
export class IsPositiveNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args?: ValidationArguments) {
    if (typeof value !== 'number') {
      return false;
    }
    return value >= 0;
  }
}

@ValidatorConstraint({ name: 'futureDate', async: false })
export class FutureDateConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments) {
    if (!(value instanceof Date)) {
      return false;
    }
    const now = new Date();
    return value.getTime() <= now.getTime();
  }
}

@ValidatorConstraint({ name: 'maxLength', async: false })
export class MaxLengthConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return value.length <= args.constraints[0];
  }
}

let mockCtx: MockContext;
let ctx: Context;

const fakeMeta = {
  createdAt: new Date(),
  createdBy: process.env.SUPER_USER_ID,
  lastBrowserAgent: 'Chrome',
  lastIpAddress: '::1',
};

const data = {
  description: 'Expense 1',
  amount: 100,
  date: new Date('2022-02-10'),
  meta: fakeMeta,
  user: {
    connect: {
      id: process.env.SUPER_USER_ID,
    },
  },
};

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe('IsPositiveNumberConstraint', () => {
  const constraint = new IsPositiveNumberConstraint();

  it('should return true for a positive number', () => {
    expect(constraint.validate(data.amount)).toBe(true);
  });
});

describe('IsFutureDateConstraint', () => {
  const constraint = new FutureDateConstraint();

  it('should return true for a not in future date', () => {
    expect(constraint.validate(data.date)).toBe(true);
  });
});

describe('MaxLengthConstraint', () => {
  const constraint = new MaxLengthConstraint();

  it('should return true for a string with length less than or equal to the max length', () => {
    const args: ValidationArguments = {
      value: data.description,
      constraints: [191],
      targetName: 'Expense',
      object: data,
      property: 'description',
    };
    expect(constraint.validate(data.description, args)).toBe(true);
  });
});

describe('createExpense', () => {
  it('should create an expense', async () => {
    await ctx.prisma.expense.create({
      data,
    });
  });
});
