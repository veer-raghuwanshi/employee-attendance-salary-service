import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface PayrollAttributes {
  id: number;
  publicId: string;
  employeeId: number;
  month: string;
  gross: number;
  tax: number;
  pf: number;
  deductions: number;
  net: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface PayrollCreationAttributes
  extends Optional<
    PayrollAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

 class Payroll
  extends Model<PayrollAttributes, PayrollCreationAttributes>
  implements PayrollAttributes
{
  public id!: number;
  public publicId!: string;
  public employeeId!: number;
  public month!: string;
  public gross!: number;
  public tax!: number;
  public pf!: number;
  public deductions!: number;
  public net!: number;

  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  static associate(models: any) {
    this.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as: "employee",
    });
  }

  static initModel(sequelize: Sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },

        publicId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: "public_id",
        },

        employeeId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          field: "employee_id",
        },

        month: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },

        gross: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },

        tax: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },

        pf: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },

        deductions: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },

        net: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },

        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },

        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: "updated_at",
        },

        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE,
          field: "deleted_at",
        },
      },
      {
        sequelize,
        tableName: "payrolls",
        modelName: "Payroll",
        timestamps: true,
        paranoid: true, 
      }
    );

    return this; 
  }
}
export { Payroll };

export default Payroll;
