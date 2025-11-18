import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface EmployeeAttributes {
  id: number;
  userId: number;
  publicId: string;
  basicSalary: number;
  hra: number;
  allowances: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface EmployeeCreationAttributes
  extends Optional<
    EmployeeAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id!: number;
  public publicId!: string;
  public userId!: number;
  public basicSalary!: number;
  public hra!: number;
  public allowances!: number;

  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    this.hasMany(models.Attendance, {
      foreignKey: "employee_id",
      as: "attendances",
    });

    this.hasMany(models.Salary, {
      foreignKey: "employee_id",
      as: "salaries",
    });

    this.hasMany(models.Payroll, {
      foreignKey: "employee_id",
      as: "payrolls",
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

        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          field: "user_id",
        },

        basicSalary: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          field: "basic_salary",
        },

        hra: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },

        allowances: {
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
        tableName: "employees",
        modelName: "Employee",
        timestamps: true,
        paranoid: true,
      }
    );

    return this;
  }
}
export { Employee }; 

export default Employee;
