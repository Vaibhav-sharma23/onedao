import {sequelize} from "../database/models/index.js";

  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

export default sequelize; 
export {sequelize};