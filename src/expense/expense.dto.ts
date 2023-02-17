import { ApiProperty } from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class ExpenseCreateDto {
  @IsString()
  @MaxLength(191)
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'Descrição...' })
  description: string;

  @IsString()
  @Length(10, 10)
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: '2023-02-16' })
  date: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty({ required: true, type: Number, example: 50.0 })
  amount: number;
}

export class ExpenseUpdateDto {
  @IsString()
  @MaxLength(191)
  @IsOptional()
  @ApiProperty({ required: true, type: String, example: 'Descrição...' })
  description?: string;

  @IsString()
  @Length(10, 10)
  @IsOptional()
  @ApiProperty({ required: true, type: String, example: '2023-02-16' })
  date?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({ required: true, type: Number, example: 50.0 })
  amount?: number;
}

export interface IExpenseCreateResponse {
  status: string;
  expense: Expense;
}
