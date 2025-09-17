import { DataTypes, Model, Sequelize } from 'sequelize';
import { getDbConnection } from '../helper/dbConfig';
import Teacher from './Teacher';

const sequelize: Sequelize = getDbConnection();

class Leave extends Model {
  public id!: number;
  public type!: 'ساعتی' | 'روزانه';
  public startDate!: string;
  public endDate!: string;
  public startTime!: string;
  public endTime!: string;
  public teacherId!: number;
}

Leave.init(
  {
    type: {
      type: DataTypes.ENUM('ساعتی', 'روزانه'),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'نوع مرخصی الزامی است.' },
        isIn: {
          args: [['ساعتی', 'روزانه']],
          msg: 'نوع مرخصی باید ساعتی یا روزانه باشد.',
        },
      },
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'تاریخ شروع الزامی است.' },
        isDateYYYYMMDD(value: string) {
          if (!/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
            throw new Error('فرمت تاریخ شروع باید به صورت yyyy:mm:dd باشد.');
          }
        },
      },
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isDateYYYYMMDD(value: string) {
          if (value && !/^\d{4}:(0[1-9]|1[0-2]):(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
            throw new Error('فرمت تاریخ پایان باید به صورت yyyy:mm:dd باشد.');
          }
        },
      },
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isTimeFormat(value: string) {
          if (value && !/^([01][0-9]|2[0-3]):([0-5][0-9])$/.test(value)) {
            throw new Error('فرمت ساعت شروع باید به صورت HH:MM باشد.');
          }
        },
      },
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isTimeFormat(value: string) {
          if (value && !/^([01][0-9]|2[0-3]):([0-5][0-9])$/.test(value)) {
            throw new Error('فرمت ساعت پایان باید به صورت HH:MM باشد.');
          }
        },
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
    modelName: 'Leave',
    tableName: 'leaves',
    timestamps: true,
    underscored: true,
  }
);

Teacher.hasMany(Leave, { foreignKey: 'teacherId', as: 'leaves' });
Leave.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });

export default Leave;