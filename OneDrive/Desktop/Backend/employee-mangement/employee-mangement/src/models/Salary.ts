import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface SalaryAttributes {
  id: number;
  publicId: string;
  employeeId: number;
  month: string;
  grossSalary: number;
  tax: number;
  pf: number;
  deductions: number;
  netSalary: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SalaryCreationAttributes
  extends Optional<
    SalaryAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

 class Salary
  extends Model<SalaryAttributes, SalaryCreationAttributes>
  implements SalaryAttributes
{
  public id!: number;
  public publicId!: string;
  public employeeId!: number;
  public month!: string;
  public grossSalary!: number;
  public tax!: number;
  public pf!: number;
  public deductions!: number;
  public netSalary!: number;

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
          type: DataTypes.INTEGER,
        },

        publicId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: "public_id",
        },

        employeeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "employee_id",
        },

        month: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        grossSalary: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          field: "gross_salary",
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

        netSalary: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          field: "net_salary",
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
        tableName: "salaries",
        modelName: "Salary",
        timestamps: true,
        paranoid: true,
      }
    );

    return this; 
  }
}
export { Salary }; 

export default Salary;
