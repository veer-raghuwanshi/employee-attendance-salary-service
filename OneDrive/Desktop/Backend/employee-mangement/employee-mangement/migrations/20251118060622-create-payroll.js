"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payrolls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

      public_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      employee_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },

      month: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      gross: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      tax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      pf: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      deductions: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      net: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payrolls");

  },
};
