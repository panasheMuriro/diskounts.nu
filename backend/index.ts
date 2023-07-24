`
Client-server architecture
MVC design pattern
`;
// import express, { Express, Request, Response } from 'express';
import * as express from "express";

// const app =  express();
import { createConnection } from "mysql2/promise";
import { BusinessInfoController } from "./controller/BusinessInfoController";
import { BusinessInfo } from "./model/BusinessInfoModel";
import { createDatabaseTables } from "./model/TablesModel";
import { BusinessContact } from "./model/BusinessContactModel";
import { BusinessImage } from "./model/BusinessImageModel";
import { BusinessInfoModel } from "./model/BusinessInfoModel";

const app = express();

const main = async () => {
  // Create a connection to the MySQL server
  const initConnection = createConnection({
    host: "127.0.0.1",
    user: "panashe",
    password: "123456789",
    database: "diskounts",
  });

  initConnection.then(async (connection) => {
    connection.connect();

    // create SQL tables if they do not exist
    await createDatabaseTables();
    const controller = new BusinessInfoController(connection);

    // await controller.initDefaultBusinesses()
    //
    app.use("/test", (req, res) => {
      res.status(201).json({ message: "Business added successfully" });
    });

    app.use("/api", controller.getRouter());

    // connection.end();
  });

  //   routing system
};

main().catch((error) => {
  console.error("This Error:", error);
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
