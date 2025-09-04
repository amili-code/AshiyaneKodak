import { DataTypes, Model, Sequelize } from 'sequelize';
import { getDbConnection } from '../helper/dbConfig';
import Child from './Child';

const sequelize: Sequelize = getDbConnection();

class Motaghayerat extends Model {
    remainingAmount: number;
}

Motaghayerat.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'عنوان الزامی است.' },
      },
    },
    remainingAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [0], msg: 'قیمت باقی مانده نمی‌تواند منفی باشد.' },
        notNull: { msg: 'قیمت باقی مانده الزامی است.' },
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
    modelName: 'Motaghayerat',
    tableName: 'motaghayerats',
    timestamps: true,
    underscored: true,
  }
);

// ارتباط یک به چند: هر بچه چندین متغیررات دارد
Child.hasMany(Motaghayerat, { foreignKey: 'childId', as: 'motaghayerats' });
Motaghayerat.belongsTo(Child, { foreignKey: 'childId', as: 'child' });

export default Motaghayerat;