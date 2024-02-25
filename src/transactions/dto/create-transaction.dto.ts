import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  type: 'expense' | 'income';

  @IsNotEmpty()
  category: Category;
}
