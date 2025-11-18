import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface AttendanceAttributes {
  id: number;
  publicId: string;
  employeeId: number;
  date: string; // DATEONLY
  hoursWorked: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface AttendanceCreationAttributes
  extends Optional<
    AttendanceAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

 class Attendance
  extends Model<AttendanceAttributes, AttendanceCreationAttributes>
  implements AttendanceAttributes
{
  public id!: number;
  public publicId!: string;
  public employeeId!: number;
  public date!: string;
  public hoursWorked!: number;

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

        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },

        hoursWorked: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          field: "hours_worked",
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
        tableName: "attendance",
        modelName: "Attendance",
        timestamps: true,
        paranoid: true,
      }
    );

    return this;
  }
}
export { Attendance };  

export default Attendance;
