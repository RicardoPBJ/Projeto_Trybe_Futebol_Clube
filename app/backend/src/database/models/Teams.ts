import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

export default class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'teams',
  timestamps: false,
  sequelize,
  underscored: true,
});
