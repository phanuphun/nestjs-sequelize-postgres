import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'customers',
  timestamps: false,
})
export class Customer extends Model {
  // defind default column
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  fullName: string;

  @Column({ defaultValue: false })
  isActive: boolean;
}
