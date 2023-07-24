import { Request, Response } from "express";
import * as express from "express";

import { Connection, createConnection, RowDataPacket } from "mysql2/promise";
import { BusinessContact } from "../model/BusinessContactModel";
import { BusinessImage } from "../model/BusinessImageModel";
import { BusinessInfo, BusinessInfoModel } from "../model/BusinessInfoModel";

export class BusinessInfoController {
  private businessInfoModel: BusinessInfoModel;
  private router: express.Router;

  constructor(connection: Connection) {
    // Define routes
    this.router = express.Router();

    this.businessInfoModel = new BusinessInfoModel(connection);

    this.router.get("/businesses", this.getAllBusinesses.bind(this));
  }

  async getAllBusinesses(req: Request, res: Response): Promise<void> {
    // return await this.businessInfoModel.getAllBusinesses();

    try {
      const businesses = await this.businessInfoModel.getAllBusinesses();

      res.json(businesses);
    } catch (error) {
      console.error("Error fetching businesses:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // TODO search from business

  async addBusiness(
    newBusinessInfo: BusinessInfo,
    newBusinessContact: BusinessContact,
    newBusinessImage: BusinessImage
  ): Promise<void> {
    await this.businessInfoModel.addBusiness(
      newBusinessInfo,
      newBusinessContact,
      newBusinessImage
    );
  }

  async initDefaultBusinesses(): Promise<void> {
    await this.businessInfoModel.initDefaultBusinesses();
  }

  getRouter(): express.Router {
    return this.router;
  }
}
