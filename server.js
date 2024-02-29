// Import required packages
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hank10013967$',
  database: 'employee_db'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  start();
});

// Function to start the application
function start() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        // ... other cases for each action
        case 'Exit':
          connection.end();
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}