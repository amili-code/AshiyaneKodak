import {
  IsNotEmpty,
  Matches,
  IsIn,
  IsInt,
  Min,
} from 'class-validator';

export class ChildsGradleDto {
  @IsNotEmpty({ message: 'تاریخ ثبت نام الزامی است.' })
  @Matches(/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ ثبت نام باید به صورت 1404/02/12 باشد.',
  })
  registerDate: string;

  @IsNotEmpty({ message: 'تاریخ اتمام دوره الزامی است.' })
  @Matches(/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ اتمام باید به صورت 1404/02/12 باشد.',
  })
  endDate: string;

  @IsNotEmpty({ message: 'مقطع الزامی است.' })
  @IsIn(['شیرخوار', 'نوباوه', 'پیش یک', 'پیش دو'], {
    message: 'مقطع باید یکی از شیرخوار، نوباوه، پیش یک یا پیش دو باشد.',
  })
  grade: string;

  @IsNotEmpty({ message: 'مبلغ باقی مانده الزامی است.' })
  @IsInt({ message: 'مبلغ باید عدد باشد.' })
  @Min(0, { message: 'مبلغ باقی مانده نمی‌تواند منفی باشد.' })
  remainingAmount: number;

  @IsNotEmpty({ message: 'انتخاب بچه الزامی است.' })
  @IsInt({ message: 'شناسه بچه باید عدد باشد.' })
  childId: number;
}