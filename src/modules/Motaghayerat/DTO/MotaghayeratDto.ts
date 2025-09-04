import {
  IsNotEmpty,
  IsInt,
  IsString,
} from 'class-validator';

export class MotaghayeratDto {
  @IsNotEmpty({ message: 'عنوان هزینه الظامی است!' })
  @IsString({ message: 'عنوان باید رشته باشد.' })
  title: string;


  @IsNotEmpty({ message: 'مبلغ باید وارد شود .' })
  @IsInt({ message: 'مبلغ باید عدد باشد.' })
  remainingAmount:number;

  @IsNotEmpty({ message: 'شناسه کاربر الزامی میباشد' })
  @IsInt({ message: 'شناسه کاربر باید عدد باشد.' })
  childId:number;
  
}