import { DataTypes, Model, Sequelize } from 'sequelize';
import { getDbConnection } from '../helper/dbConfig';
import Teacher from './Teacher';

const sequelize: Sequelize = getDbConnection();

class Insurance extends Model {
  public id!: number;
  public paymentDate!: string;
  public amount!: number;
  public description!: string;
  public teacherId!: number;
}

Insurance.init(
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: 'مبلغ باید یک عدد معتبر باشد.' },
        min: { args: [0], msg: 'مبلغ نمی‌تواند منفی باشد.' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'Insurance',
    tableName: 'insurances',
    timestamps: true,
    underscored: true,
  }
);

Teacher.hasMany(Insurance, { foreignKey: 'teacherId', as: 'insurances' });
Insurance.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });

export default Insurance;