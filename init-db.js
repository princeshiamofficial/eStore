require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        console.error('Please ensure your MySQL server (e.g., XAMPP) is running!');
        process.exit(1);
    }
    console.log('Connected to MySQL server.');

    const dbName = process.env.DB_NAME || 'ecommerce_db';
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            process.exit(1);
        }
        console.log(`Database '${dbName}' ready.`);
        connection.end();
    });
});
