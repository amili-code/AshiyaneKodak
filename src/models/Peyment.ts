import { DataTypes, Model, Sequelize } from 'sequelize';
import { getDbConnection } from '../helper/dbConfig';
import Child from './Child';
import ChildGrade from './ChildGrade';
import Motaghayerat from './Motaghayerat';

const sequelize: Sequelize = getDbConnection();

class Payment extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

Payment.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'عنوان پرداخت الزامی است.' },
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [1], msg: 'مبلغ پرداختی باید بیشتر از ۰ باشد.' },
        notNull: { msg: 'مبلغ پرداختی الزامی است.' },
      },
    },
    paymentDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ پرداخت الزامی است.' },
         isJalaliDateFormat(value: string) {
            if (!/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
                throw new Error('فرمت تاریخ تولد باید به صورت 1404/02/12 باشد.');
            }
        },
      },
    },
    paymentTime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidTime(value: string) {
          if (value && !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            throw new Error('فرمت زمان باید به صورت HH:MM باشد.');
          }
        },
      },
    },
    paymentType: {
      type: DataTypes.ENUM('نقدی', 'چک'),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'نوع پرداخت الزامی است.' },
        isIn: {
          args: [['نقدی', 'چک']],
          msg: 'نوع پرداخت باید نقدی یا چک باشد.',
        },
      },
    },
    status: {
      type: DataTypes.ENUM('برداشت شده', 'در انتظار برداشت', 'پرداخت نشده'),
      allowNull: false,
      defaultValue: 'پرداخت نشده',
      validate: {
        notEmpty: { msg: 'وضعیت پرداخت الزامی است.' },
        isIn: {
          args: [['برداشت شده', 'در انتظار برداشت', 'پرداخت نشده']],
          msg: 'وضعیت باید یکی از موارد برداشت شده، در انتظار برداشت یا پرداخت نشده باشد.',
        },
      },
    },
    dueDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ سررسید پرداخت الزامی است.' },
         isJalaliDateFormat(value: string) {
            if (!/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
                throw new Error('فرمت تاریخ تولد باید به صورت 1404/02/12 باشد.');
            }
        },
      },
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    childId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Child,
        key: 'id',
      },
      onDelete: 'CASCADE',
      validate: {
        notNull: { msg: 'انتخاب بچه الزامی است.' },
        isInt: { msg: 'شناسه بچه باید عدد باشد.' },
      },
    },
    childGradeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ChildGrade,
        key: 'id',
      },
      onDelete: 'SET NULL',
      validate: {
        isInt: { msg: 'شناسه مقطع باید عدد باشد.' },
      },
    },
    motaghayeratId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Motaghayerat,
        key: 'id',
      },
      onDelete: 'SET NULL',
      validate: {
        isInt: { msg: 'شناسه متغیرات باید عدد باشد.' },
      },
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: true,
    underscored: true,
    validate: {
      validatePaymentReference() {
        // بررسی اینکه فقط یکی از childGradeId یا motaghayeratId پر باشد
        if ((this.childGradeId && this.motaghayeratId) || (!this.childGradeId && !this.motaghayeratId)) {
          throw new Error('پرداخت باید فقط به یک مقطع یا یک متغیرات مرتبط باشد.');
        }
      },
    },
  }
);

// ارتباطات
Child.hasMany(Payment, { foreignKey: 'childId', as: 'payments' });
Payment.belongsTo(Child, { foreignKey: 'childId', as: 'child' });

ChildGrade.hasMany(Payment, { foreignKey: 'childGradeId', as: 'payments' });
Payment.belongsTo(ChildGrade, { foreignKey: 'childGradeId', as: 'childGrade' });

Motaghayerat.hasMany(Payment, { foreignKey: 'motaghayeratId', as: 'payments' });
Payment.belongsTo(Motaghayerat, { foreignKey: 'motaghayeratId', as: 'motaghayerat' });

export default Payment;