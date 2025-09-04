import {
  IsNotEmpty,
  IsInt,
  Min,
  IsIn,
  IsOptional,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Validator سفارشی برای بررسی اینکه فقط یکی از childGradeId یا motaghayeratId پر باشد
@ValidatorConstraint({ name: 'exclusiveReference', async: false })
export class ExclusiveReferenceConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    
    // اگر هر دو پر باشند یا هر دو خالی باشند، نامعتبر است
    return !((value && relatedValue) || (!value && !relatedValue));
  }

  defaultMessage(args: ValidationArguments) {
    return 'پرداخت باید فقط به یک مقطع یا یک متغیرات مرتبط باشد.';
  }
}

export class PaymentDto {
  @IsNotEmpty({ message: 'عنوان پرداخت الزامی است.' })
  title: string;

  @IsNotEmpty({ message: 'مبلغ پرداختی الزامی است.' })
  @IsInt({ message: 'مبلغ پرداختی باید عدد باشد.' })
  @Min(1, { message: 'مبلغ پرداختی باید بیشتر از ۰ باشد.' })
  amount: number;

  @IsNotEmpty({ message: 'تاریخ پرداخت الزامی است.' })
  @Matches(/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ پرداخت باید به صورت 1404/02/12 باشد.',
  })
  paymentDate: string;

  @IsOptional()
  @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'فرمت زمان باید به صورت HH:MM باشد.',
  })
  paymentTime: string;

  @IsNotEmpty({ message: 'نوع پرداخت الزامی است.' })
  @IsIn(['نقدی', 'چک'], { message: 'نوع پرداخت باید نقدی یا چک باشد.' })
  paymentType: string;

  @IsNotEmpty({ message: 'وضعیت پرداخت الزامی است.' })
  @IsIn(['برداشت شده', 'در انتظار برداشت', 'پرداخت نشده'], {
    message: 'وضعیت باید یکی از موارد برداشت شده، در انتظار برداشت یا پرداخت نشده باشد.',
  })
  status: string;

  @IsNotEmpty({ message: 'تاریخ سررسید پرداخت الزامی است.' })
  @Matches(/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'فرمت تاریخ سررسید باید به صورت 1404/02/12 باشد.',
  })
  dueDate: string;

  @IsOptional()
  trackingNumber: string;

  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'انتخاب بچه الزامی است.' })
  @IsInt({ message: 'شناسه بچه باید عدد باشد.' })
  childId: number;

  @IsOptional()
  @IsInt({ message: 'شناسه مقطع باید عدد باشد.' })
  @Validate(ExclusiveReferenceConstraint, ['motaghayeratId'])
  childGradeId: number;

  @IsOptional()
  @IsInt({ message: 'شناسه متغیرات باید عدد باشد.' })
  @Validate(ExclusiveReferenceConstraint, ['childGradeId'])
  motaghayeratId: number;
}