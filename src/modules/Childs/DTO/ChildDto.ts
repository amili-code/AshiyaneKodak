import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsUrl,
  Matches,
} from 'class-validator';

export class ChildCreateDto {
  @IsNotEmpty({ message: 'نام الزامی است.' })
  @IsString({ message: 'نام باید رشته باشد.' })
  firstName: string;

  @IsNotEmpty({ message: 'نام خانوادگی الزامی است.' })
  @IsString({ message: 'نام خانوادگی باید رشته باشد.' })
  lastName: string;

  @IsNotEmpty({ message: 'جنسیت الزامی است.' })
  @IsIn(['مرد', 'زن'], { message: 'جنسیت باید مرد یا زن باشد.' })
  gender: string;

  @IsNotEmpty({ message: 'شماره تلفن پدر الزامی است.' })
  @Matches(/^09\d{9}$/, { message: 'شماره تلفن پدر معتبر نیست.' })
  fatherPhone: string;

  @IsNotEmpty({ message: 'شماره تلفن مادر الزامی است.' })
  @Matches(/^09\d{9}$/, { message: 'شماره تلفن مادر معتبر نیست.' })
  motherPhone: string;

  @IsNotEmpty({ message: 'سن بچه الزامی است.' })
  age: string;

  @IsNotEmpty({ message: 'تصویر الزامی است.' })
  @IsUrl({}, { message: 'لینک تصویر معتبر نیست.' })
  image: string;

  @IsNotEmpty({ message: 'تاریخ تولد الزامی است.' })
  @Matches(/^14\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ تولد باید به صورت 1404/02/12 باشد.',
  })
  birthdate: string;

  @IsNotEmpty({ message: 'آدرس محل سکونت الزامی است.' })
  @IsString({ message: 'آدرس باید رشته باشد.' })
  address: string;

  @IsOptional()
  @IsString({ message: 'توضیحات باید رشته باشد.' })
  description?: string;
}