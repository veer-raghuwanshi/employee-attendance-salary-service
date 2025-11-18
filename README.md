📌 Employee Payroll & Attendance Management API
TypeScript • Express.js • Sequelize ORM • MySQL/PostgreSQL

A complete backend system for managing employees, attendance, salary calculations, and monthly payroll distribution. Built using TypeScript, Express.js, Sequelize, and JWT (HTTP-only cookies) with full role-based authentication.

🚀 Features
🔐 Authentication

Login with email + password

JWT authentication using HTTP-only cookies

Secure logout

Role-based access (Admin / HR / Employee)

👨‍💼 Employee Management

Create employee with salary structure

Auto-create user account tied to employee

Employee self-profile access

Admin/HR can view all employees

⏱ Attendance Tracking

Employees mark attendance daily

Half-day logic when hours < 8

HR/Admin can view attendance history

Flexible monthly attendance summaries

💰 Smart Salary Calculation

Salary logic includes:

Gross Salary = Basic + HRA + Allowances

Daily Wage = Gross / 30

Half-Day Wage = Daily / 2

Tax slabs: 5%, 10%, 20%

PF Deduction: 12% of Basic salary

Auto-adjusts deductions proportionally based on attendance

Net Salary is NEVER negative

Salary stored month-wise

🧾 Payroll Distribution

HR/Admin can distribute payroll for selected month

Data stored permanently in payroll table

Monthly payroll history with employee details

Fully relational (Employee → User → Payroll mapping)

📡 API Endpoints
🔐 Authentication

METHOD	ENDPOINT	ROLE	DESCRIPTION

POST	/auth/login	All	Login user & issue JWT cookie

POST	/auth/logout	All	Logout user & clear cookie
👨‍💼 Employees
METHOD	ENDPOINT	ROLE	DESCRIPTION

POST	/employees	Admin/HR	Create employee + user

GET	/employees/:id	Admin/HR/Employee	View employee (self or admin/hr)

⏱ Attendance
METHOD	ENDPOINT	ROLE	DESCRIPTION

POST	/attendance/mark	Employee	Mark daily attendance

💰 Salary Calculation
METHOD	ENDPOINT	ROLE	DESCRIPTION

POST	/salary/calculate	Admin/HR	Calculate salary for employee

GET	/salary/:employeeId?month=	Admin/HR/Employee	Fetch salary for month

🧾 Payroll
METHOD	ENDPOINT	ROLE	DESCRIPTION

POST	/payroll/distribute	Admin/HR	Generate payroll for month

GET	/payroll/history?month=	Admin/HR	View payroll history

🛠 Tech Stack
TypeScript

Node.js (Express.js)

Sequelize ORM

MySQL / PostgreSQL

JWT (HTTP-only cookies)

bcrypt.js for password hashing

dotenv for environment variables

cookie-parser
 
Setup Instructions
1️⃣ Install Dependencies
npm install

2️⃣ Create .env
NODE_ENV=development
PORT=4000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=employee_mangement

JWT_SECRET=superSecretKey
JWT_EXPIRE=7d

3️⃣ Generate Sequelize Config
node generate-config.js --environment=development

4️⃣ Run Migrations
npm run migrate

5️⃣ Run Seeders (optional)
npm run seed

6️⃣ Start Dev Server
npm run dev

🧪 Sample Login Payload
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
