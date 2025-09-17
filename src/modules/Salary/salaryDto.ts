import { IsNotEmpty, IsString, Matches, IsNumber, Min, IsOptional, IsPositive } from 'class-validator';

export class SalaryCreateDto {
  @IsNotEmpty({ message: 'تاریخ پرداخت الزامی است.' })
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ پرداخت باید به صورت yyyy:mm:dd باشد.',
  })
  paymentDate: string;

  @IsNotEmpty({ message: 'ساعت پرداخت الزامی است.' })
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'فرمت ساعت پرداخت باید به صورت HH:MM باشد.',
  })
  paymentTime: string;

  @IsOptional()
  @IsString({ message: 'توضیحات باید رشته باشد.' })
  description?: string;

  @IsNotEmpty({ message: 'مبلغ الزامی است.' })
  @IsNumber({}, { message: 'مبلغ باید یک عدد معتبر باشد.' })
  @Min(0, { message: 'مبلغ نمی‌تواند منفی باشد.' })
  @IsPositive({ message: 'مبلغ باید مثبت باشد.' })
  amount: number;

  @IsNotEmpty({ message: 'شناسه معلم الزامی است.' })
  @IsNumber({}, { message: 'شناسه معلم باید عدد باشد.' })
  teacherId: number;
}

export class SalaryUpdateDto {
  @IsOptional()
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ پرداخت باید به صورت yyyy:mm:dd باشد.',
  })
  paymentDate?: string;

  @IsOptional()
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'فرمت ساعت پرداخت باید به صورت HH:MM باشد.',
  })
  paymentTime?: string;

  @IsOptional()
  @IsString({ message: 'توضیحات باید رشته باشد.' })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: 'مبلغ باید یک عدد معتبر باشد.' })
  @Min(0, { message: 'مبلغ نمی‌تواند منفی باشد.' })
  amount?: number;

  @IsOptional()
  @IsNumber({}, { message: 'شناسه معلم باید عدد باشد.' })
  teacherId?: number;
}