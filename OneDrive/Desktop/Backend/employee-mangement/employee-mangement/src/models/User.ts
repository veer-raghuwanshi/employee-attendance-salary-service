import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number;
  publicId: string;
  name: string | null;
  role: "admin" | "hr" | "employee" | null;
  email: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

 class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public publicId!: string;
  public name!: string | null;
  public role!: "admin" | "hr" | "employee" | null;
  public email!: string | null;
  public password!: string | null;

  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  static associate(models: any) {}

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

        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        role: {
          type: DataTypes.ENUM("admin", "hr", "employee"),
          allowNull: true,
        },

        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },

        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: "created_at",
        },

        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
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
        tableName: "users",
        modelName: "User",
        paranoid: true,
        timestamps: true,
      }
    );

    return this;
  }
}
export { User }; 

export default User;
