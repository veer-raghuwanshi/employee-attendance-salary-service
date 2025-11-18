"use strict";
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        public_id: uuid(),
        name: "Admin User",
        role: "admin",
        email: "admin@gmail.com",
        password: await bcrypt.hash("admin123", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        public_id: uuid(),
        name: "HR Manager",
        role: "hr",
        email: "hr@gmail.com",
        password: await bcrypt.hash("hr123", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
