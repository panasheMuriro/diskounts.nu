import { Connection, createConnection, RowDataPacket } from "mysql2/promise";
import { SQLCredentials } from "../config/constants";
import { BusinessContact } from "./BusinessContactModel";
import { BusinessImage } from "./BusinessImageModel";
import { data } from "../../data/diskounts_data";
import { categories } from "../../data/link_categories";

export interface BusinessInfo {
  // businessID: string; auto generated
  businessName: string;
  description: string;
  website: string;
  discount: string;
  category: string;
  benefactors: string;
}

export interface BusinessData
  extends BusinessInfo,
    BusinessImage,
    BusinessContact {}

export class BusinessInfoModel {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async getAllBusinesses(): Promise<BusinessData[]> {
    const [rows] = await this.connection.query(
      `
      SELECT *
FROM BusinessInfo
INNER JOIN BusinessContact ON BusinessInfo.businessID = BusinessContact.businessID
INNER JOIN BusinessImage ON BusinessInfo.businessID = BusinessImage.businessID;
      `
    );
    return rows as BusinessData[];
  }

  async addBusiness(
    newBusinessInfo: BusinessInfo,
    newBusinessContact: BusinessContact,
    newBusinessImage: BusinessImage
  ): Promise<void> {
    const [result] = await this.connection.query(
      "INSERT INTO BusinessInfo SET ?",
      newBusinessInfo
    );
    const businessID = (result as any).insertId;
    console.log(`Inserted record with ID: ${businessID}`);
    await this.connection.query("INSERT INTO BusinessContact SET ?", {
      ...newBusinessContact,
      businessID: businessID,
    });

    await this.connection.query("INSERT INTO BusinessImage SET ?", {
      ...newBusinessImage,
      businessID: businessID,
    });

    console.log("Added data to 3 tables");
  }

  async initDefaultBusinesses() {
    // Create a mapping from business name to category
    const businessToCategoryMap = {};
    for (const category in categories) {
      const businessNames = categories[category];
      for (const businessName of businessNames) {
        businessToCategoryMap[businessName] = category;
      }
    }

    // Combine business objects with their categories
    const combinedBusinesses: BusinessData[] = data.map((x) => {
      replaceMissingFields(x);
      return {
        ...x,
        businessName: x.business,
        category: businessToCategoryMap[x.business],
        link: "placeholderImage",
      } as BusinessData;
    });

    // A function to replace missing fields with "missing"
    function replaceMissingFields(business) {
      for (const key in business) {
        if (
          business.hasOwnProperty(key) &&
          (business[key] === undefined ||
            business[key] === null ||
            business[key] === "")
        ) {
          business[key] = "missing";
        }
      }
    }
    console.log(combinedBusinesses[0]);

    combinedBusinesses.map(async (x) => {
      let businessInfo: BusinessInfo = {
        businessName: x.businessName,
        website: x.website,
        description: x.description,
        discount: x.discount,
        benefactors: x.benefactors,
        category: x.category
      };

      let businessContact:BusinessContact = {
        phone: x.phone,
        address: x.address,
        email:x.email
      }

      let businessImage:BusinessImage = {
        link:x.link
      }

      await this.addBusiness(businessInfo, businessContact, businessImage);

    });
  }
}
//  TODO: Business images, Business contact
