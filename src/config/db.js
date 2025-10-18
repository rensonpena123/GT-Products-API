import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

 dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
});

//test connection
export const testConnection = async () => {
    try{
        await pool.getConnection();
        console.log("Successfully connected to the MySQL database.");
    }catch(error){
        console.error("Error connecting to the MySQL database:", error);    
    }
};

export default pool;