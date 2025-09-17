import { IsNotEmpty, IsString, Matches, IsIn, IsOptional, IsNumber } from 'class-validator';

export class LeaveCreateDto {
  @IsNotEmpty({ message: 'نوع مرخصی الزامی است.' })
  @IsIn(['ساعتی', 'روزانه'], { message: 'نوع مرخصی باید ساعتی یا روزانه باشد.' })
  type: 'ساعتی' | 'روزانه';

  @IsNotEmpty({ message: 'تاریخ شروع الزامی است.' })
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ شروع باید به صورت yyyy:mm:dd باشد.',
  })
  startDate: string;

  @IsOptional()
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ پایان باید به صورت yyyy:mm:dd باشد.',
  })
  endDate?: string;

  @IsOptional()
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'فرمت ساعت شروع باید به صورت HH:MM باشد.',
  })
  startTime?: string;

  @IsOptional()
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'فرمت ساعت پایان باید به صورت HH:MM باشد.',
  })
  endTime?: string;

  @IsNotEmpty({ message: 'شناسه معلم الزامی است.' })
  @IsNumber({}, { message: 'شناسه معلم باید عدد باشد.' })
  teacherId: number;
}

export class LeaveUpdateDto {
  @IsOptional()
  @IsIn(['ساعتی', 'روزانه'], { message: 'نوع مرخصی باید ساعتی یا روزانه باشد.' })
  type?: 'ساعتی' | 'روزانه';

  @IsOptional()
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ شروع باید به صورت yyyy:mm:dd باشد.',
  })
  startDate?: string;

  @IsOptional()
  @Matches(/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ پایان باید به صورت yyyy:mm:dd باشد.',
  })
  endDate?: string;

  @IsOptional()
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'فرمت ساعت شروع باید به صورت HH:MM باشد.',
  })
  startTime?: string;

  @IsOptional()
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, {
    message: 'فرمت ساعت پایان باید به صورت HH:MM باشد.',
  })
  endTime?: string;

  @IsOptional()
  @IsNumber({}, { message: 'شناسه معلم باید عدد باشد.' })
  teacherId?: number;
}