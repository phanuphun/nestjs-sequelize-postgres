import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  password: string;
}
