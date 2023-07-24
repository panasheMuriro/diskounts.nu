"use strict";
/**
 * 1. DataTable
    1. Fields: id: STRING, description: STRING, website: STRING, business: STRING, discount: STRING
2. ContactTable
    1. Fields: id: STRING, phone: STRING, email: STRING, address: STRING
3. ImageTable
    1. Fields: id: STRING, link: STRING
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createDatabaseTables = void 0;
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
var promise_1 = require("mysql2/promise");
// Define your database configuration
var dbConfig = {
    host: "127.0.0.1",
    user: "panashe",
    password: "123456789",
    database: "diskounts"
};
// Define the tables creation queries
var createTableQueries = {
    BusinessInfo: "\n    CREATE TABLE IF NOT EXISTS BusinessInfo (\n        businessID int PRIMARY KEY AUTO_INCREMENT,\n        businessName varchar(255) NOT NULL,\n        description LONGTEXT,\n        discount LONGTEXT,\n        website varchar(255),\n        category varchar(255),\n        benefactors LONGTEXT \n    )",
    BusinessImage: "\n    CREATE TABLE IF NOT EXISTS BusinessImage (\n        imageID int PRIMARY KEY AUTO_INCREMENT,\n        businessID int,\n        link LONGTEXT,\n        FOREIGN KEY (businessID) REFERENCES BusinessInfo(businessID)\n    )",
    BusinessContact: "\n    CREATE TABLE IF NOT EXISTS BusinessContact (\n        contactID int PRIMARY KEY AUTO_INCREMENT,\n        businessID int,\n        phone varchar(255),\n        email varchar(255),\n        address LONGTEXT,\n        FOREIGN KEY (businessID) REFERENCES BusinessInfo(businessID)\n    )"
};
function createDatabaseTables() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _i, _a, tableName, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, promise_1.createConnection(dbConfig)];
                case 1:
                    connection = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 10]);
                    _i = 0, _a = Object.keys(createTableQueries);
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    tableName = _a[_i];
                    return [4 /*yield*/, connection.query(createTableQueries[tableName])];
                case 4:
                    _b.sent();
                    console.log("Table '" + tableName + "' created successfully.");
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 10];
                case 7:
                    error_1 = _b.sent();
                    console.error('Error creating tables:', error_1);
                    return [3 /*break*/, 10];
                case 8: 
                // Close the database connection
                return [4 /*yield*/, connection.end()];
                case 9:
                    // Close the database connection
                    _b.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.createDatabaseTables = createDatabaseTables;
// Call the function to create the tables
// createDatabaseTables().catch((error) => {
//   console.error('Error:', error);
// });
