import { Sequelize } from 'sequelize';
import { ENV } from '../helper';

let sequelize: Sequelize | null = null;

export const getDbConnection = (): Sequelize => {
  if (!sequelize) {
    sequelize = new Sequelize(
      ENV.DB_NAME || "ashiyane",
      ENV.DB_USER || "root",
      ENV.DB_PASSWORD || "",
      {
        host: ENV.DB_HOST,
        dialect: "mysql",
        logging: false,
      }
    );
  }
  return sequelize;
};

