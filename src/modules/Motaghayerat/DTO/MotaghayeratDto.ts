import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class MotaghayeratDto {
  @IsNotEmpty({ message: 'عنوان هزینه الظامی است!' })
  @IsString({ message: 'عنوان باید رشته باشد.' })
  title: string;


  @IsNotEmpty({ message: 'مبلغ باید وارد شود .' })
  remainingAmount:string;

  @IsNotEmpty({ message: 'شناسه کاربر الزامی میباشد' })
  childId:string;
  
}