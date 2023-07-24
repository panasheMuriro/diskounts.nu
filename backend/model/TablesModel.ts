/**
 * 1. DataTable
    1. Fields: id: STRING, description: STRING, website: STRING, business: STRING, discount: STRING
2. ContactTable
    1. Fields: id: STRING, phone: STRING, email: STRING, address: STRING
3. ImageTable
    1. Fields: id: STRING, link: STRING
 */

// import { Connection, createConnection, RowDataPacket } from "mysql2/promise";



// export const CreateDatabaseTables = {
//     BusinessInfo: `
//     CREATE TABLE IF NOT EXISTS BusinessInfo (
//         businessID int PRIMARY KEY AUTO_INCREMENT,
//         businessName varchar(255) NOT NULL,
//         description varchar(255) NOT NULL,
//         discount varchar(255) NOT NULL,
//         website varchar(255) NOT NULL
//     )`,
//     BusinessImages: `
//     CREATE TABLE IF NOT EXISTS BusinessImages (
//         imageID int PRIMARY KEY AUTO_INCREMENT,
//         businessID int FOREIGN KEY,
//         link varchar(255) NOT NULL
//     )`,
//     BusinessContact: `
//     CREATE TABLE IF NOT EXISTS BusinessContact (
//         contactID int PRIMARY KEY AUTO_INCREMENT,
//         businessID int FOREIGN KEY,
//         phone varchar(255) NOT NULL,
//         email varchar(255) NOT NULL,
//         address varchar(255)
//     )`,
// }


// /**
//  * 
//  * @param {import("mysql2").Connection} connection 
//  * @param {string} tableName 
//  * @param {string} tableProps
//  */


// export const createTable = async (connection, tableName, tableProps)=> {
    
//     await connection.query(tableProps, (err) => {
//         if (err) {
//             console.error('Error creating table:', err);
//         } else {
//             console.log(`Table ${tableName} created successfully`);
//         }
//     });
// }


// // Read




import { Connection, createConnection } from 'mysql2/promise';

// Define your database configuration
const dbConfig = {
    host: "127.0.0.1",
    user: "panashe",
    password: "123456789",
    database: "diskounts",
};

// Define the tables creation queries
const createTableQueries = {
  BusinessInfo: `
    CREATE TABLE IF NOT EXISTS BusinessInfo (
        businessID int PRIMARY KEY AUTO_INCREMENT,
        businessName varchar(255) NOT NULL,
        description LONGTEXT,
        discount LONGTEXT,
        website varchar(255),
        category varchar(255),
        benefactors LONGTEXT 
    )`,
  BusinessImage: `
    CREATE TABLE IF NOT EXISTS BusinessImage (
        imageID int PRIMARY KEY AUTO_INCREMENT,
        businessID int,
        link LONGTEXT,
        FOREIGN KEY (businessID) REFERENCES BusinessInfo(businessID)
    )`,
  BusinessContact: `
    CREATE TABLE IF NOT EXISTS BusinessContact (
        contactID int PRIMARY KEY AUTO_INCREMENT,
        businessID int,
        phone varchar(255),
        email varchar(255),
        address LONGTEXT,
        FOREIGN KEY (businessID) REFERENCES BusinessInfo(businessID)
    )`,
};

export async function createDatabaseTables() {
  // Create a connection to the MySQL server
  const connection = await createConnection(dbConfig);

  try {
    // Execute the create table queries
    for (const tableName of Object.keys(createTableQueries)) {
      await connection.query(createTableQueries[tableName]);
      console.log(`Table '${tableName}' created successfully.`);
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    // Close the database connection
    await connection.end();
  }
}

// Call the function to create the tables
// createDatabaseTables().catch((error) => {
//   console.error('Error:', error);
// });

