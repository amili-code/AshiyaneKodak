import { IsNotEmpty, IsString, Matches, IsOptional } from 'class-validator';

export class TeacherCreateDto {
  @IsNotEmpty({ message: 'نام الزامی است.' })
  @IsString({ message: 'نام باید رشته باشد.' })
  firstName: string;

  @IsNotEmpty({ message: 'نام خانوادگی الزامی است.' })
  @IsString({ message: 'نام خانوادگی باید رشته باشد.' })
  lastName: string;

  @IsNotEmpty({ message: 'شماره تلفن الزامی است.' })
  @Matches(/^09\d{9}$/, { message: 'شماره تلفن معتبر نیست.' })
  phone: string;

  @IsNotEmpty({ message: 'تاریخ ورود به مجموعه الزامی است.' })
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ باید به صورت yyyy:mm:dd باشد.',
  })
  entryDate: string;

  @IsNotEmpty({ message: 'تاریخ تولد الزامی است.' })
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ تولد باید به صورت yyyy:mm:dd باشد.',
  })
  birthdate: string;
}

export class TeacherUpdateDto {
  @IsOptional()
  @IsString({ message: 'نام باید رشته باشد.' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'نام خانوادگی باید رشته باشد.' })
  lastName?: string;

  @IsOptional()
  @Matches(/^09\d{9}$/, { message: 'شماره تلفن معتبر نیست.' })
  phone?: string;

  @IsOptional()
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ باید به صورت yyyy:mm:dd باشد.',
  })
  entryDate?: string;

  @IsOptional()
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ تولد باید به صورت yyyy:mm:dd باشد.',
  })
  birthdate?: string;
}