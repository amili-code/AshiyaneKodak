import { DataTypes, Model, Sequelize } from 'sequelize';
import { getDbConnection } from '../helper/dbConfig';
import Child from './Child';

const sequelize: Sequelize = getDbConnection();

class ChildGrade extends Model {
    remainingAmount: number;
}

ChildGrade.init(
  {
    registerDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ ثبت نام الزامی است.' },
         isJalaliDateFormat(value: string) {
          if (!/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
            throw new Error('فرمت تاریخ تولد باید به صورت 1404/02/12 باشد.');
          }
        },
      },
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ اتمام دوره الزامی است.' },
         isJalaliDateFormat(value: string) {
          if (!/^1[0-4]\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
            throw new Error('فرمت تاریخ تولد باید به صورت 1404/02/12 باشد.');
          }
        },
      },
    },
    grade: {
      type: DataTypes.ENUM('شیرخوار', 'نوباوه', 'پیش یک', 'پیش دو'),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'مقطع الزامی است.' },
        isIn: {
          args: [['شیرخوار', 'نوباوه', 'پیش یک', 'پیش دو']],
          msg: 'مقطع باید یکی از شیرخوار، نوباوه، پیش یک یا پیش دو باشد.',
        },
      },
    },
    remainingAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [0], msg: 'مبلغ باقی مانده نمی‌تواند منفی باشد.' },
        notNull: { msg: 'مبلغ باقی مانده الزامی است.' },
      },
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
  },
  {
    sequelize,
    modelName: 'ChildGrade',
    tableName: 'child_grades',
    timestamps: true,
    underscored: true,
  }
);

// ارتباط یک به چند: هر بچه چندین مقطع دارد
Child.hasMany(ChildGrade, { foreignKey: 'childId', as: 'grades' });
ChildGrade.belongsTo(Child, { foreignKey: 'childId', as: 'child' });

export default ChildGrade;