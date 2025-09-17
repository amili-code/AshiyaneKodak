import { DataTypes, Model, Sequelize } from 'sequelize';
import { getDbConnection } from '../helper/dbConfig';

const sequelize: Sequelize = getDbConnection();

class Teacher extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public phone !: string;
  public entryDate!: string; 
  public birthdate!: string; 
}

Teacher.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'نام الزامی است.' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'نام خانوادگی الزامی است.' },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'شماره تلفن مادر الزامی است.' },
        isValidPhone(value: string) {
          if (!/^09\d{9}$/.test(value)) {
            throw new Error('شماره تلفن مادر معتبر نیست.');
          }
        },
      },
    },
    entryDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ ورود به مجموعه الزامی است.' },
        isDateYYYYMMDD(value: string) {
          if (!/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
            throw new Error('فرمت تاریخ باید به صورت yyyy:mm:dd باشد.');
          }
        },
      },
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ تولد الزامی است.' },
        isDateYYYYMMDD(value: string) {
          if (!/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
            throw new Error('فرمت تاریخ تولد باید به صورت yyyy:mm:dd باشد.');
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: true,
    underscored: true,
  }
);

export default Teacher;