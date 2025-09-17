import { DataTypes, Model, Sequelize } from 'sequelize';
import { getDbConnection } from '../helper/dbConfig';
import Teacher from './Teacher';

const sequelize: Sequelize = getDbConnection();

class Salary extends Model {
  public id!: number;
  public paymentDate!: string;
  public paymentTime!: string;
  public description!: string;
  public amount!: number;
  public teacherId!: number;
}

Salary.init(
  {
    paymentDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ پرداخت الزامی است.' },
        isDateYYYYMMDD(value: string) {
          if (!/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
            throw new Error('فرمت تاریخ پرداخت باید به صورت yyyy:mm:dd باشد.');
          }
        },
      },
    },
    paymentTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'ساعت پرداخت الزامی است.' },
        isTimeFormat(value: string) {
          if (!/^([01][0-9]|2[0-3]):([0-5][0-9])$/.test(value)) {
            throw new Error('فرمت ساعت پرداخت باید به صورت HH:MM باشد.');
          }
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: 'مبلغ باید یک عدد معتبر باشد.' },
        min: { args: [0], msg: 'مبلغ نمی‌تواند منفی باشد.' },
      },
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teachers',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Salary',
    tableName: 'salaries',
    timestamps: true,
    underscored: true,
  }
);

Teacher.hasMany(Salary, { foreignKey: 'teacherId', as: 'salaries' });
Salary.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });

export default Salary;