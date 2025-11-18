"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("salaries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      public_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      month: {
        type: Sequelize.STRING,
        allowNull: false, // YYYY-MM
      },

      gross_salary: {
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

      net_salary: {
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
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("salaries");
  },
};
