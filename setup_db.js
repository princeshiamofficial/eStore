const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
});

connection.connect((err) => {
    if (err) {
        console.error('CONNECTION ERROR:', err.code);
        console.log('Please ensure XAMPP MySQL is running.');
        process.exit(1);
    }
    console.log('Connected to MySQL server.');

    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'ecommerce_db'}`, (err) => {
        if (err) {
            console.error('FAILED TO CREATE DB:', err.message);
            process.exit(1);
        }
        console.log(`Database '${process.env.DB_NAME || 'ecommerce_db'}' checked/created.`);

        // Also create the initial Admin User if tables exist? 
        // server.js handles table creation, so we just need the DB to exist for server.js to connect.
        // But we might need to seed the admin user if server.js doesn't do it.
        // Let's check server.js for seeding.
        process.exit(0);
    });
});
