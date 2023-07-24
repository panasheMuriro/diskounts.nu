import { Connection, createConnection, RowDataPacket } from "mysql2/promise";
import { SQLCredentials } from "../config/constants";

export interface BusinessContact {
//   businessID: number; 
  email: string;
  phone: string;
  address:string;
}

// export class BusinessContactModel {
//   private connection: Connection;

//   constructor(connection: Connection) {
//     this.connection = connection;
//   }

//   async getAllBusinesses(): Promise<BusinessContact[]> {
//     const [rows] = await this.connection.query("SELECT * FROM BusinessContact");
//     return rows as BusinessContact[];
//   }
// }
//  TODO: Business images, Business contact 