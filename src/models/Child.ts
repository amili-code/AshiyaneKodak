import { DataTypes, Model, Sequelize, ValidationError } from 'sequelize';
import { getDbConnection } from '../helper/dbConfig';

const sequelize: Sequelize = getDbConnection();

class Child extends Model {
    image: any;
}

Child.init(
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
    gender: {
      type: DataTypes.ENUM('مرد', 'زن'),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'جنسیت الزامی است.' },
        isIn: {
          args: [['مرد', 'زن']],
          msg: 'جنسیت باید مرد یا زن باشد.',
        },
      },
    },
    fatherPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'شماره تلفن پدر الزامی است.' },
        isValidPhone(value: string) {
          if (!/^09\d{9}$/.test(value)) {
            throw new Error('شماره تلفن پدر معتبر نیست.');
          }
        },
      },
    },
    motherPhone: {
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [3], msg: 'سن باید حداقل ۳ باشد.' },
        max: { args: [100], msg: 'سن باید حداکثر ۱۰۰ باشد.' },
        notNull: { msg: 'سن بچه الزامی است.' },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ تولد الزامی است.' },
        isJalaliDateFormat(value: string) {
          if (!/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
            throw new Error('فرمت تاریخ تولد باید به صورت 1404/02/12 باشد.');
          }
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'آدرس محل سکونت الزامی است.' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Child',
    tableName: 'children',
    timestamps: true,
    underscored: true,
  }
);

export default Child;